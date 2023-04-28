import ConfigurationPanel from "./ConfigurationPanel";
import Maze from "./Maze";
import {useState, useCallback, useRef} from "react";
import recursiveBacktracking from '../algorithms/generation/recursiveBacktracking'
import breadthFirstSearch from "../algorithms/solving/breadthFirstSearch";
import {Stack} from "@mui/material";
import {GameState} from "./GameState";
import MazeLegend from "./MazeLegend";
import {checkIfValidStep} from "../algorithms/helpers";
import huntAndKillAlgorithm from "../algorithms/generation/huntAndKillAlgorithm";
import depthFirstSearch from "../algorithms/solving/depthFirstSearch";
import {observer} from "mobx-react";

const delayTimeMapping = {0: 500, 1: 25, 2: 3, 3: 0}

// TODO move to the maze store and rename to "apply_action"
const visualizeStep = (maze, action) => {
    switch (action.type) {
        case 'markCurrent':
            maze.nodes[action.payload.row][action.payload.column].markCurrent()
            break
        case 'markVisited':
            maze.nodes[action.payload.row][action.payload.column].markVisited()
            break
        case 'clearCurrent':
            maze.nodes[action.payload.row][action.payload.column].clearCurrent()
            break
        case 'bulkMarkPath':
            for (let item of action.payload) {
                maze.nodes[item.row][item.column].markPath(item.path)
            }
            break
        case 'resetRoute':
            for (let row of maze.nodes) {
                for (let node of row) {
                    node.clearRoute()
                }
            }
            break
        case 'resetVisited':
            for (let row of maze.nodes) {
                for (let node of row) {
                    node.clearVisited()
                }
            }
            break
        case 'resetCurrent':
            for (let row of maze.nodes) {
                for (let node of row) {
                    node.clearCurrent()
                }
            }
            break
        case 'setMaze':
            maze.setNodes(action.payload.newMaze)
            break
        case 'markRoute':
            for (let item of action.payload) {
                maze.nodes[item.row][item.column].markRoute()
            }
            break
        default:
            throw Error('Not Implemented')
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const gameStateOptions = {
    0: {
        id: 0,
        title: 'Maze Generation Pending',
        description: 'Select the generation algorithm and click "generate" to start!'
    },
    1: {
        id: 1,
        title: 'Generation In Progress',
        description: 'Wait for the generation algorithm to finish before continuing.'
    },
    2: {
        id: 2,
        title: 'Ready To Start',
        description: 'Click the the "solve" button on top or start solving the maze yourself!'
    },
    3: {
        id: 3,
        title: 'Game In Progress',
        description: 'Continue playing or click the "solve" button if you need help!'
    },
    4: {
        id: 4,
        title: 'Solving In Progress',
        description: 'Wait for the solving algorithm to finish before continuing.'
    },
    5: {
        id: 5,
        title: 'Finish! Maze Solved!',
        description: 'Nicely done! Click "generate" to continue with a new maze!'
    }
}


const generationAlgorithmOptions = {
    'hunt_and_kill_algorithm': {title: 'Hunt and Kill Algorithm', relatedFunction: huntAndKillAlgorithm},
    'recursive_backtracking': {title: 'Recursive Backtracking', relatedFunction: recursiveBacktracking},
}

const solvingAlgorithmOptions = {
    'breadth_first_search': {title: "Breadth First Search", relatedFunction: breadthFirstSearch},
    'depth_first_search': {title: "Depth First Search", relatedFunction: depthFirstSearch},
}

const MazeGame = observer(({rootStore}) => {
    const maze = rootStore.maze
    const config = rootStore.config

    const [gameState, setGameState] = useState(gameStateOptions[0])
    const [algorithmsSettings, setAlgorithmsSettings] = useState({
        generationAlgorithm: 'hunt_and_kill_algorithm',
        solvingAlgorithm: 'breadth_first_search',
        visualizationSpeed: 2
    })
    const mouseIsDown = useRef(false)
    const stopVisualization = useRef(false)

    const setStopVisualization = useCallback(value => stopVisualization.current = value, [])
    const setMouseIsDown = value => mouseIsDown.current = value


    // Use callback should be used in all the following functions because they are either props passed to
    // the configuration panel or functions that props depend on. Rendering configuration panel after every maze
    // node update is very heavy on performance and should be avoided
    const markNodeVisited = useCallback((row, column, force = false) => {
        if (
            (force || mouseIsDown.current) &&
            checkIfValidStep(maze.nodes, row, column) &&
            [2, 3].includes(gameState.id)
        ) {
            visualizeStep(maze, {type: 'markVisited', payload: {row: row, column: column}})
            if (row === 0 && column === 0) {
                setGameState(gameStateOptions[3])
            } else if (row === maze.rows - 1 && column === maze.columns - 1) {
                setGameState(gameStateOptions[5])
            }
        }
    }, [gameState.id])

    const onAlgorithmSettingChange = useCallback((fieldName, newValue) => {
        setAlgorithmsSettings(prevState => ({...prevState, [fieldName]: newValue}))
    }, [])

    // ------------------------ MAZE GENERATION FUNCTIONS -------------------------------
    const visualizeGeneration = useCallback(async (newMaze, actionsToVisualize) => {
        maze.applyMultipleActions(actionsToVisualize, 'generation')
        // const delayTime = delayTimeMapping[algorithmsSettings.visualizationSpeed]
        // let initialDelay = delayTime
        // for (const action of actionsToVisualize) {
        //     setTimeout(() => {
        //         maze.applySingleAction(action)
        //     }, initialDelay)
        //     initialDelay = delayTime + initialDelay
        // }
        // setTimeout(() => {
        //     maze.applySingleAction({type: 'resetVisited'})
        //     setGameState(gameStateOptions[2])
        // }, initialDelay + delayTime)

        // TODO handle the logic below and maybe add resetVisited as a last step of each generation?
        // TODO think about how to implement a stop and setGameState
        // if (delayTime === 0) {
        //     visualizeStep(maze, {type: 'setMaze', payload: {newMaze: newMaze}})
        // } else {
        //     for (const action of actionsToVisualize) {
        //         // After every action, check whether the generation is stopped by user. If yes, reset the
        //         // stopGeneration to false, set the game state to 0 and exit from loop & function
        //         if (stopVisualization.current) {
        //             setStopVisualization(false)
        //             setGameState(gameStateOptions[0])
        //             maze.createEmptyNodes()
        //             return
        //         } else {
        //             await delay(delayTime)
        //             visualizeStep(maze, action)
        //         }
        //     }
        // }
        // visualizeStep(maze, {type: 'resetVisited'})
        // setGameState(gameStateOptions[2])
    }, [setStopVisualization, algorithmsSettings.visualizationSpeed])


    const generateMaze = () => {
        config.setGameState(1)
        maze.createEmptyNodes()

        const generationFunction = generationAlgorithmOptions[algorithmsSettings.generationAlgorithm].relatedFunction
        const {newMaze, actionsToVisualize} = generationFunction(maze.nodesToJS)
        visualizeGeneration(newMaze, actionsToVisualize)
    }

    // ------------------------ MAZE SOLVING FUNCTIONS ----------------------------------
    const visualizeSolving = useCallback(async (newMaze, actionsToVisualize) => {
        maze.applyMultipleActions(actionsToVisualize, 'solving')
        // // TODO why is this a separate function with visualizeGeneration? Merge it
        // const delayTime = delayTimeMapping[algorithmsSettings.visualizationSpeed]
        // if (delayTime === 0) {
        //     maze.setNodes(newMaze)
        // } else {
        //     for (const action of actionsToVisualize) {
        //         // After every action, check whether the generation is stopped by user. If yes, reset the
        //         // stopGeneration to false, set the game state to 0 and exit from loop & function
        //         if (stopVisualization.current) {
        //             setStopVisualization(false)
        //             setGameState(gameStateOptions[2])
        //             visualizeStep(maze, {type: 'resetVisited'})
        //             visualizeStep(maze, {type: 'resetCurrent'})
        //             return
        //         } else {
        //             await delay(delayTime)
        //             visualizeStep(maze, action)
        //         }
        //     }
        // }
        // setGameState(gameStateOptions[5])
    }, [setStopVisualization, algorithmsSettings.visualizationSpeed])

    const solveMaze = () => {
        config.setGameState(4)
        // In case already solved, but the user wants to solve again (maybe with different speed, etc.)
        maze.applySingleAction({type: 'resetRoute'})
        maze.applySingleAction({type: 'resetVisited'})

        const solvingFunction = solvingAlgorithmOptions[algorithmsSettings.solvingAlgorithm].relatedFunction
        const {newMaze, actionsToVisualize} = solvingFunction(maze.nodesToJS)
        visualizeSolving(newMaze, actionsToVisualize)
    }

    return (
        <div onMouseDown={() => setMouseIsDown(true)}
             onMouseUp={() => setMouseIsDown(false)}>
            <ConfigurationPanel
                config={config}
                algorithmsSettings={algorithmsSettings}
                onAlgorithmSettingChange={onAlgorithmSettingChange}
                generationAlgorithmOptions={generationAlgorithmOptions}
                solvingAlgorithmOptions={solvingAlgorithmOptions}
                generationFunction={generateMaze}
                solvingFunction={solveMaze}
                setStopVisualization={setStopVisualization}
            />
            <Stack className="maze" alignItems='center' spacing={1} marginY={'1rem'}>
                <GameState config={config}/>
                <MazeLegend/>
                <Maze
                    gameStateId={gameState.id}
                    maze={maze}
                    markNodeVisited={markNodeVisited}
                />
            </Stack>
        </div>
    )
})

export default MazeGame

import ConfigurationPanel from "./ConfigurationPanel";
import Maze from "./Maze";
import {useState, useCallback, useEffect, useRef} from "react";
import {useImmerReducer} from "use-immer"
import recursiveBacktracking from '../algorithms/generation/recursiveBacktracking'
import breadthFirstSearch from "../algorithms/solving/breadthFirstSearch";
import {Stack} from "@mui/material";
import {GameState} from "./GameState";
import MazeLegend from "./MazeLegend";
import {checkIfValidStep, getReachableNeighborNodes} from "../algorithms/helpers";
import huntAndKillAlgorithm from "../algorithms/generation/huntAndKillAlgorithm";

const COLUMNS_NUMBER = 20;
const ROWS_NUMBER = 8;
// const COLUMNS_NUMBER = 5;
// const ROWS_NUMBER = 4;
const INITIAL_MAZE = []
for (let i = 0; i < ROWS_NUMBER; i++) {
    const mazeRow = []
    for (let j = 0; j < COLUMNS_NUMBER; j++) {
        mazeRow.push({
            availablePathways: {north: false, south: false, west: false, east: false},
            visited: false,
            current: false,
            isRoute: false,
            row: i,
            column: j
        })
    }
    INITIAL_MAZE.push(mazeRow)
}

const delayTimeMapping = {0: 500, 1: 50, 2: 0.1, 3: 0}

const mazeNodesReducer = (draft, action) => {
    switch (action.type) {
        case 'markCurrent':
            draft[action.payload.row][action.payload.column].current = true
            break
        case 'markVisited':
            draft[action.payload.row][action.payload.column].visited = true
            break
        case 'clearCurrent':
            draft[action.payload.row][action.payload.column].current = false
            break
        // case 'markPath':
        //     draft[action.payload.row][action.payload.column].availablePathways[action.payload.path] = true
        //     break
        case 'bulkMarkPath':
            for (let item of action.payload) {
                draft[item.row][item.column].availablePathways[item.path] = true
            }
            break
        case 'resetRoute':
            for (let row of draft) {
                for (let node of row) {
                    node.isRoute = false
                }
            }
            break
        case 'resetVisited':
            for (let row of draft) {
                for (let node of row) {
                    node.visited = false
                }
            }
            break
        case 'resetCurrent':
            for (let row of draft) {
                for (let node of row) {
                    node.current = false
                }
            }
            break
        case 'setMaze':
            for (let rowNumber = 0; rowNumber < action.payload.newMaze.length; rowNumber++) {
                draft[rowNumber] = action.payload.newMaze[rowNumber]
            }
            break
        case 'markRoute':
            for (let item of action.payload) {
                draft[item.row][item.column].isRoute = true
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
    'kruskals_algorithm': {title: "Kruskal's Algorithm", relatedFunction: null},
}

const solvingAlgorithmOptions = {
    'breadth_first_search': {title: "Breadth First Search", relatedFunction: breadthFirstSearch},
    'depth_first_search': {title: "Depth First Search", relatedFunction: null},
}

const MazeGame = () => {
    const [maze, dispatchMaze] = useImmerReducer(mazeNodesReducer, INITIAL_MAZE)
    const [gameState, setGameState] = useState(gameStateOptions[0])
    const [algorithmsSettings, setAlgorithmsSettings] = useState({
        generationAlgorithm: 'hunt_and_kill_algorithm',
        solvingAlgorithm: 'breadth_first_search',
        visualizationSpeed: 2
    })
    const mouseIsDown = useRef(false)
    const mazeRef = useRef(maze)
    const stopVisualization = useRef(false)

    const startSolving = useRef(false)
    const startGenerating = useRef(false)

    const setStopVisualization = useCallback(value => stopVisualization.current = value, [])
    const setMouseIsDown = value => mouseIsDown.current = value


    // Use callback should be used in all the following functions because they are either props passed to
    // the configuration panel or functions that props depend on. Rendering configuration panel after every maze
    // node update is very heavy on performance and should be avoided
    const markNodeVisited = useCallback((row, column, force = false) => {
        if (
            (force || mouseIsDown.current) &&
            checkIfValidStep(mazeRef.current, row, column) &&
            [2, 3].includes(gameState.id)
        ) {
            dispatchMaze({type: 'markVisited', payload: {row: row, column: column}})
            if (row === 0 && column === 0) {
                setGameState(gameStateOptions[3])
            } else if (row === ROWS_NUMBER - 1 && column === COLUMNS_NUMBER - 1) {
                setGameState(gameStateOptions[5])
            }
        }
    }, [gameState.id, dispatchMaze])

    const onAlgorithmSettingChange = useCallback((fieldName, newValue) => {
        setAlgorithmsSettings(prevState => ({...prevState, [fieldName]: newValue}))
    }, [])

    // ------------------------ MAZE GENERATION FUNCTIONS -------------------------------
    const visualizeGeneration = useCallback(async (newMaze, actionsToVisualize) => {
        const delayTime = delayTimeMapping[algorithmsSettings.visualizationSpeed]
        if (delayTime === 0) {
            dispatchMaze({type: 'setMaze', payload: {newMaze: newMaze}})
        } else {
            for (const action of actionsToVisualize) {
                // After every action, check whether the generation is stopped by user. If yes, reset the
                // stopGeneration to false, set the game state to 0 and exit from loop & function
                if (stopVisualization.current) {
                    setStopVisualization(false)
                    setGameState(gameStateOptions[0])
                    dispatchMaze({type: 'setMaze', payload: {newMaze: INITIAL_MAZE}})
                    return
                } else {
                    await delay(delayTime)
                    dispatchMaze(action)
                }
            }
        }
        dispatchMaze({type: 'resetVisited'})
        setGameState(gameStateOptions[2])
    }, [setStopVisualization, algorithmsSettings.visualizationSpeed, dispatchMaze])

    const generateMaze = useCallback(() => {
        startGenerating.current = false
        const generationFunction = generationAlgorithmOptions[algorithmsSettings.generationAlgorithm].relatedFunction
        const {newMaze, actionsToVisualize} = generationFunction(INITIAL_MAZE)
        visualizeGeneration(newMaze, actionsToVisualize)
    }, [algorithmsSettings.generationAlgorithm, visualizeGeneration])

    const startGenerationFunction = useCallback(() => {
        setGameState(gameStateOptions[1])
        startGenerating.current = true
        // Maze might be empty. In this scenario, resetting the maze to initial_maze will not change the state,
        // thus - useEffect will not be called and the maze will not be generated. To handle this, if first
        // node has no neighbours (=no availablePathways), we should start the generation manually
        if (!getReachableNeighborNodes(mazeRef.current, mazeRef.current[0][0]).length) {
            generateMaze()
        } else {
            dispatchMaze({type: 'setMaze', payload: {newMaze: INITIAL_MAZE}})

        }
    }, [generateMaze, dispatchMaze])

    // ------------------------ MAZE SOLVING FUNCTIONS ----------------------------------
    const visualizeSolving = useCallback(async (newMaze, actionsToVisualize) => {
        const delayTime = delayTimeMapping[algorithmsSettings.visualizationSpeed]
        if (delayTime === 0) {
            dispatchMaze({type: 'setMaze', payload: {newMaze: newMaze}})
        } else {
            for (const action of actionsToVisualize) {
                // After every action, check whether the generation is stopped by user. If yes, reset the
                // stopGeneration to false, set the game state to 0 and exit from loop & function
                if (stopVisualization.current) {
                    setStopVisualization(false)
                    setGameState(gameStateOptions[2])
                    dispatchMaze({type: 'resetVisited'})
                    dispatchMaze({type: 'resetCurrent'})
                    return
                } else {
                    await delay(delayTime)
                    dispatchMaze(action)
                }
            }
        }
        setGameState(gameStateOptions[5])
    }, [setStopVisualization, algorithmsSettings.visualizationSpeed, dispatchMaze])

    const solveMaze = useCallback(() => {
        startSolving.current = false
        const solvingFunction = solvingAlgorithmOptions[algorithmsSettings.solvingAlgorithm].relatedFunction
        const {newMaze, actionsToVisualize} = solvingFunction(mazeRef.current)
        visualizeSolving(newMaze, actionsToVisualize)
    }, [algorithmsSettings.solvingAlgorithm, visualizeSolving])

    const startSolvingFunction = useCallback(() => {
        setGameState(gameStateOptions[4])
        // In case already solved, but the user wants to solve again (maybe with different speed, etc.)
        dispatchMaze({type: 'resetRoute'})
        startSolving.current = true
        if (mazeRef.current[0][0].visited) {
            dispatchMaze({type: 'resetVisited'})
        } else {
            solveMaze()
        }

    }, [dispatchMaze, solveMaze])


    useEffect(() => {
        // Create a mutable ref to maze in order to use it in functions like markNodeVisited (more specifically - for the
        // check if valid step inside it) and not cause re-rendering after maze state change
        mazeRef.current = maze
        if (startSolving.current) {
            solveMaze()
        }
        if (startGenerating.current) {
            generateMaze()
        }
    }, [maze, solveMaze, generateMaze])

    return (
        <div onMouseDown={() => setMouseIsDown(true)}
             onMouseUp={() => setMouseIsDown(false)}>
            <ConfigurationPanel
                algorithmsSettings={algorithmsSettings}
                onAlgorithmSettingChange={onAlgorithmSettingChange}
                generationAlgorithmOptions={generationAlgorithmOptions}
                solvingAlgorithmOptions={solvingAlgorithmOptions}
                generationFunction={startGenerationFunction}
                solvingFunction={startSolvingFunction}
                gameStateId={gameState.id}
                setStopVisualization={setStopVisualization}
            />
            <Stack className="maze" alignItems='center' spacing={1} marginY={'1rem'}>
                <GameState title={gameState.title} description={gameState.description}/>
                <MazeLegend/>
                <Maze
                    gameStateId={gameState.id}
                    mazeNodes={maze}
                    markNodeVisited={markNodeVisited}
                />
            </Stack>
        </div>
    )
}

export default MazeGame

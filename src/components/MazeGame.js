import ConfigurationPanel from "./ConfigurationPanel";
import Maze from "./Maze";
import {useState, useCallback} from "react";
import {useImmerReducer} from "use-immer"
import recursiveBacktrackingCaller from '../algorithms/generation/recursiveBacktracking'
import {Stack} from "@mui/material";
import {GameState} from "./GameState";
import MazeLegend from "./MazeLegend";

const COLUMNS_NUMBER = 25;
const ROWS_NUMBER = 10;
// const COLUMNS_NUMBER = 5;
// const ROWS_NUMBER = 4;
const INITIAL_MAZE = []
for (let i = 0; i < ROWS_NUMBER; i++) {
    const mazeRow = []
    for (let j = 0; j < COLUMNS_NUMBER; j++) {
        mazeRow.push({
            availablePathways: {north: false, south: false, west: false, east: false},
            visited: false,
            current: false
        })
    }
    INITIAL_MAZE.push(mazeRow)
}

const delayTimeMapping = {3: 0, 2: 1, 1: 50, 0: 150}

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
        case 'markPath':
            draft[action.payload.row][action.payload.column].availablePathways[action.payload.path] = true
            break
        case 'setMaze':
            for (let rowNumber = 0; rowNumber < action.payload.newMaze.length; rowNumber++) {
                draft[rowNumber] = action.payload.newMaze[rowNumber]
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
    'recursive_backtracking': {title: 'Recursive Backtracking', relatedFunction: recursiveBacktrackingCaller},
    'kruskals_algorithm': {title: "Kruskal's Algorithm", relatedFunction: null},
    'TODO': {title: 'TODO', relatedFunction: null}
}

const solvingAlgorithmOptions = {
    'dijkstras_algorithm': {title: "Dijkstra's Algorithm", relatedFunction: null},
    'bellman_ford': {title: "Bellman Form Algorithm", relatedFunction: null},
    'TODO': {title: 'TODO', relatedFunction: null}
}

const MazeGame = () => {
    const [maze, dispatchMaze] = useImmerReducer(mazeNodesReducer, INITIAL_MAZE)
    const [gameState, setGameState] = useState(gameStateOptions[0])
    const [algorithmsSettings, setAlgorithmsSettings] = useState({
        generationAlgorithm: 'recursive_backtracking',
        solvingAlgorithm: 'dijkstras_algorithm',
        visualizationSpeed: 2
    })

    // Use callback should be used in all the following functions because they are either props passed to
    // the configuration panel or functions that props depend on. Rendering configuration panel after every maze
    // node update is very heavy on performance and should be avoided
    const onAlgorithmSettingChange = useCallback((fieldName, newValue) => {
        setAlgorithmsSettings(prevState => ({...prevState, [fieldName]: newValue}))
    }, [])

    const visualizeGeneration = useCallback(async (newMaze, actionsToVisualize) => {
        const delayTime = delayTimeMapping[algorithmsSettings.visualizationSpeed]
        if (delayTime === 0) {
            dispatchMaze({type: 'setMaze', payload: {newMaze: newMaze}})
        } else {
            for (const action of actionsToVisualize) {
                await delay(delayTime)
                dispatchMaze(action)
            }
        }

        setGameState(gameStateOptions[2])
    }, [algorithmsSettings.visualizationSpeed, dispatchMaze])

    const generateMaze = useCallback(() => {
        dispatchMaze({type: 'setMaze', payload: {newMaze: INITIAL_MAZE}})
        setGameState(gameStateOptions[1])
        const generationFunction = generationAlgorithmOptions[algorithmsSettings.generationAlgorithm].relatedFunction
        const {newMaze, actionsToVisualize} = generationFunction(INITIAL_MAZE)
        visualizeGeneration(newMaze, actionsToVisualize)
    }, [algorithmsSettings.generationAlgorithm, visualizeGeneration, dispatchMaze])

    return (
        <>
            <ConfigurationPanel
                algorithmsSettings={algorithmsSettings}
                onAlgorithmSettingChange={onAlgorithmSettingChange}
                generationAlgorithmOptions={generationAlgorithmOptions}
                solvingAlgorithmOptions={solvingAlgorithmOptions}
                generationFunction={generateMaze}
            />
            <Stack className="maze" alignItems='center' spacing={1} marginY={'1rem'}>
                <GameState title={gameState.title} description={gameState.description}/>
                <MazeLegend/>
                <Maze gameStateId={gameState.id} mazeNodes={maze}/>
            </Stack>
        </>
    )
}

export default MazeGame

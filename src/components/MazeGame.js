import ConfigurationPanel from "./ConfigurationPanel/ConfigurationPanel";
import Maze from "./Maze/Maze";
import {useReducer, useState} from "react";

const COLUMNS_NUMBER = 30;
const ROWS_NUMBER = 12;
const INITIAL_MAZE_NODES = []
for (let i = 0; i < ROWS_NUMBER; i++) {
    const mazeRow = []
    for (let j = 0; j < COLUMNS_NUMBER; j++) {
        mazeRow.push({availablePathways: {}, visited: false})
    }
    INITIAL_MAZE_NODES.push(mazeRow)
}

const mazeNodesReducer = (state, action) => {
    switch (action.type) {
        case 'TODO':
            return null
        default:
            throw Error('Not Implemented')
    }
}

const gameStateOptions = {
    0: {
        title: 'Maze Generation Pending',
        description: 'Select the generation algorithm and click "generate" to start!'
    },
    1: {
        title: 'Generation In Progress',
        description: 'Wait for the generation algorithm to finish before continuing.'
    },
    2: {
        title: 'Ready To Start',
        description: 'Click the the "solve" button on top or start solving the maze yourself!'
    },
    3: {
        title: 'Game In Progress',
        description: 'Continue playing or click the "solve" button if you need help!'
    },
    4: {
        title: 'Solving In Progress',
        description: 'Wait for the solving algorithm to finish before continuing.'
    },
    5: {
        title: 'Finish! Maze Solved!',
        description: 'Nicely done! Click "generate" to continue with a new maze!'
    }
}

const generationAlgorithmOptions = {
    'recursive_backtracking': {title: 'Recursive Backtracking', relatedFunction: null},
    'kruskals_algorithm': {title: "Kruskal's Algorithm", relatedFunction: null},
    'TODO': {title: 'TODO', relatedFunction: null}
}

const solvingAlgorithmOptions = {
    'dijkstras_algorithm': {title: "Dijkstra's Algorithm", relatedFunction: null},
    'bellman_ford': {title: "Bellman Form Algorithm", relatedFunction: null},
    'TODO': {title: 'TODO', relatedFunction: null}
}

const MazeGame = () => {
    const [mazeNodes, dispatchMazeNodes] = useReducer(mazeNodesReducer, INITIAL_MAZE_NODES)
    const [gameState, setGameState] = useState(gameStateOptions[0])
    const [algorithmsSettings, setAlgorithmsSettings] = useState({
        generationAlgorithm: 'recursive_backtracking',
        solvingAlgorithm: 'dijkstras_algorithm',
        visualizationSpeed: 50
    })

    return (
        <>
            <ConfigurationPanel
                algorithmsSettings={algorithmsSettings}
                setAlgorithmsSettings={setAlgorithmsSettings}
                generationAlgorithmOptions={generationAlgorithmOptions}
                solvingAlgorithmOptions={solvingAlgorithmOptions}
            />
            <Maze
                gameState={gameState}
                mazeNodes={mazeNodes}
            />
        </>
    )
}

export default MazeGame

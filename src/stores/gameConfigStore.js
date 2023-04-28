import {makeAutoObservable} from "mobx";
import huntAndKillAlgorithm from "../algorithms/generation/huntAndKillAlgorithm";
import recursiveBacktracking from "../algorithms/generation/recursiveBacktracking";
import breadthFirstSearch from "../algorithms/solving/breadthFirstSearch";
import depthFirstSearch from "../algorithms/solving/depthFirstSearch";

const delayTimeOptions = {
    0: {
        id: 0,
        ms: 500,
        label: 'Slow'
    },
    1: {
        id: 1,
        ms: 100,
        label: 'Medium'
    },
    2: {
        id: 2,
        ms: 5,
        label: 'Fast'
    },
    3: {
        id: 3,
        ms: 1,
        label: 'Very Fast'
    },
    4: {
        id: 4,
        ms: 0,
        label: 'Immediate'
    }
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

export class GameConfigStore {
    rows = 8
    columns = 20
    gameState = gameStateOptions[0]
    visualizationDelay = delayTimeOptions[2]
    generationAlgorithm = generationAlgorithmOptions['hunt_and_kill_algorithm']
    solvingAlgorithm = solvingAlgorithmOptions['breadth_first_search']
    rootStore


    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false,
            visualizationDelayMarks: false
        })
        this.rootStore = rootStore
    }

    get visualizationDelayMarks() {
        const marks = []
        for (const item of Object.values(delayTimeOptions)) {
            marks.push({value: item.id, label: item.label})
        }
        return marks
    }

    setVisualizationDelay(delayOption) {
        this.visualizationDelay = delayTimeOptions[delayOption]
    }

    // Try setter
    setGameState(gameStateOptionKey) {
        this.gameState = gameStateOptions[gameStateOptionKey]
    }

    get visualizationInProgress() {
        return [1, 4].includes(this.gameState.id)
    }
}
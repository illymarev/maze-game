import {makeAutoObservable} from "mobx";
import huntAndKillAlgorithm from "../algorithms/generation/huntAndKillAlgorithm";
import recursiveBacktracking from "../algorithms/generation/recursiveBacktracking";
import breadthFirstSearch from "../algorithms/solving/breadthFirstSearch";
import depthFirstSearch from "../algorithms/solving/depthFirstSearch";

export const visualizationSpeedOptions = {
    0: {
        id: 0,
        delay: 500,
        label: 'Slow'
    },
    1: {
        id: 1,
        delay: 100,
        label: 'Medium'
    },
    2: {
        id: 2,
        delay: 5,
        label: 'Fast'
    },
    3: {
        id: 3,
        delay: 2,
        label: 'Very Fast'
    },
    4: {
        id: 4,
        delay: 0,
        label: 'Immediate'
    }
}

export const gameStateOptions = {
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

export const generationAlgorithmOptions = {
    0: {
        id: 0,
        title: 'Hunt and Kill Algorithm',
        relatedFunction: huntAndKillAlgorithm
    },
    1: {
        id: 1,
        title: 'Recursive Backtracking',
        relatedFunction: recursiveBacktracking
    },
}

export const solvingAlgorithmOptions = {
    0: {
        id: 0,
        title: "Breadth First Search",
        relatedFunction: breadthFirstSearch
    },
    1: {
        id: 1,
        title: "Depth First Search",
        relatedFunction: depthFirstSearch
    }
}

export const mazeSizeOptions = {
    0: {
        id: 0,
        title: 'Small',
        rows: 6,
        columns: 12
    },
    1: {
        id: 1,
        title: 'Medium',
        rows: 12,
        columns: 24
    },
    2: {
        id: 2,
        title: 'Large',
        rows: 18,
        columns: 36
    }
}

export const defaultStartAndFinishPlacementOptions = {
    0: {id: 0, title: 'Longest shortest path edges'},
    1: {id: 1, title: 'Top left and bottom right corners'},
}

export class ConfigStore {
    mazeSize = mazeSizeOptions[0]
    gameState = gameStateOptions[0]
    visualizationSpeed = visualizationSpeedOptions[2]
    generationAlgorithm = generationAlgorithmOptions[0]
    solvingAlgorithm = solvingAlgorithmOptions[0]
    defaultStartAndFinishPlacement = defaultStartAndFinishPlacementOptions[0]

    gameStore


    constructor(gameStore) {
        makeAutoObservable(this, {
            gameStore: false,
        })
        this.gameStore = gameStore
    }


    // ======================== Actions ========================
    setDefaultStartAndFinishPlacement(placementOptionId) {
        this.defaultStartAndFinishPlacement = defaultStartAndFinishPlacementOptions[placementOptionId]
    }

    setMazeSize(mazeSizeId) {
        this.mazeSize = mazeSizeOptions[mazeSizeId]
    }

    setVisualizationDelay(visualizationSpeedOptionKey) {
        this.visualizationSpeed = visualizationSpeedOptions[visualizationSpeedOptionKey]
    }

    setGameState(gameStateOptionKey) {
        this.gameState = gameStateOptions[gameStateOptionKey]
    }

    setGenerationAlgorithm(generationAlgorithmOptionKey) {
        this.generationAlgorithm = generationAlgorithmOptions[generationAlgorithmOptionKey]
    }

    setSolvingAlgorithm(solvingAlgorithmOptionKey) {
        this.solvingAlgorithm = solvingAlgorithmOptions[solvingAlgorithmOptionKey]
    }

    // ======================== Computeds  =====================

    get rows() {
        return this.mazeSize.rows
    }

    get columns() {
        return this.mazeSize.columns
    }

    get visualizationInProgress() {
        return [1, 4].includes(this.gameState.id)
    }

    get visualizationDelay() {
        return this.visualizationSpeed.delay
    }

    get generationFunction() {
        return this.generationAlgorithm.relatedFunction
    }

    get solvingFunction() {
        return this.solvingAlgorithm.relatedFunction
    }

    get isUsersSolvingInputAllowed() {
        return [2, 3].includes(this.gameState.id)
    }

}
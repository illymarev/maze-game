import {makeAutoObservable} from "mobx";
import huntAndKillAlgorithm from "../algorithms/generation/huntAndKillAlgorithm";
import recursiveBacktracking from "../algorithms/generation/recursiveBacktracking";
import breadthFirstSearch from "../algorithms/solving/breadthFirstSearch";
import depthFirstSearch from "../algorithms/solving/depthFirstSearch";
import kruskalsAlgorithm from "../algorithms/generation/kruskalsAlgorithm";

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
        label: 'Fast'
    },
    3: {
        id: 3,
        delay: 1.5,
        label: 'Very fast'
    },
    4: {
        id: 4,
        delay: 0,
        label: 'Immediate'
    }
}

export const generationAlgorithmOptions = {
    0: {
        id: 0,
        title: "Kruskal's algorithm (no current highlight)",
        relatedFunction: kruskalsAlgorithm.bind(null, false)
    },
    1: {
        id: 1,
        title: "Kruskal's algorithm (current highlighted)",
        relatedFunction: kruskalsAlgorithm.bind(null, true)
    },
    2: {
        id: 2,
        title: 'Hunt and Kill Algorithm',
        relatedFunction: huntAndKillAlgorithm
    },
    3: {
        id: 3,
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
        rows: 8,
        columns: 16
    },
    1: {
        id: 1,
        title: 'Medium',
        rows: 13,
        columns: 26
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

    get visualizationDelay() {
        return this.visualizationSpeed.delay
    }

    get generationFunction() {
        return this.generationAlgorithm.relatedFunction
    }

    get solvingFunction() {
        return this.solvingAlgorithm.relatedFunction
    }

}
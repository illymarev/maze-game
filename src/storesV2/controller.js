import {
    finishedSolving,
    generationInProgress,
    generationPending,
    readyToSolve,
    solvingInProgress
} from "./options/gameStateOptions";
import {longestShortestPathEdges} from "./options/defaultStartAndFinishPlacementOptions";
import {findDiameter} from "../algorithms/diameter"; // TODO this should be default
import {immediate, fast} from "./options/visualizationSpeedOptions";

// Controls all the complex logic involving multiple stores
class Controller {
    constructor(rootStore) {
        this.maze = rootStore.mazeStore
        this.config = rootStore.configStore
        this.state = rootStore.stateStore

        this.interval = null
        this.visualizationActions = []
        this.startNode = null
        this.endNode = null
        this.shortestPath = null
        this.blockVisualization = null
    }

    // ================== Generation =====================

    createEmptyMaze() {
        this.maze.createEmptyNodes(this.config.rows, this.config.columns)
    }

    finishMazeGeneration() {
        this.maze.changeStartNode(this.startNode)
        this.maze.changeFinishNode(this.endNode)
        this.state.setGameState(readyToSolve)
    }

    generateMaze() {
        this.state.setGameState(generationInProgress)
        // In case the maze is already generated, it should be reset to a new, empty one. Also, the size
        // might need to be adjusted
        this.createEmptyMaze()

        // Reset these values because they point to an old maze, not the new one
        this.maze.mazeStart = null
        this.maze.mazeFinish = null

        const {newMaze, visualizationActions} = this.config.generationFunction(this.maze.nodesToJS)

        // Calculate start/finish placement
        if (this.config.defaultStartAndFinishPlacement.id === longestShortestPathEdges) {
            const {startNode, endNode} = findDiameter(newMaze)
            this.startNode = startNode
            this.endNode = endNode
        } else {
            this.startNode = {row: 0, column: 0}
            this.endNode = {row: newMaze.length - 1, columns: newMaze[0].length - 1}
        }

        // Apply the visualization
        if (this.config.visualizationSpeed.id === immediate) {
            this.maze.setNodes(newMaze)
            this.finishMazeGeneration()
        } else if (this.config.visualizationSpeed.id === fast) {
            this.visualizationActions = visualizationActions
            window.requestAnimationFrame(this.visualizeSingleStep.bind(this))
        } else {
            this.visualizationActions = visualizationActions
            this.interval = setInterval(this.visualizeSingleStep.bind(this), this.config.visualizationDelay)
        }
    }

    // ================== Solving ========================
    finishMazeSolving() {
        this.maze.applyVisualizationAction({type: 'bulkSetRoute', payload: this.shortestPath}) // TODO think about the wording
        // of "route"
        this.state.setGameState(finishedSolving)
    }

    solveMaze() {
        // In case already solved, but the user wants to solve again (maybe with different speed, etc.)
        this.maze.applyVisualizationAction({type: 'resetRoute'})
        this.maze.applyVisualizationAction({type: 'resetVisited'})

        this.state.setGameState(solvingInProgress)

        const maze = this.maze.nodesToJS
        const startNode = maze[this.maze.start.row][this.maze.start.column]
        const endNode = maze[this.maze.finish.row][this.maze.finish.column]

        const {
            newMaze,
            visualizationActions,
            route
        } = this.config.solvingFunction(maze, startNode, endNode)

        this.shortestPath = route

        if (this.config.visualizationSpeed.id === immediate) {
            this.maze.setNodes(newMaze)
            this.finishMazeSolving()
        } else if (this.config.visualizationSpeed.id === fast) {
            this.visualizationActions = visualizationActions
            window.requestAnimationFrame(this.visualizeSingleStep.bind(this))
        } else {
            this.visualizationActions = visualizationActions
            this.interval = setInterval(this.visualizeSingleStep.bind(this), this.config.visualizationDelay)
        }
    }

    // ================== Visualization ==================
    applyFinalVisualizationActions() {
        if (this.state.gameState.id === generationInProgress) {
            this.finishMazeGeneration()
        } else if (this.state.gameState.id === solvingInProgress) {
            this.finishMazeSolving()
        }
    }

    stopVisualization() {
        if (this.config.visualizationSpeed.id === fast) {
            this.blockVisualization = true
        } else {
            clearInterval(this.interval)
            this.interval = null
        }
        this.visualizationActions = []

        if (this.state.gameState.id === generationInProgress) {
            this.state.setGameState(generationPending)
            this.createEmptyMaze()
        } else if (this.state.gameState.id === solvingInProgress) {
            this.maze.applyVisualizationAction({type: 'resetVisited'})
            this.maze.applyVisualizationAction({type: 'resetCurrent'})
            this.state.setGameState(readyToSolve)
        }
    }

    visualizeSingleStep() {
        // Visualization Speed "fast" uses the window.requestAnimationFrame. This code is needed to stop
        // the visualization at this speed. Other speeds use the interval, so it will just be cancelled within
        // the stopVisualization function
        if (this.config.visualizationSpeed === fast && this.blockVisualization) {
            this.blockVisualization = false
            return
        }

        if (this.visualizationActions.length) {
            const action = this.visualizationActions.dequeue()
            this.maze.applyVisualizationAction(action)

            if (this.config.visualizationSpeed.id === fast) {
                return window.requestAnimationFrame(this.visualizeSingleStep.bind(this))
            } else {
                return
            }
        }

        this.applyFinalVisualizationActions()
        clearInterval(this.interval)
        this.interval = null
    }
}

// TODO
// 2) fix start/end moving functionality
// 3) fix user's input functionality
// Verify that everything works and refactor react components after that
// Global cleanup

export default Controller
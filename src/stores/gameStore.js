import {ConfigStore} from "./configStore";
import {MazeStore} from "./mazeStore";
import {StateStore} from "./stateStore";
import {reaction} from "mobx";
import {findDiameter} from "../algorithms/diameter";
import {
    generationPending,
    generationInProgress,
    solvingInProgress,
    readyToSolve,
    finishedSolving
} from "./options/gameStates";

export class GameStore {

    constructor() {
        this.state = new StateStore(this)
        this.config = new ConfigStore(this)
        this.maze = new MazeStore(this)

        reaction(
            () => this.config.mazeSize.id,
            () => {
                this.state.setGameState(generationPending);
                this.maze.createEmptyNodes()
            }
        )

        this.interval = null
        this.actionsToVisualize = []
        this.startNode = null
        this.endNode = null
        this.correctRoute = null
        this.blockVisualization = false
    }

    stopVisualization() {
        if (this.config.visualizationSpeed.id === 2) {
            this.blockVisualization = true
        } else {
            clearInterval(this.interval)
            this.interval = null
        }
        this.actionsToVisualize = []


        if (this.state.gameState.id === generationInProgress) {
            this.state.setGameState(generationPending)
            this.maze.createEmptyNodes()
        } else if (this.state.gameState.id === solvingInProgress) {
            this.state.setGameState(readyToSolve)
            this.maze.applySingleAction({type: 'resetVisited'})
            this.maze.applySingleAction({type: 'resetCurrent'})
        }
    }

    visualizeSingleStep() {
        if (this.config.visualizationSpeed.id === 2 && this.blockVisualization) {
            this.blockVisualization = false
            return
        }

        if (this.actionsToVisualize.length) {
            const action = this.actionsToVisualize.pop()
            this.maze.applySingleAction(action)

            if (this.config.visualizationSpeed.id === 2) {
                return window.requestAnimationFrame(this.visualizeSingleStep.bind(this))
            } else {
                return
            }
        }

        this.applyFinalVisualizationActions()
        clearInterval(this.interval)
        this.interval = null
    }

    applyFinalVisualizationActions() {
        if (this.state.gameState.id === generationInProgress) {
            this.state.setGameState(readyToSolve)
            this.maze.nodes[this.startNode.row][this.startNode.column].setIsStart(true)
            this.maze.nodes[this.endNode.row][this.endNode.column].setIsFinish(true)
        } else if (this.state.gameState.id === solvingInProgress) {
            this.state.setGameState(finishedSolving)
            this.maze.applySingleAction({type: 'markRoute', payload: this.correctRoute})
        }
    }

    generateMaze() {
        this.state.setGameState(generationInProgress)
        // In case the maze is already generated, it should be reset to a new, empty one
        this.maze.createEmptyNodes()

        // Reset these values because these point to an old maze, not the new one
        this.maze.mazeStart = null
        this.maze.mazeFinish = null

        const {newMaze, actionsToVisualize} = this.config.generationFunction(this.maze.nodesToJS)

        if (this.config.defaultStartAndFinishPlacement.id === 0) {
            const {startNode, endNode} = findDiameter(newMaze)
            this.startNode = startNode
            this.endNode = endNode
        } else {
            this.startNode = {row: 0, column: 0}
            this.endNode = {row: this.config.rows - 1, column: this.config.columns - 1}
        }

        if (this.config.visualizationDelay === 0) {
            this.maze.setNodes(newMaze)
            this.applyFinalVisualizationActions()
        } else {
            this.actionsToVisualize = actionsToVisualize.reverse() // reverse to avoid building a queue
            if (this.config.visualizationSpeed.id === 2) {
                window.requestAnimationFrame(this.visualizeSingleStep.bind(this))
            } else {
                this.interval = setInterval(this.visualizeSingleStep.bind(this), this.config.visualizationDelay)
            }
        }
    }

    solveMaze() {
        this.state.setGameState(solvingInProgress)

        // In case already solved, but the user wants to solve again (maybe with different speed, etc.)
        this.maze.applySingleAction({type: 'resetRoute'})
        this.maze.applySingleAction({type: 'resetVisited'})

        const {
            newMaze,
            actionsToVisualize,
            route
        } = this.config.solvingFunction(this.maze.nodesToJS, this.maze.mazeStart, this.maze.mazeFinish)

        this.correctRoute = route

        if (this.config.visualizationDelay === 0) {
            this.maze.setNodes(newMaze)
            this.applyFinalVisualizationActions()
        } else {
            this.actionsToVisualize = actionsToVisualize.reverse()
            if (this.config.visualizationSpeed.id === 2) {
                window.requestAnimationFrame(this.visualizeSingleStep.bind(this))
            } else {
                this.interval = setInterval(this.visualizeSingleStep.bind(this), this.config.visualizationDelay)
            }
        }
    }

    showCorrectPath() {
        const nodes = this.maze.nodesToJS
        nodes.map(row => row.map(item => item.visited = false))
        const {route} = this.config.solvingFunction(nodes, this.maze.mazeStart, this.maze.mazeFinish)
        this.maze.applySingleAction({type: 'markRoute', payload: route})
    }
}
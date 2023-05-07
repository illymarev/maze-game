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
                this.stopVisualization();
                this.state.setGameState(generationPending);
                this.maze.createEmptyNodes()
            }
        )


        // Timeouts are significantly faster than setInterval & requestAnimationFrame when doing low delay.
        // The main purpose of extra-low delays is to ensure that large mazes can be generated in short periods of time,
        // so frame skipping is fine in this scenario and I think that it's better to skip frames than wait for minutes
        // while something like 100x100 maze is generated.
        // A separate speed that will use requestAnimationFrame might be added in future versions
        // TODO write a note about the fact that this is an expected behaviour somewhere in the guide
        this.timeouts = [] // keep track of all timeouts in order to be able to cancel them
    }

    stopVisualization() {
        for (const timeoutId of this.timeouts) {
            clearTimeout(timeoutId)
        }
        this.timeouts = []

        if (this.state.gameState.id === generationInProgress) {
            this.state.setGameState(generationPending)
            this.maze.createEmptyNodes()
        } else if (this.state.gameState.id === solvingInProgress) {
            this.state.setGameState(readyToSolve)
            this.maze.applySingleAction({type: 'resetVisited'})
            this.maze.applySingleAction({type: 'resetCurrent'})
        }
    }

    generateMaze() {
        this.state.setGameState(generationInProgress)

        // In case the maze is already generated, it should be reset to a new, empty one
        this.maze.createEmptyNodes()

        const {newMaze, actionsToVisualize} = this.config.generationFunction(this.maze.nodesToJS)

        let {startNode, endNode} = {
            startNode: {row: 0, column: 0},
            endNode: {row: this.config.rows - 1, column: this.config.columns - 1}
        }
        if (this.config.defaultStartAndFinishPlacement.id === 0) {
            const furthestNodesCombination = findDiameter(newMaze)
            startNode = furthestNodesCombination.startNode
            endNode = furthestNodesCombination.endNode
        }


        if (this.config.visualizationDelay === 0) {
            this.maze.setNodes(newMaze)
            this.maze.nodes[startNode.row][startNode.column].setIsStart(true)
            this.maze.nodes[endNode.row][endNode.column].setIsFinish(true)

            this.state.setGameState(readyToSolve)
        } else {
            let currentDelay = this.config.visualizationDelay

            for (const action of actionsToVisualize) {
                this.timeouts.push(setTimeout(() => {
                    this.maze.applySingleAction(action)
                }, currentDelay))
                currentDelay = currentDelay + this.config.visualizationDelay
            }

            // Although the function setTimeout does not guarantee the specific delay in case the stack
            // is full, it does guarantee the order of execution
            this.timeouts.push(setTimeout(() => {
                // this.maze.nodes[0][0].setIsStart(true);
                // this.maze.nodes[this.config.rows - 1][this.config.columns - 1].setIsFinish(true);
                this.maze.nodes[startNode.row][startNode.column].setIsStart(true)
                this.maze.nodes[endNode.row][endNode.column].setIsFinish(true)
                this.state.setGameState(readyToSolve)
                this.timeouts = []
            }, currentDelay + this.config.visualizationDelay))
        }
    }

    solveMaze() {
        this.state.setGameState(solvingInProgress)

        // In case already solved, but the user wants to solve again (maybe with different speed, etc.)
        this.maze.applySingleAction({type: 'resetRoute'})
        this.maze.applySingleAction({type: 'resetVisited'})

        const {
            newMaze,
            actionsToVisualize
        } = this.config.solvingFunction(this.maze.nodesToJS, this.maze.mazeStart, this.maze.mazeFinish)

        if (this.config.visualizationDelay === 0) {
            this.maze.setNodes(newMaze)
            this.state.setGameState(finishedSolving)
        } else {
            let currentDelay = this.config.visualizationDelay

            for (const action of actionsToVisualize) {
                this.timeouts.push(setTimeout(() => {
                    this.maze.applySingleAction(action)
                }, currentDelay))
                currentDelay = currentDelay + this.config.visualizationDelay
            }

            // Although the function setTimeout does not guarantee the specific delay in case the stack
            // is full, it does guarantee the order of execution
            this.timeouts.push(setTimeout(() => {
                this.state.setGameState(finishedSolving)
                this.timeouts = []
            }, currentDelay + this.config.visualizationDelay))
        }
    }
}
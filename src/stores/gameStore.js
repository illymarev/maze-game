import {ConfigStore} from "./configStore";
import {MazeStore} from "./mazeStore";
import {UiState} from "./uiStateStore";
import {reaction} from "mobx";
import {findDiameter} from "../algorithms/diameter";

export class GameStore {

    constructor() {
        this.uiState = new UiState(this)
        this.config = new ConfigStore(this)
        this.maze = new MazeStore(this)

        reaction(
            () => this.config.mazeSize.id,
            () => {
                this.stopVisualization();
                this.config.setGameState(0);
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

        if (this.config.gameState.id === 1) {
            this.config.setGameState(0)
            this.maze.createEmptyNodes()
        } else if (this.config.gameState.id === 4) {
            this.config.setGameState(2)
            this.maze.applySingleAction({type: 'resetVisited'})
            this.maze.applySingleAction({type: 'resetCurrent'})
        }
    }

    generateMaze() {
        this.config.setGameState(1)

        // In case the maze is already generated, it should be reset to a new, empty one
        this.maze.createEmptyNodes()

        const {newMaze, actionsToVisualize} = this.config.generationFunction(this.maze.nodesToJS)
        const {startNode, endNode} = findDiameter(newMaze)

        if (this.config.visualizationDelay === 0) {
            this.maze.setNodes(newMaze)
            // TODO make optional setting
            // this.maze.nodes[0][0].setIsStart(true);
            // this.maze.nodes[this.config.rows - 1][this.config.columns - 1].setIsFinish(true);
            this.maze.nodes[startNode.row][startNode.column].setIsStart(true)
            this.maze.nodes[endNode.row][endNode.column].setIsFinish(true)

            this.config.setGameState(2)
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
                this.config.setGameState(2)
                this.timeouts = []
            }, currentDelay + this.config.visualizationDelay))
        }
    }

    solveMaze() {
        this.config.setGameState(4)

        // In case already solved, but the user wants to solve again (maybe with different speed, etc.)
        this.maze.applySingleAction({type: 'resetRoute'})
        this.maze.applySingleAction({type: 'resetVisited'})

        const {
            newMaze,
            actionsToVisualize
        } = this.config.solvingFunction(this.maze.nodesToJS, this.maze.mazeStart, this.maze.mazeFinish)

        if (this.config.visualizationDelay === 0) {
            this.maze.setNodes(newMaze)
            this.config.setGameState(5)
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
                this.config.setGameState(5)
                this.timeouts = []
            }, currentDelay + this.config.visualizationDelay))
        }
    }
}
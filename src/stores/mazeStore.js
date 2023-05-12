import {makeAutoObservable} from "mobx";
import {toJS} from "mobx";
import {getReachableNeighborNodes} from "../algorithms/helpers";

export class MazeStore {
    gameStore
    config
    mazeStart
    mazeFinish

    nodes = []

    constructor(gameStore) {
        makeAutoObservable(this, {
            // todo read whether this should be overriden
            applySingleAction: false,
            gameStore: false,
            config: false,
            mazeStart: false,
            mazeFinish: false
        })
        this.gameStore = gameStore
        this.config = gameStore.config
        this.createEmptyNodes()
    }

    // TODO
    applySingleAction(action) {
        switch (action.type) {
            case 'markCurrent':
                this.nodes[action.payload.row][action.payload.column].markCurrent()
                break
            case 'markVisited':
                this.nodes[action.payload.row][action.payload.column].markVisited()
                break
            case 'clearCurrent':
                this.nodes[action.payload.row][action.payload.column].clearCurrent()
                break
            case 'bulkMarkPath':
                for (let item of action.payload) {
                    this.nodes[item.row][item.column].markPath(item.path)
                }
                break
            case 'bulkMarkCurrent':
                for (let item of action.payload){
                    this.nodes[item.row][item.column].markCurrent()
                }
                break
            case 'bulkClearCurrent':
                for (let item of action.payload){
                    this.nodes[item.row][item.column].clearCurrent()
                }
                break
            case 'resetRoute':
                for (let row of this.nodes) {
                    for (let node of row) {
                        node.clearRoute()
                    }
                }
                break
            case 'resetVisited':
                for (let row of this.nodes) {
                    for (let node of row) {
                        node.clearVisited()
                    }
                }
                break
            case 'resetCurrent':
                for (let row of this.nodes) {
                    for (let node of row) {
                        node.clearCurrent()
                    }
                }
                break
            case 'markRoute':
                for (let item of action.payload) {
                    this.nodes[item.row][item.column].markRoute()
                }
                break
            default:
                throw Error('Not Implemented')
        }

    }

    createEmptyNodes() {
        const newNodes = []
        for (let row = 0; row < this.config.rows; row++) {
            const mazeRow = []
            for (let column = 0; column < this.config.columns; column++) {
                const node = new MazeNode(this, row, column)
                mazeRow.push(node)
            }
            newNodes.push(mazeRow)
        }
        this.nodes = newNodes
    }

    setNodes(newMazeNodes) {
        const newNodes = []
        for (let row = 0; row < newMazeNodes.length; row++) {
            const newRow = []
            for (let column = 0; column < newMazeNodes[0].length; column++) {
                const node = new MazeNode(this, row, column)
                node.availablePathways = newMazeNodes[row][column].availablePathways
                node.visited = newMazeNodes[row][column].visited
                node.current = newMazeNodes[row][column].current
                node.isRoute = newMazeNodes[row][column].isRoute
                node.isStart = newMazeNodes[row][column].isStart
                node.isFinish = newMazeNodes[row][column].isFinish
                newRow.push(node)
            }
            newNodes.push(newRow)
        }
        this.nodes = newNodes
    }

    get nodesToJS() {
        return toJS(this).nodes
    }

}

export class MazeNode {
    maze = null
    row = null
    column = null

    availablePathways = {north: false, south: false, west: false, east: false} // TODO read more graph theory
    // and consider renaming this to "edges"
    visited = false
    current = false
    isRoute = false
    isStart = false
    isFinish = false

    constructor(maze, row, column) {
        makeAutoObservable(this, {
            row: false,
            column: false,
            maze: false
        })
        this.maze = maze
        this.row = row
        this.column = column

    }

    setIsStart(bool) {
        if (bool === true) {
            const previousStart = this.maze.mazeStart
            if (previousStart) {
                this.maze.nodes[previousStart.row][previousStart.column].setIsStart(false)
            }
            this.maze.mazeStart = {row: this.row, column: this.column}
        }
        this.isStart = bool
    }

    setIsFinish(bool) {
        if (bool === true) {
            const previousFinish = this.maze.mazeFinish
            if (previousFinish) {
                this.maze.nodes[previousFinish.row][previousFinish.column].setIsFinish(false)
            }
            this.maze.mazeFinish = {row: this.row, column: this.column}
        }
        this.isFinish = bool
    }

    markCurrent() {
        this.current = true
    }

    markVisited() {
        this.visited = true
    }

    clearCurrent() {
        this.current = false
    }

    markPath(path) {
        this.availablePathways[path] = true
    }

    clearRoute() {
        this.isRoute = false
    }

    clearVisited() {
        this.visited = false
    }

    markRoute() {
        this.isRoute = true
    }

    get hasVisitedNeighbour() {
        return getReachableNeighborNodes(this.maze.nodes, this).some(node => node.visited)
    }
}
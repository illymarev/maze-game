import {makeAutoObservable} from "mobx";

// https://mobx.js.org/defining-data-stores.html
// TODO read again about Root Store later and decide whether it's needed in this project
export class MazeNodesStore {
    rows = 8
    columns = 20
    nodes = []

    constructor() {
        makeAutoObservable(this, {
            bulkMarkPath: false,
            resetRoute: false,
            resetVisited: false,
            resetCurrent: false
        })
        this.createNodes()
    }

    createNodes() {
        const newNodes = []
        for (let i = 0; i < this.rows; i++) {
            const mazeRow = []
            for (let j = 0; j < this.columns; j++) {
                const node = new MazeNode(this, i, j)
                mazeRow.push(node)
            }
            newNodes.push(mazeRow)
        }
        this.nodes = newNodes
    }

    markRoute(action) {
        for (let item of action.payload) {
            this.nodes[item.row][item.column].markRoute()
        }
    }

    bulkMarkPath(action) {
        for (let item of action.payload) {
            this.nodes[item.row][item.column].markPath(item.path)
        }
    }

    resetRoute() {
        for (let row of this.nodes) {
            for (let node of row) {
                node.clearRoute()
            }
        }
    }

    resetVisited() {
        for (let row of this.nodes) {
            for (let node of row) {
                node.clearVisited()
            }
        }
    }

    resetCurrent() {
        for (let row of this.nodes) {
            for (let node of row) {
                node.clearCurrent()
            }
        }
    }

}

export class MazeNode {
    row = null
    column = null
    nodesStore = null
    availablePathways = {north: false, south: false, west: false, east: false}
    visited = false
    current = false
    isRoute = false

    constructor(nodesStore, row, column) {
        makeAutoObservable(this, {
            row: false,
            column: false,
            nodesStore: false
        })
        this.row = row
        this.column = column
        this.nodesStore = nodesStore
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
}
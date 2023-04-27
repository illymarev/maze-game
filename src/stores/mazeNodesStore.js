import {makeAutoObservable} from "mobx";
import {toJS} from "mobx";

// https://mobx.js.org/defining-data-stores.html
// TODO read again about Root Store later and decide whether it's needed in this project
export class MazeNodesStore {
    rows = 8
    columns = 20
    nodes = []

    constructor() {
        makeAutoObservable(this)
        this.createEmptyNodes()
    }

    createEmptyNodes() {
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

    get firstNodeVisited() {
        return this.nodes[0][0].visited
    }

    get nodesToJS() {
        return toJS(this).nodes
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
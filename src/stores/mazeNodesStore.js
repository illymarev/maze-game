import {makeAutoObservable} from "mobx";
import {toJS} from "mobx";

// https://mobx.js.org/defining-data-stores.html
// TODO read again about Root Store later and decide whether it's needed in this project
// TODO rename?
export class MazeNodesStore {
    rows = 8
    columns = 20
    nodes = []

    constructor() {
        makeAutoObservable(this, {
            // todo read whether this should be overriden
            applyMultipleActions: false,
            applySingleAction: false
        })
        this.createEmptyNodes()
    }

    // TODO move delayTime somewhere here
    applyMultipleActions(delayTime, actions, mode) {
        // let currentDelay = delayTime
        //
        // for (const action of actions){
        //     setTimeout(() => {
        //         this.applySingleAction(action)
        //     }, currentDelay)
        //     currentDelay = currentDelay + delayTime
        // }
        //
        // if (mode === 'generation'){
        //     setTimeout(() => {
        //         this.applySingleAction({type: 'resetVisited'})
        //         setGameState(gameStateOptions[2])
        //     }, initialDelay + delayTime)
        // }
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
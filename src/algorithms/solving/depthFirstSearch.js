import {getReachableNeighborNodes} from "../helpers";
import {removePreviousNodes, trackRoute} from "./utils";
import {pickRandomItem} from "../generation/utils";

const depthFirstSearch = (maze, startNodeCoordinates, endNodeCoordinates) => {
    const startNode = maze[startNodeCoordinates.row][startNodeCoordinates.column]
    const endNode = maze[endNodeCoordinates.row][endNodeCoordinates.column]
    const actionsToVisualize = []


    findRoute(maze, startNode, endNode, actionsToVisualize)
    const route = trackRoute(endNode)
    actionsToVisualize.push({
        type: 'markRoute',
        payload: route.map(node => ({row: node.row, column: node.column}))
    })
    removePreviousNodes(maze)

    return {
        newMaze: maze,
        actionsToVisualize: actionsToVisualize
    }
}

const findRoute = (maze, startNode, endNode, actionsToVisualize) => {
    const visitedStack = []
    let node = startNode

    while (true) {
        actionsToVisualize.push({
            type: 'markCurrent',
            payload: {row: node.row, column: node.column}
        })

        if (node === endNode) {
            node.visited = true
            node.previousNode = visitedStack[visitedStack.length - 1]
            actionsToVisualize.push({
                type: 'markVisited',
                payload: {row: node.row, column: node.column}
            })
            actionsToVisualize.push({
                type: 'clearCurrent',
                payload: {row: node.row, column: node.column}
            })
            break
        }


        if (!node.visited) {
            node.visited = true
            node.previousNode = visitedStack[visitedStack.length - 1]
            visitedStack.push(node)
            actionsToVisualize.push({
                type: 'markVisited',
                payload: {row: node.row, column: node.column}
            })
        }

        const unvisitedNeighbours = getReachableNeighborNodes(maze, node).filter(neighbour => !neighbour.visited)
        if (unvisitedNeighbours.length) {
            const nextNode = pickRandomItem(unvisitedNeighbours)
            actionsToVisualize.push({
                type: 'clearCurrent',
                payload: {row: node.row, column: node.column}
            })
            node = nextNode
        } else {
            // Start backtracking
            visitedStack.pop()
            actionsToVisualize.push({
                type: 'clearCurrent',
                payload: {row: node.row, column: node.column}
            })
            node = visitedStack[visitedStack.length - 1]
        }
    }
}

export default depthFirstSearch
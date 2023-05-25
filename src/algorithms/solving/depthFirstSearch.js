import {getReachableNeighborNodes} from "../helpers";
import {trackRoute} from "./utils";
import {pickRandomItem} from "../generation/utils";

const depthFirstSearch = (maze, startNode, endNode) => {
    const actionsToVisualize = []
    const visitedStack = []
    let node = startNode

    while (true) {
        actionsToVisualize.push({
            type: 'markCurrent',
            payload: {row: node.row, column: node.column}
        })

        if (!node.visited) {
            node.visited = true
            node.previousNode = visitedStack[visitedStack.length - 1]
            visitedStack.push(node)
            actionsToVisualize.push({
                type: 'markVisited',
                payload: {row: node.row, column: node.column}
            })
        }

        if (node === endNode) {
            actionsToVisualize.push({
                type: 'clearCurrent',
                payload: {row: node.row, column: node.column}
            })
            visitedStack.length = 0
            break
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
            visitedStack.pop() // remove the current node from the stack
            actionsToVisualize.push({
                type: 'clearCurrent',
                payload: {row: node.row, column: node.column}
            })
            node = visitedStack[visitedStack.length - 1]
        }
    }

    return {
        newMaze: maze,
        route: trackRoute(endNode),
        actionsToVisualize: actionsToVisualize
    }
}

export default depthFirstSearch
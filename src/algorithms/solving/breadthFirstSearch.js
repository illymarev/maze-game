import {getReachableNeighborNodes} from "../helpers";
import {trackRoute} from "./utils";

const breadthFirstSearch = maze => {
    const startNode = maze[0][0]
    const endNode = maze[maze.length - 1][maze[0].length - 1]
    const actionsToVisualize = []

    const queue = [startNode]

    startNode.visited = true
    startNode.previousNode = null
    actionsToVisualize.push({
        type: 'markVisited',
        payload: {row: startNode.row, column: startNode.column}
    })

    while (queue.length) {
        const currentNode = queue.shift()
        actionsToVisualize.push({
            type: 'markCurrent',
            payload: {row: currentNode.row, column: currentNode.column}
        })

        const neighbourNodes = getReachableNeighborNodes(maze, currentNode)
        for (const neighbourNode of neighbourNodes) {
            if (!neighbourNode.visited) {
                neighbourNode.visited = true
                queue.push(neighbourNode)
                neighbourNode.previousNode = currentNode
                actionsToVisualize.push({
                    type: 'markVisited',
                    payload: {row: neighbourNode.row, column: neighbourNode.column}
                })
                if (neighbourNode === endNode) {
                    queue.length = 0
                    actionsToVisualize.push({
                        type: 'clearCurrent',
                        payload: {row: currentNode.row, column: currentNode.column}
                    })
                    break
                }
            }
        }
        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: currentNode.row, column: currentNode.column}
        })
    }
    const route = trackRoute(endNode)
    actionsToVisualize.push({
        type: 'markRoute',
        payload: route.map(node => ({row: node.row, column: node.column}))
    })

    for (const row of maze) {
        for (const node of row) {
            delete node.previousNode
        }
    }

    return {
        newMaze: maze,
        actionsToVisualize: actionsToVisualize
    }
}


export default breadthFirstSearch



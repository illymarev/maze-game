import {getReachableNeighborNodes} from "../helpers";
import {removePreviousNodes, trackRoute} from "./utils";

const breadthFirstSearch = maze => {
    const startNode = maze[0][0]
    const endNode = maze[maze.length - 1][maze[0].length - 1]
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

        const unvisitedNeighbours = getReachableNeighborNodes(maze, currentNode).filter(item => !item.visited)
        for (const neighbour of unvisitedNeighbours) {
            queue.push(neighbour)
            neighbour.previousNode = currentNode
            neighbour.visited = true
            actionsToVisualize.push({
                type: 'markVisited',
                payload: {row: neighbour.row, column: neighbour.column}
            })

            if (neighbour === endNode) queue.length = 0
        }

        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: currentNode.row, column: currentNode.column}
        })
    }
}


export default breadthFirstSearch



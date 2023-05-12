import {getReachableNeighborNodes} from "../helpers";
import {removePreviousNodes, trackRoute} from "./utils";

const breadthFirstSearch = (maze, startNodeCoordinates, endNodeCoordinates) => {
    const startNode = maze[startNodeCoordinates.row][startNodeCoordinates.column]
    const endNode = maze[endNodeCoordinates.row][endNodeCoordinates.column]
    const actionsToVisualize = []

    findRoute(maze, startNode, endNode, actionsToVisualize)
    const route = trackRoute(endNode)
    removePreviousNodes(maze)

    return {
        newMaze: maze,
        actionsToVisualize: actionsToVisualize,
        route: route
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
        const currentNode = queue.shift() // todo implement a queue
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

            if (neighbour === endNode) {
                queue.length = 0;
                break;
            }
        }

        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: currentNode.row, column: currentNode.column}
        })
    }
}


export default breadthFirstSearch



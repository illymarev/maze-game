import {getReachableNeighborNodes} from "../helpers";
import {trackRoute} from "./utils";
import Queue from "../dataStructures/Queue";

const breadthFirstSearch = (maze, startNode, endNode) => {
    const actionsToVisualize = []
    const queue = new Queue()

    queue.enqueue(startNode)
    startNode.visited = true
    startNode.previousNode = null
    actionsToVisualize.push({
        type: 'markVisited',
        payload: {row: startNode.row, column: startNode.column}
    })

    while (queue.length) {
        const currentNode = queue.dequeue()
        actionsToVisualize.push({
            type: 'markCurrent',
            payload: {row: currentNode.row, column: currentNode.column}
        })

        const unvisitedNeighbours = getReachableNeighborNodes(maze, currentNode).filter(item => !item.visited)
        for (const neighbour of unvisitedNeighbours) {
            queue.enqueue(neighbour)
            neighbour.previousNode = currentNode
            neighbour.visited = true
            actionsToVisualize.push({
                type: 'markVisited',
                payload: {row: neighbour.row, column: neighbour.column}
            })

            if (neighbour === endNode) {
                queue.clear(); // will clear all items in the queue and, as a result, stop the while loop
                break; // break out of the unvisitedNeighbours loop, the end node has already been found, thus -
                // there's no need in checking other neighbours
            }
        }

        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: currentNode.row, column: currentNode.column}
        })
    }

    return {
        newMaze: maze,
        route: trackRoute(endNode),
        actionsToVisualize: actionsToVisualize
    }
}

export default breadthFirstSearch

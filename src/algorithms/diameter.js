// TODO This requires a huge amount of calculations and causes a freeze even on high-end pcs/laptops
// Either transfer this to a web worker, or to the AWS lambda
// This is not going to be visualized because visualizing it even for small maze is going to take a while
import {getReachableNeighborNodes} from "./helpers";
import Queue from "./dataStructures/Queue";

const resetVisited = maze => {
    for (const row of maze) {
        for (const node of row) {
            node.visited = false
        }
    }
}

export const findDiameter = maze => {
    const mazeCopy = []
    for (const row of maze) {
        const rowCopy = []
        for (const node of row) {
            rowCopy.push(
                {
                    availablePathways: {...node.availablePathways},
                    row: node.row,
                    column: node.column,
                    visited: false
                }
            )
        }
        mazeCopy.push(rowCopy)
    }


    let furthestNodes = {startNode: null, endNode: null, distance: 0}


    for (const row of mazeCopy) {
        for (const node of row) {
            // This function mutates the original data structure
            const currentFurthestCombination = findFurthestNode(node, mazeCopy)
            if (currentFurthestCombination.distance > furthestNodes.distance) {
                furthestNodes = currentFurthestCombination
            }
            resetVisited(mazeCopy) // resetting all visited nodes will be faster than creating a copy of the node
            // & maze every time
        }
    }

    return furthestNodes
}

const findFurthestNode = (startNode, maze) => {
    const queue = new Queue()
    queue.enqueue(startNode)
    startNode.visited = true
    startNode.previousNode = null
    startNode.distanceFromStart = 0

    let maxDistanceNode = startNode

    while (queue.length) {
        const currentNode = queue.dequeue()

        if (currentNode.distanceFromStart > maxDistanceNode.distanceFromStart) {
            maxDistanceNode = currentNode
        }

        const unvisitedNeighbours = getReachableNeighborNodes(maze, currentNode).filter(item => !item.visited)
        for (const neighbour of unvisitedNeighbours) {
            queue.enqueue(neighbour)
            neighbour.previousNode = currentNode
            neighbour.distanceFromStart = currentNode.distanceFromStart + 1
            neighbour.visited = true
        }
    }

    return {startNode: startNode, endNode: maxDistanceNode, distance: maxDistanceNode.distanceFromStart}

}
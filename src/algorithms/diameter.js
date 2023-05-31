import Queue from "./dataStructures/Queue";
import {getReachableNeighborNodes} from "./utils";

const findDiameter = maze => {
    const startNode = findFurthestNode(maze[0][0], maze)
    // The method above mutates the maze, thus - resetting visited nodes is required
    maze.map(row => row.map(node => node.visited = false))
    const endNode = findFurthestNode(startNode, maze)
    maze.map(row => row.map(node => node.visited = false))

    return {startNode: startNode, endNode: endNode}
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

        // >= is used instead of > for visual beauty because BFS always explores nodes in the same order.
        // If two neighbour nodes have the same distance from start, 1 node will always be visited before another.
        // If we set the first node as the finish, the second node will remain unvisited during the visualization,
        // thus - will not look very good. In order to avoid this, I use >=, so that the finish node will be the one
        // that is going to be visited the last.
        if (currentNode.distanceFromStart >= maxDistanceNode.distanceFromStart) {
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

    return maxDistanceNode

}

export default findDiameter;
import {reversedDirections, determineDirection} from "../directions";
import {getAllNeighbourNodes} from "../helpers";


const recursiveBacktracking = maze => {
    const visitedStack = []
    const actionsToVisualize = []
    const node = maze[0][0]

    recursivePart(maze, node, visitedStack, actionsToVisualize)
    return {
        newMaze: maze,
        actionsToVisualize: actionsToVisualize
    }
}

const recursivePart = (
    maze,
    node,
    visitedStack,
    actionsToVisualize
) => {
    actionsToVisualize.push({
        type: 'markCurrent',
        payload: {row: node.row, column: node.column}
    })

    if (!node.visited) {
        node.visited = true
        visitedStack.push(node)

        actionsToVisualize.push({
            type: 'markVisited',
            payload: {row: node.row, column: node.column}
        })
    }

    const unvisitedNeighbours = getAllNeighbourNodes(maze, node).filter(item => !item.visited)
    if (unvisitedNeighbours.length) {
        // Randomly select an unvisited neighbour
        const nextNode = unvisitedNeighbours[Math.floor(Math.random() * unvisitedNeighbours.length)]
        const directionToNextNode = determineDirection(node, nextNode)
        const reversedDirection = reversedDirections[directionToNextNode]

        // Mark the path from the current node to the next node
        node.availablePathways[directionToNextNode] = true
        // Mark the path from the next node to the current node
        nextNode.availablePathways[reversedDirection] = true

        // Visualize both paths at the same time.
        actionsToVisualize.push({
            type: 'bulkMarkPath',
            payload: [
                {row: node.row, column: node.column, path: directionToNextNode},
                {row: nextNode.row, column: nextNode.column, path: reversedDirection}
            ]
        })

        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: node.row, column: node.column}
        })

        return recursivePart(maze, nextNode, visitedStack, actionsToVisualize)
    }

    // This part of the code will be executed in case there are no unvisited neighbours. Start backtracking.
    visitedStack.pop() // remove current node from the stack
    if (visitedStack.length === 0) {
        // We are back at node [0][0], generation is finished
        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: node.row, column: node.column}
        })
    } else {
        const lastVisitedNode = visitedStack[visitedStack.length - 1]
        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: node.row, column: node.column}
        })
        return recursivePart(maze, lastVisitedNode, visitedStack, actionsToVisualize)
    }
}

export default recursiveBacktracking
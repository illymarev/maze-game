import {getAllNeighbourNodes} from "../utils";
import {determineDirectionAndCreateEdge, pickRandomItem, resetVisitedNodes} from "./utils";

const recursiveBacktracking = maze => {
    const visitedStack = []
    const actionsToVisualize = []
    const node = maze[0][0]

    // Call the recursive part of this algorithm; we don't need to initialize the visitedStack and actionsToVisualize
    // every time, so this function is separated
    recursivePart(maze, node, visitedStack, actionsToVisualize)
    resetVisitedNodes(maze, actionsToVisualize)

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
        const nextNode = pickRandomItem(unvisitedNeighbours)
        determineDirectionAndCreateEdge(node, nextNode, actionsToVisualize)

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
import {getAllNeighbourNodes} from "../helpers";
import {determineDirectionAndMarkPath, pickRandomItem} from "./utils";


const recursiveBacktracking = maze => {
    const visitedStack = []
    const actionsToVisualize = []
    const node = maze[0][0]

    recursivePart(maze, node, visitedStack, actionsToVisualize)
    for (const row of maze) {
        for (const node of row) {
            node.visited = false
        }
    }
    actionsToVisualize.push({type: 'resetVisited'})

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
        determineDirectionAndMarkPath(node, nextNode, actionsToVisualize)

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
import {directions, reversedDirections, getRandomDirectionsKeys} from "../directions";


const recursiveBacktracking = maze => {
    const visitedStack = []
    const actionsToVisualize = []

    recursivePart(maze, [0, 0], visitedStack, actionsToVisualize)
    return {
        newMaze: maze,
        actionsToVisualize: actionsToVisualize
    }
}

const recursivePart = (
    maze,
    currentNodeCoordinates,
    visitedStack,
    actionsToVisualize
) => {
    const [currentRow, currentColumn] = currentNodeCoordinates
    actionsToVisualize.push({
        type: 'markCurrent',
        payload: {row: currentRow, column: currentColumn}
    })

    if (!maze[currentRow][currentColumn].visited) {
        maze[currentRow][currentColumn].visited = true
        visitedStack.push(currentNodeCoordinates)

        actionsToVisualize.push({
            type: 'markVisited',
            payload: {row: currentRow, column: currentColumn}
        })
    }

    const nextNode = {exists: false, row: null, column: null, path: null}
    const randomDirectionsKeys = getRandomDirectionsKeys()
    for (const directionKey of randomDirectionsKeys) {
        const [nextRow, nextColumn] = directions[directionKey](currentRow, currentColumn)
        if (maze[nextRow]?.[nextColumn]?.visited === false) {
            nextNode.exists = true
            nextNode.row = nextRow
            nextNode.column = nextColumn
            nextNode.path = directionKey
            break
        }
    }

    if (nextNode.exists) {
        // Mark the path from the current node to the next node
        maze[currentRow][currentColumn].availablePathways[nextNode.path] = true

        // Mark the path from the next node to the current node
        const reversedDirection = reversedDirections[nextNode.path]
        maze[nextNode.row][nextNode.column].availablePathways[reversedDirection] = true


        // Visualize both paths at the same time.
        actionsToVisualize.push({
            type: 'bulkMarkPath',
            payload: [
                {row: currentRow, column: currentColumn, path: nextNode.path},
                {row: nextNode.row, column: nextNode.column, path: reversedDirection}
            ]
        })

        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: currentRow, column: currentColumn}
        })
        return recursivePart(maze, [nextNode.row, nextNode.column], visitedStack, actionsToVisualize)
    }

    if (visitedStack.length > 1) {
        // Remove the current node from the stack
        visitedStack.pop()
        const lastVisitedCoordinates = visitedStack[visitedStack.length - 1]
        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: currentRow, column: currentColumn}
        })
        return recursivePart(maze, lastVisitedCoordinates, visitedStack, actionsToVisualize)
    } else {
        // We are back at node [0][0], generation is finished
        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: currentRow, column: currentColumn}
        })
    }
}

export default recursiveBacktracking
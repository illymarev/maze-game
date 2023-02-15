import {directions, reversedDirections, getRandomDirectionsKeys} from "../directions";


const recursiveBacktrackingCaller = emptyMaze => {
    const mazeCopy = structuredClone(emptyMaze)

    const visitedStack = []
    const actionsToVisualize = []

    recursivePart(mazeCopy, [0, 0], visitedStack)
    return {
        newMaze: mazeCopy,
        actionsToVisualize: actionsToVisualize
    }
}

const recursivePart = (
    maze,
    currentNodeCoordinates,
    visitedStack
) => {
    const [currentRow, currentColumn] = currentNodeCoordinates

    if (!maze[currentRow][currentColumn].visited) {
        maze[currentRow][currentColumn].visited = true
        visitedStack.push(currentNodeCoordinates)
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
        }
    }

    if (nextNode.exists) {
        // Mark the path from the current node to the next node
        maze[currentRow][currentColumn].availablePathways[nextNode.path] = true

        // Mark the path from the next node to the current node
        const reversedDirection = reversedDirections[nextNode.path]
        maze[nextNode.row][nextNode.column].availablePathways[reversedDirection] = true

        return recursivePart(maze, [nextNode.row, nextNode.column], visitedStack)
    }

    if (visitedStack.length > 1) {
        // Remove the current node from the stack
        visitedStack.pop()
        const lastVisitedCoordinates = visitedStack[visitedStack.length - 1]
        return recursivePart(maze, lastVisitedCoordinates, visitedStack)
    }
}

export default recursiveBacktrackingCaller
export const directions = {
    // Given the following grid:
    // [[1, 2, 3],
    // [4, 5, 6],
    // [7, 8, 9]],
    // Assuming the coordinates of "1" are [0, 0], the coordinates of "5" are [1, 1].
    // In order to go 1 step north from "5", you would go to [0, 1].
    // In order to go 1 step east from "5", you would go to [1, 2].
    north: (row, column) => [row - 1, column],
    south: (row, column) => [row + 1, column],
    west: (row, column) => [row, column - 1],
    east: (row, column) => [row, column + 1]
}

export const reversedDirections = {
    north: 'south', south: 'north', west: 'east', east: 'west'
}

// Determines the direction between two nodes based on their coordinates
export const determineDirection = (startNode, targetNode) => {
    for (const [direction, calcFunction] of Object.entries(directions)) {
        const [row, column] = calcFunction(startNode.row, startNode.column)
        if (row === targetNode.row && column === targetNode.column) return direction
    }
}

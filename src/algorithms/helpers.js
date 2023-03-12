import {directions} from "./directions";

export const checkIfValidStep = (maze, row, column) => {
    if (row === 0 && column === 0) {
        return true
    } else {
        const node = maze[row][column]
        const neighborNodes = getReachableNeighborNodes(maze, node)
        return neighborNodes.some(node => node.visited)
    }
}

// returns neighbour nodes if path to them exists
export const getReachableNeighborNodes = (maze, node) => {
    const validPathways = Object.keys(node.availablePathways).filter(k => node.availablePathways[k])
    const neighborNodes = []
    for (const pathKey of validPathways) {
        const [neighborsRow, neighborsColumn] = directions[pathKey](node.row, node.column)
        neighborNodes.push(maze[neighborsRow][neighborsColumn])
    }
    return neighborNodes
}

export const getAllNeighbourNodes = (maze, node) => {
    const [maxRowNumber, maxColumnNumber] = [maze.length - 1, maze[0].length - 1]

    const allPathways = Object.keys(node.availablePathways)
    const neighbourNodes = []
    for (const pathKey of allPathways) {
        const [neighboursRow, neighboursColumn] = directions[pathKey](node.row, node.column)
        if (neighboursRow >= 0 && neighboursRow <= maxRowNumber &&
            neighboursColumn >= 0 && neighboursColumn <= maxColumnNumber) {
            neighbourNodes.push(maze[neighboursRow][neighboursColumn])
        }
    }
    return neighbourNodes
}

import {directions} from "./directions";

// TODO why is it called helpers, but there's utils in generation? Keep consistency

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

import {directions} from "./directions";

export const shuffleArray = array => {
    const arrayCopy = [...array]
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy
}

export const checkIfValidStep = (maze, row, column) => {
    if (row === 0 && column === 0) {
        return true
    } else {
        const node = maze[row][column]
        const neighborNodes = getNeighborNodes(maze, node)
        return neighborNodes.some(node => node.visited)
    }
}

export const getNeighborNodes = (maze, node) => {
    const validPathways = Object.keys(node.availablePathways).filter(k => node.availablePathways[k])
    const neighborNodes = []
    for (const pathKey of validPathways) {
        const [neighborsRow, neighborsColumn] = directions[pathKey](node.row, node.column)
        neighborNodes.push(maze[neighborsRow][neighborsColumn])
    }
    return neighborNodes
}

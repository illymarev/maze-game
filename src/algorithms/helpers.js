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
        const validPathways = Object.keys(node.availablePathways).filter(k => node.availablePathways[k])
        for (const pathKey of validPathways) {
            const [neighborsRow, neighborsColumn] = directions[pathKey](row, column)
            const neighborVisited = maze[neighborsRow][neighborsColumn].visited
            if (neighborVisited) {
                return true
            }
        }
        return false
    }
}

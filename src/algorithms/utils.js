import {directions} from "./directions";

// TODO refactor to edges
// returns neighbour nodes if an edge connecting them exists
export const getReachableNeighborNodes = (maze, node) => {
    const neighborNodes = []
    const validPathways = Object.keys(node.edges).filter(k => node.edges[k])
    for (const pathKey of validPathways) {
        const [neighborsRow, neighborsColumn] = directions[pathKey](node.row, node.column)
        neighborNodes.push(maze[neighborsRow][neighborsColumn])
    }
    return neighborNodes
}

// returns neighbour nodes regardless of whether there's an edge connecting them
export const getAllNeighbourNodes = (maze, node) => {
    const neighbourNodes = []
    const allPathways = Object.keys(node.edges)
    for (const pathKey of allPathways) {
        const [neighboursRow, neighboursColumn] = directions[pathKey](node.row, node.column)
        const neighbour = maze[neighboursRow]?.[neighboursColumn]
        if (neighbour) neighbourNodes.push(neighbour)
    }
    return neighbourNodes
}

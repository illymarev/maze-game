import {directions} from "./directions";

// returns neighbour nodes if an edge connecting them exists
export const getReachableNeighborNodes = (maze, node) => {
    const neighborNodes = []
    const existingEdges = Object.keys(node.edges).filter(k => node.edges[k])
    for (const edge of existingEdges) {
        const [neighborsRow, neighborsColumn] = directions[edge](node.row, node.column)
        neighborNodes.push(maze[neighborsRow][neighborsColumn])
    }
    return neighborNodes
}

// returns neighbour nodes regardless of whether there's an edge connecting them
export const getAllNeighbourNodes = (maze, node) => {
    const neighbourNodes = []
    const allEdges = Object.keys(node.edges)
    for (const edge of allEdges) {
        const [neighboursRow, neighboursColumn] = directions[edge](node.row, node.column)
        const neighbour = maze[neighboursRow]?.[neighboursColumn]
        if (neighbour) neighbourNodes.push(neighbour)
    }
    return neighbourNodes
}

import {determineDirectionAndMarkPath} from "./utils";

const getEdges = maze => {
    const [rows, columns] = [maze.length, maze[0].length]

    const edges = []
    for (let row of maze) {
        // columns -2 is needed in order to connect the second last one with the last one
        for (let columnNumber = 0; columnNumber <= columns - 2; columnNumber++) {
            const edge = [row[columnNumber], row[columnNumber + 1]]
            edges.push(edge)
        }
    }

    for (let columnNumber = 0; columnNumber < columns; columnNumber++) {
        for (let rowNumber = 0; rowNumber < rows - 1; rowNumber++) {
            const edge = [maze[rowNumber][columnNumber], maze[rowNumber + 1][columnNumber]]
            edges.push(edge)
        }
    }

    return edges
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// That's cool, implement using disjoint sets/union&find data structure now
export const kruskalsAlgorithm = (visualizeCurrent, maze) => {
    const edges = getEdges(maze)
    shuffleArray(edges)
    const actionsToVisualize = []

    for (const row of maze) {
        for (const node of row) {
            const newSet = new Set()
            newSet.add(node)
            node.associatedSet = newSet
        }
    }


    for (const edge of edges) {
        const [node1, node2] = edge
        if (visualizeCurrent) {
            actionsToVisualize.push({
                type: 'bulkMarkCurrent',
                payload: [{row: node1.row, column: node1.column}, {row: node2.row, column: node2.column}]
            })
        }

        if (!node1.associatedSet.has(node2)) {
            node1.associatedSet.add(node2)
            for (const node of node2.associatedSet) {
                node1.associatedSet.add(node)
                node.associatedSet = node1.associatedSet
            }
            node2.associatedSet = node1.associatedSet

            determineDirectionAndMarkPath(node1, node2, actionsToVisualize)
        }

        if (visualizeCurrent) {
            actionsToVisualize.push({
                type: 'bulkClearCurrent',
                payload: [{row: node1.row, column: node1.column}, {row: node2.row, column: node2.column}]
            })
        }

    }

    return {newMaze: maze, actionsToVisualize: actionsToVisualize}
}
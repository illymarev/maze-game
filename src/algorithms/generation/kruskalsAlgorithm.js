import {determineDirectionAndMarkPath} from "./utils";


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const getAllPossibleEdges = maze => {
    const [rows, columns] = [maze.length, maze[0].length]

    const edges = []
    for (let row of maze) {
        // columns -1 is needed in order to connect the second last one with the last one
        for (let columnNumber = 0; columnNumber < columns - 1; columnNumber++) {
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


const find = node => {
    if (node.parent !== node) {
        node.parent = find(node.parent)
    }
    return node.parent
}

const union = (node1, node2, actionsToVisualize) => {
    const parentOfNode1 = find(node1)
    const parentOfNode2 = find(node2)

    if (parentOfNode1 === parentOfNode2) return

    if (parentOfNode1.rank > parentOfNode2.rank) {
        parentOfNode2.parent = parentOfNode1
    } else if (parentOfNode1.rank < parentOfNode2.rank) {
        parentOfNode1.parent = parentOfNode2
    } else {
        parentOfNode2.parent = parentOfNode1
        parentOfNode1.rank++
    }
    determineDirectionAndMarkPath(node1, node2, actionsToVisualize)
}

/**
 * This is a modified version of the kruskal's algorithm. Since the graph is unweighted, edges are picked in random
 * order
 * @param visualizeCurrent whether the "current" should be highlighted during the visualization or not
 * @param maze
 * @returns {{newMaze, actionsToVisualize: *[]}}
 */
const kruskalsAlgorithm = (visualizeCurrent, maze) => {
    const allPossibleEdges = getAllPossibleEdges(maze)
    shuffleArray(allPossibleEdges)
    const actionsToVisualize = []

    for (const row of maze) {
        for (const node of row) {
            node.parent = node
            node.rank = 1
        }
    }


    for (const edge of allPossibleEdges) {
        const [node1, node2] = edge
        if (visualizeCurrent) {
            actionsToVisualize.push({
                type: 'bulkMarkCurrent',
                payload: [{row: node1.row, column: node1.column}, {row: node2.row, column: node2.column}]
            })
        }

        union(node1, node2, actionsToVisualize)

        if (visualizeCurrent) {
            actionsToVisualize.push({
                type: 'bulkClearCurrent',
                payload: [{row: node1.row, column: node1.column}, {row: node2.row, column: node2.column}]
            })
        }

    }

    return {newMaze: maze, actionsToVisualize: actionsToVisualize}
}


export default kruskalsAlgorithm
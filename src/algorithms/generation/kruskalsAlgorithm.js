import {determineDirectionAndMarkPath, shuffleArray, getAllPossibleEdges} from "./utils";

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

// Modified version of the kruskal's algorithm used to generate graphs instead of finding the MST
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
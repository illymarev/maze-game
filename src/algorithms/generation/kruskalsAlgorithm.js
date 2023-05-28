import {determineDirectionAndCreateEdge, shuffleArray, getAllPossibleEdges} from "./utils";
import Queue from "../dataStructures/Queue";

const find = node => {
    if (node.parent !== node) {
        node.parent = find(node.parent)
    }
    return node.parent
}

const union = (node1, node2, visualizationActions) => {
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
    determineDirectionAndCreateEdge(node1, node2, visualizationActions)
}

// Modified version of the Kruskal's algorithm used to generate graphs instead of finding the MST
const kruskalsAlgorithm = (visualizeCurrent, maze) => {
    const allPossibleEdges = getAllPossibleEdges(maze)
    shuffleArray(allPossibleEdges)
    const visualizationActions = new Queue()

    for (const row of maze) {
        for (const node of row) {
            node.parent = node
            node.rank = 1
        }
    }

    for (const edge of allPossibleEdges) {
        const [node1, node2] = edge
        if (visualizeCurrent) {
            visualizationActions.enqueue({
                type: 'bulkSetCurrent',
                payload: [
                    {row: node1.row, column: node1.column, value: true},
                    {row: node2.row, column: node2.column, value: true}
                ]
            })
        }

        union(node1, node2, visualizationActions)

        if (visualizeCurrent) {
            visualizationActions.enqueue({
                type: 'bulkSetCurrent',
                payload: [
                    {row: node1.row, column: node1.column, value: false},
                    {row: node2.row, column: node2.column, value: false}
                ]
            })
        }
    }

    return {newMaze: maze, visualizationActions: visualizationActions}
}


export default kruskalsAlgorithm
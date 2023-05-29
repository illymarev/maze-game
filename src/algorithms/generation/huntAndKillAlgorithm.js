import {getAllNeighbourNodes} from "../utils";
import {determineDirectionAndCreateEdge, pickRandomItem, resetVisitedNodes} from "./utils";
import Queue from "../dataStructures/Queue";

const huntAndKillAlgorithm = maze => {
    const visualizationActions = new Queue()
    let node = maze[0][0]

    while (true) {
        node = walk(maze, node, visualizationActions)
        if (!node) {
            node = hunt(maze, visualizationActions)
            if (!node) break
        }
    }

    resetVisitedNodes(maze, visualizationActions)

    return {
        newMaze: maze,
        visualizationActions: visualizationActions
    }

}

const hunt = (maze, visualizationActions) => {
    const columns = maze[0].length

    // Since current version of the maze has more columns than rows,
    // looping through columns, in my opinion, produces more beautiful mazes
    for (let column = 0; column < columns; column++) {
        for (let row of maze) {
            const node = row[column]

            visualizationActions.enqueue({
                type: 'setCurrent',
                payload: {row: node.row, column: node.column, value: true}
            })

            if (node.visited) {
                visualizationActions.enqueue({
                    type: 'setCurrent',
                    payload: {row: node.row, column: node.column, value: false}
                })
            } else {
                const visitedNeighbours = getAllNeighbourNodes(maze, node).filter(item => item.visited)
                if (visitedNeighbours.length) {
                    const neighbourNode = pickRandomItem(visitedNeighbours)
                    determineDirectionAndCreateEdge(node, neighbourNode, visualizationActions)

                    visualizationActions.enqueue({
                        type: 'setCurrent',
                        payload: {row: node.row, column: node.column, value: false}
                    })
                    return node
                }
            }
        }
    }
    return null
}

const walk = (maze, node, visualizationActions) => {
    visualizationActions.enqueue({
        type: 'setCurrent',
        payload: {row: node.row, column: node.column, value: true}
    })

    node.visited = true
    visualizationActions.enqueue({
        type: 'setVisited',
        payload: {row: node.row, column: node.column, value: true}
    })

    const unvisitedNeighbours = getAllNeighbourNodes(maze, node).filter(item => !item.visited)
    if (unvisitedNeighbours.length) {
        const nextNode = pickRandomItem(unvisitedNeighbours)
        determineDirectionAndCreateEdge(node, nextNode, visualizationActions)

        visualizationActions.enqueue({
            type: 'setCurrent',
            payload: {row: node.row, column: node.column, value: false}
        })
        return nextNode
    } else {
        visualizationActions.enqueue({
            type: 'setCurrent',
            payload: {row: node.row, column: node.column, value: false}
        })
        return null
    }
}

export default huntAndKillAlgorithm
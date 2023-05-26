import {getAllNeighbourNodes} from "../utils";
import {determineDirectionAndMarkPath, pickRandomItem, resetVisitedNodes} from "./utils";

const huntAndKillAlgorithm = maze => {
    const actionsToVisualize = []
    let node = maze[0][0]

    while (true) {
        node = walk(maze, node, actionsToVisualize)
        if (!node) {
            node = hunt(maze, actionsToVisualize)
            if (!node) break
        }
    }

    resetVisitedNodes(maze, actionsToVisualize)

    return {
        newMaze: maze,
        actionsToVisualize: actionsToVisualize
    }

}

const hunt = (maze, actionsToVisualize) => {
    const columns = maze[0].length

    // Since current version of the maze has more columns than rows,
    // looping through columns, in my opinion, produces more beautiful mazes
    for (let column = 0; column < columns; column++) {
        for (let row of maze) {
            const node = row[column]

            actionsToVisualize.push({
                type: 'markCurrent',
                payload: {row: node.row, column: node.column}
            })

            if (node.visited) {
                actionsToVisualize.push({
                    type: 'clearCurrent',
                    payload: {row: node.row, column: node.column}
                })
            } else {
                const visitedNeighbours = getAllNeighbourNodes(maze, node).filter(item => item.visited)
                if (visitedNeighbours.length) {
                    const neighbourNode = pickRandomItem(visitedNeighbours)
                    determineDirectionAndMarkPath(node, neighbourNode, actionsToVisualize)

                    actionsToVisualize.push({
                        type: 'clearCurrent',
                        payload: {row: node.row, column: node.column}
                    })
                    return node
                }
            }
        }
    }
    return null
}

const walk = (maze, node, actionsToVisualize) => {
    actionsToVisualize.push({
        type: 'markCurrent',
        payload: {row: node.row, column: node.column}
    })

    node.visited = true
    actionsToVisualize.push({
        type: 'markVisited',
        payload: {row: node.row, column: node.column}
    })

    const unvisitedNeighbours = getAllNeighbourNodes(maze, node).filter(item => !item.visited)
    if (unvisitedNeighbours.length) {
        const nextNode = pickRandomItem(unvisitedNeighbours)
        determineDirectionAndMarkPath(node, nextNode, actionsToVisualize)

        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: node.row, column: node.column}
        })
        return nextNode

    } else {
        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: node.row, column: node.column}
        })
        return null
    }
}

export default huntAndKillAlgorithm
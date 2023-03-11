import {determineDirection, directions, getRandomDirectionsKeys, reversedDirections} from "../directions";
import {getAllNeighbourNodes, shuffleArray} from "../helpers";

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

    return {
        newMaze: maze,
        actionsToVisualize: actionsToVisualize
    }

}

const hunt = (maze, actionsToVisualize) => {
    const columns = maze[0].length

    for (let column = 0; column < columns; column++) {
        for (let row of maze) {
            const node = row[column]

            actionsToVisualize.push({
                type: 'markCurrent',
                payload: {row: node.row, column: node.column}
            })
            if (!node.visited) {
                const allNeighbours = shuffleArray(getAllNeighbourNodes(maze, node))
                for (const neighbourNode of allNeighbours) {
                    if (neighbourNode.visited) {
                        const directionToNeighbour = determineDirection(node, neighbourNode)
                        const reversedDirection = reversedDirections[directionToNeighbour]
                        node.availablePathways[directionToNeighbour] = true
                        neighbourNode.availablePathways[reversedDirection] = true

                        actionsToVisualize.push({
                            type: 'bulkMarkPath',
                            payload: [
                                {row: node.row, column: node.column, path: directionToNeighbour},
                                {row: neighbourNode.row, column: neighbourNode.column, path: reversedDirection}
                            ]
                        })

                        actionsToVisualize.push({
                            type: 'clearCurrent',
                            payload: {row: node.row, column: node.column}
                        })

                        return node
                    }
                }
            }
            actionsToVisualize.push({
                type: 'clearCurrent',
                payload: {row: node.row, column: node.column}
            })
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

    const nextNode = {exists: false, row: null, column: null, path: null}
    const randomDirectionsKeys = getRandomDirectionsKeys()
    for (const directionKey of randomDirectionsKeys) {
        const [nextRow, nextColumn] = directions[directionKey](node.row, node.column)
        if (maze[nextRow]?.[nextColumn]?.visited === false) {
            nextNode.exists = true
            nextNode.row = nextRow
            nextNode.column = nextColumn
            nextNode.path = directionKey
            break
        }
    }
    if (!nextNode.exists) {
        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: node.row, column: node.column}
        })
        return null
    }

    node.availablePathways[nextNode.path] = true
    const reversedDirection = reversedDirections[nextNode.path]
    maze[nextNode.row][nextNode.column].availablePathways[reversedDirection] = true

    // Visualize both paths at the same time.
    actionsToVisualize.push({
        type: 'bulkMarkPath',
        payload: [
            {row: node.row, column: node.column, path: nextNode.path},
            {row: nextNode.row, column: nextNode.column, path: reversedDirection}
        ]
    })
    actionsToVisualize.push({
        type: 'clearCurrent',
        payload: {row: node.row, column: node.column}
    })

    return maze[nextNode.row][nextNode.column]

}

export default huntAndKillAlgorithm
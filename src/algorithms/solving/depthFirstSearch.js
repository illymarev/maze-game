import {getReachableNeighborNodes} from "../helpers";
import {trackRoute} from "./utils";

const depthFirstSearch = maze => {
    const actionsToVisualize = []
    const visitedStack = []

    let pathFound = false
    let endNode = maze[maze.length - 1][maze[0].length - 1]
    let node = maze[0][0]

    while (pathFound !== true) {
        if (node === endNode) {
            pathFound = true
        }

        actionsToVisualize.push({
            type: 'markCurrent',
            payload: {row: node.row, column: node.column}
        })


        if (!node.visited) {
            node.visited = true
            node.previousNode = visitedStack[visitedStack.length - 1]
            visitedStack.push(node)
            actionsToVisualize.push({
                type: 'markVisited',
                payload: {row: node.row, column: node.column}
            })
        }

        let nextNode = null
        const notVisitedNeighbours = getReachableNeighborNodes(maze, node).filter(neighbour => !neighbour.visited)
        if (notVisitedNeighbours.length) {
            nextNode = notVisitedNeighbours[Math.floor(Math.random() * notVisitedNeighbours.length)]
        }

        if (nextNode) {
            actionsToVisualize.push({
                type: 'clearCurrent',
                payload: {row: node.row, column: node.column}
            })
            node = nextNode
            continue
        }

        visitedStack.pop()
        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: node.row, column: node.column}
        })
        node = visitedStack[visitedStack.length - 1]
    }

    const route = trackRoute(endNode)
    actionsToVisualize.push({
        type: 'markRoute',
        payload: route.map(node => ({row: node.row, column: node.column}))
    })

    for (const row of maze) {
        for (const node of row) {
            delete node.previousNode
        }
    }

    return {
        newMaze: maze,
        actionsToVisualize: actionsToVisualize
    }
}

export default depthFirstSearch
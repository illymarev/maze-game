import {getReachableNeighborNodes} from "../helpers";
import {trackRoute} from "./common";

const depthFirstSearch = maze => {
    const mazeCopy = structuredClone(maze)
    const actionsToVisualize = []
    const visitedStack = []

    let pathFound = false
    let endNode = mazeCopy[mazeCopy.length - 1][mazeCopy[0].length - 1]
    let node = mazeCopy[0][0]

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
        const notVisitedNeighbours = getReachableNeighborNodes(mazeCopy, node).filter(neighbour => !neighbour.visited)
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

    for (const row of mazeCopy) {
        for (const node of row) {
            delete node.previousNode
        }
    }

    return {
        newMaze: mazeCopy,
        actionsToVisualize: actionsToVisualize
    }
}

export default depthFirstSearch
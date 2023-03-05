import {getReachableNeighborNodes} from "../helpers";

const breadthFirstSearch = maze => {
    const mazeCopy = structuredClone(maze)
    const startNode = mazeCopy[0][0]
    const endNode = mazeCopy[mazeCopy.length - 1][mazeCopy[0].length - 1]
    const actionsToVisualize = []

    const queue = [startNode]

    startNode.visited = true
    startNode.previousNode = null
    actionsToVisualize.push({
        type: 'markVisited',
        payload: {row: startNode.row, column: startNode.column}
    })

    while (queue.length) {
        const currentNode = queue.shift()
        actionsToVisualize.push({
            type: 'markCurrent',
            payload: {row: currentNode.row, column: currentNode.column}
        })

        const neighbourNodes = getReachableNeighborNodes(mazeCopy, currentNode)
        for (const neighbourNode of neighbourNodes) {
            if (!neighbourNode.visited) {
                neighbourNode.visited = true
                queue.push(neighbourNode)
                neighbourNode.previousNode = currentNode
                actionsToVisualize.push({
                    type: 'markVisited',
                    payload: {row: neighbourNode.row, column: neighbourNode.column}
                })
                if (neighbourNode === endNode) {
                    queue.length = 0
                    actionsToVisualize.push({
                        type: 'clearCurrent',
                        payload: {row: currentNode.row, column: currentNode.column}
                    })
                    break
                }
            }
        }
        actionsToVisualize.push({
            type: 'clearCurrent',
            payload: {row: currentNode.row, column: currentNode.column}
        })
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

const trackRoute = endNode => {
    const route = []
    let node = endNode
    while (node) {
        route.push(node)
        node.isRoute = true
        node = node.previousNode
    }
    route.reverse()
    return route
}

export default breadthFirstSearch



export const trackRoute = endNode => {
    const route = []
    let node = endNode
    while (node) {
        route.push({row: node.row, column: node.column})
        node = node.previousNode
    }
    route.reverse()
    return route
}

export const removePreviousNodes = maze => {
    for (const row of maze) {
        for (const node of row) {
            delete node.previousNode
        }
    }
}
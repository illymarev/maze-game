export const trackRoute = endNode => {
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
const trackRoute = endNode => {
    const route = [];
    let node = endNode;
    while (node) {
        route.push({row: node.row, column: node.column})
        node = node.previousNode
    }
    route.reverse();
    return route;
};

export default trackRoute;

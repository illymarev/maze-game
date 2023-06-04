import {getReachableNeighborNodes} from "../utils";
import trackRoute from "./utils";
import {pickRandomItem} from "../generation/utils";
import Queue from "../dataStructures/Queue";

const depthFirstSearch = (maze, startNode, endNode) => {
    const visualizationActions = new Queue();
    const visitedStack = [];
    let node = startNode;

    while (true) {
        visualizationActions.enqueue({
            type: 'setCurrent',
            payload: {row: node.row, column: node.column, value: true}
        });

        if (!node.visited) {
            node.visited = true;
            node.previousNode = visitedStack[visitedStack.length - 1];
            visitedStack.push(node);
            visualizationActions.enqueue({
                type: 'setVisited',
                payload: {row: node.row, column: node.column, value: true}
            });
        }

        if (node === endNode) {
            visualizationActions.enqueue({
                type: 'setCurrent',
                payload: {row: node.row, column: node.column, value: false}
            });
            visitedStack.length = 0;
            break;
        }

        const unvisitedNeighbours = getReachableNeighborNodes(maze, node).filter(neighbour => !neighbour.visited);
        if (unvisitedNeighbours.length) {
            const nextNode = pickRandomItem(unvisitedNeighbours);
            visualizationActions.enqueue({
                type: 'setCurrent',
                payload: {row: node.row, column: node.column, value: false}
            });
            node = nextNode;
        } else {
            // Start backtracking
            visitedStack.pop(); // remove the current node from the stack
            visualizationActions.enqueue({
                type: 'setCurrent',
                payload: {row: node.row, column: node.column, value: false}
            });
            node = visitedStack[visitedStack.length - 1];
        }
    }

    return {
        newMaze: maze,
        route: trackRoute(endNode),
        visualizationActions: visualizationActions
    };
}

export default depthFirstSearch;
import {getReachableNeighborNodes} from "../utils";
import trackRoute from "./utils";
import Queue from "../dataStructures/Queue";

const breadthFirstSearch = (maze, startNode, endNode) => {
    const visualizationActions = new Queue();
    const queue = new Queue();

    queue.enqueue(startNode);
    startNode.visited = true;
    startNode.previousNode = null;
    visualizationActions.enqueue({
        type: 'setVisited',
        payload: {row: startNode.row, column: startNode.column, value: true}
    });

    while (queue.length) {
        const currentNode = queue.dequeue();
        visualizationActions.enqueue({
            type: 'setCurrent',
            payload: {row: currentNode.row, column: currentNode.column, value: true}
        });

        const unvisitedNeighbours = getReachableNeighborNodes(maze, currentNode).filter(item => !item.visited);
        for (const neighbour of unvisitedNeighbours) {
            queue.enqueue(neighbour);
            neighbour.previousNode = currentNode;
            neighbour.visited = true;
            visualizationActions.enqueue({
                type: 'setVisited',
                payload: {row: neighbour.row, column: neighbour.column, value: true}
            });

            if (neighbour === endNode) {
                queue.clear(); // will clear all items in the queue and, as a result, stop the while loop
                break; // break out of the unvisitedNeighbours loop, the end node has already been found, thus -
                // there's no need in checking other neighbours
            }
        }

        visualizationActions.enqueue({
            type: 'setCurrent',
            payload: {row: currentNode.row, column: currentNode.column, value: false}
        });
    }

    return {
        newMaze: maze,
        route: trackRoute(endNode),
        visualizationActions: visualizationActions
    };
}

export default breadthFirstSearch;

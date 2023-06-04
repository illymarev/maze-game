import {getAllNeighbourNodes} from "../utils";
import {determineDirectionAndCreateEdge, pickRandomItem, resetVisitedNodes} from "./utils";
import Queue from "../dataStructures/Queue";

const recursiveBacktracking = maze => {
    const visitedStack = [];
    const visualizationActions = new Queue();
    const node = maze[0][0];

    // We don't need to initialize the visitedStack and visualizationActions every time, so this function is separated
    recursivePart(maze, node, visitedStack, visualizationActions);
    resetVisitedNodes(maze, visualizationActions);

    return {
        newMaze: maze,
        visualizationActions: visualizationActions
    }
}

const recursivePart = (
    maze,
    node,
    visitedStack,
    visualizationActions
) => {
    visualizationActions.enqueue({
        type: 'setCurrent',
        payload: {row: node.row, column: node.column, value: true}
    });

    if (!node.visited) {
        node.visited = true;
        visitedStack.push(node);

        visualizationActions.enqueue({
            type: 'setVisited',
            payload: {row: node.row, column: node.column, value: true}
        });
    }

    const unvisitedNeighbours = getAllNeighbourNodes(maze, node).filter(item => !item.visited);
    if (unvisitedNeighbours.length) {
        // Randomly select an unvisited neighbour
        const nextNode = pickRandomItem(unvisitedNeighbours);
        determineDirectionAndCreateEdge(node, nextNode, visualizationActions);

        visualizationActions.enqueue({
            type: 'setCurrent',
            payload: {row: node.row, column: node.column, value: false}
        });

        return recursivePart(maze, nextNode, visitedStack, visualizationActions);
    }

    // This part of the code will be executed in case there are no unvisited neighbours. Start backtracking.
    visitedStack.pop(); // remove current node from the stack
    if (visitedStack.length === 0) {
        // We are back at node [0][0], generation is finished
        visualizationActions.enqueue({
            type: 'setCurrent',
            payload: {row: node.row, column: node.column, value: false}
        });
    } else {
        const lastVisitedNode = visitedStack[visitedStack.length - 1];
        visualizationActions.enqueue({
            type: 'setCurrent',
            payload: {row: node.row, column: node.column, value: false}
        });
        return recursivePart(maze, lastVisitedNode, visitedStack, visualizationActions);
    }
}

export default recursiveBacktracking;
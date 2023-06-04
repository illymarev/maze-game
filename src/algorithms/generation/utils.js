import {determineDirection, reversedDirections} from "../directions";

export const pickRandomItem = array => array[Math.floor(Math.random() * array.length)];

export const determineDirectionAndCreateEdge = (startNode, endNode, visualizationActions) => {
    const directionToNextNode = determineDirection(startNode, endNode);
    const reversedDirection = reversedDirections[directionToNextNode];

    startNode.edges[directionToNextNode] = true; // create the edge from the start node to the end node
    endNode.edges[reversedDirection] = true; // create the edge from the end node to the start node

    // Visualize both edges at the same time because on the UI it is supposed to look like it's 1 edge
    visualizationActions.enqueue({
        type: 'bulkCreateEdge',
        payload: [
            {row: startNode.row, column: startNode.column, direction: directionToNextNode},
            {row: endNode.row, column: endNode.column, direction: reversedDirection}
        ]
    });
};

export const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

export const getAllPossibleEdges = maze => {
    const [rows, columns] = [maze.length, maze[0].length];

    const edges = []
    for (let row of maze) {
        // Since we are connecting the last column with the second last column, the iteration should stop
        // at the second last column because it will be connected with the next one, thus - the last one.
        for (let columnNumber = 0; columnNumber < columns - 1; columnNumber++) {
            const edge = [row[columnNumber], row[columnNumber + 1]];
            edges.push(edge);
        }
    }

    for (let columnNumber = 0; columnNumber < columns; columnNumber++) {
        // Same note as above, but regarding rows
        for (let rowNumber = 0; rowNumber < rows - 1; rowNumber++) {
            const edge = [maze[rowNumber][columnNumber], maze[rowNumber + 1][columnNumber]];
            edges.push(edge);
        }
    }

    return edges;
};

export const resetVisitedNodes = (maze, visualizationActions) => {
    for (const row of maze) {
        for (const node of row) {
            node.visited = false;
        }
    }
    visualizationActions.enqueue({type: 'resetVisited'});
};
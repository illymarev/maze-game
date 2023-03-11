import {determineDirection, reversedDirections} from "../directions";

export const pickRandomItem = array_ => array_[Math.floor(Math.random() * array_.length)]

export const determineDirectionAndMarkPath = (startNode, endNode, actionsToVisualize) => {
    const directionToNextNode = determineDirection(startNode, endNode)
    const reversedDirection = reversedDirections[directionToNextNode]

    startNode.availablePathways[directionToNextNode] = true // mark the path from the start node to the end node
    endNode.availablePathways[reversedDirection] = true // mark the path from the end node to the start node

    // Visualize both paths at the same time.
    actionsToVisualize.push({
        type: 'bulkMarkPath',
        payload: [
            {row: startNode.row, column: startNode.column, path: directionToNextNode},
            {row: endNode.row, column: endNode.column, path: reversedDirection}
        ]
    })
}
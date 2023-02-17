import {shuffleArray} from "./helpers";

/**
 These coordinates are based on the values of the matrix.
 Given the matrix:
 [[1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]],
 the coordinates of 5 are [1, 1]. In order to go 1 step north, you would go to [0, 1].
 In order to go 1 step east, you would go to [1, 2] and so on.
 */
export const directions = {
    north: (row, column) => [row - 1, column],
    south: (row, column) => [row + 1, column],
    west: (row, column) => [row, column - 1],
    east: (row, column) => [row, column + 1]
}

/**
 Can be used in order to determine the path from the next node to the current node by passing the pass from the
 current node to the next node
 */
export const reversedDirections = {
    north: 'south',
    south: 'north',
    west: 'east',
    east: 'west'
}
const directionsKeys = ['north', 'south', 'west', 'east']

export const getRandomDirectionsKeys = () => shuffleArray(directionsKeys);
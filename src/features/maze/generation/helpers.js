/**
 These coordinates are based on the values of the matrix.
 Given the matrix:
 [[1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]],
 the coordinates of 5 are [1, 1]. In order to go 1 step north, you would go to [0, 1].
 In order to go 1 step east, you would go to [1, 2] and so on.
 */
const North = (yCoordinates, xCoordinates) => [yCoordinates - 1, xCoordinates]
const South = (yCoordinates, xCoordinates) => [yCoordinates + 1, xCoordinates]
const West = (yCoordinates, xCoordinates) => [yCoordinates, xCoordinates - 1]
const East = (yCoordinates, xCoordinates) => [yCoordinates, xCoordinates + 1]

const directions = [['N', North], ['S', South], ['W', West], ['E', East]]

/* Randomize array using Durstenfeld shuffle algorithm */
export const randomizedDirections = () => {
    const directionsCopy = [...directions]
    for (let i = 3; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [directionsCopy[i], directionsCopy[j]] = [directionsCopy[j], directionsCopy[i]];
    }
    return directionsCopy
}

export const determineDirection = (currentCoordinates, nextCoordinates) => {
    const [currentY, currentX] = currentCoordinates
    const [nextY, nextX] = nextCoordinates

    if (currentY > nextY) {
        return 'N'
    } else if (currentY < nextY) {
        return 'S'
    } else if (currentX > nextX) {
        return 'W'
    } else if (currentX < nextX) {
        return 'E'
    }
}

export const delay = milliseconds => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
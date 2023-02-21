export const shuffleArray = array => {
    const arrayCopy = [...array]
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy
}

export const checkIfValidStep = ({maze, row, column}) => {
    if (row === 0 && column === 0){
        return true
    } else {
        // TODO tomorrow get all keys in valid pathways with value = true
        // and go through directions to determine whether the closest node is visited
    }
}

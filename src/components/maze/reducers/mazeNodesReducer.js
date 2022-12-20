const mazeNodesReducer = (state, action) => {
    switch (action.type) {
        case "CLEAR_CURRENT":
            return state.map(nestedArray => nestedArray.map(node => ({...node, current: false})))

        case "MARK_CURRENT":
            const newState1 = state.map(nestedArray => nestedArray.map(node => ({...node, current: false})))
            newState1[action.data.coordinates[0]][action.data.coordinates[1]]['current'] = true
            return newState1

        case "MARK_VISITED":
            const newState = [...state]
            newState[action.data.coordinates[0]][action.data.coordinates[1]]['visited'] = true
            return newState

        case "MARK_PATH":
            const updatedState = [...state]
            updatedState[action.data.coordinates[0]][action.data.coordinates[1]]['pathways'][action.data.path] = true
            return updatedState

        case "MAZE_INIT":
            const newMaze = []
            for (let i = 0; i < action.payload.rows; i++) {
                newMaze[i] = []
                for (let j = 0; j < action.payload.columns; j++) {
                    newMaze[i][j] = {
                        visited: false,
                        current: false,
                        pathways: {N: false, S: false, W: false, E: false}
                    };
                }
            }
            return newMaze

        case "MAZE_RESET":
            return state.map(nestedArray => nestedArray.map(_ => ({
                visited: false,
                current: false,
                pathways: {N: false, S: false, W: false, E: false}
            })))

        default:
            throw new Error()

    }
}

export default mazeNodesReducer
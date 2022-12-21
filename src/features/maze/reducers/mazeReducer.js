const mazeReducer = (draft, action) => {
    switch (action.type) {
        case "CLEAR_CURRENT":
            // TODO optimize this, this is O(N) while it can be O(1)
            draft.map(nestedArray => nestedArray.map(node => node.current = false))
            break

        case "MARK_CURRENT":
            draft[action.payload.coordinates[0]][action.payload.coordinates[1]].current = true
            break

        case "MARK_VISITED":
            draft[action.payload.coordinates[0]][action.payload.coordinates[1]]['visited'] = true
            break

        case "MARK_PATH":
            draft[action.payload.coordinates[0]][action.payload.coordinates[1]]['pathways'][action.payload.path] = true
            break

        case "MARK_START_AND_END_NODES":
            draft[action.payload.start[0]][action.payload.start[1]]['start'] = true
            draft[action.payload.end[0]][action.payload.end[1]]['end'] = true
            break

        case "MAZE_INIT":
            const newMazeNodes = []
            for (let i = 0; i < action.payload.rows; i++) {
                newMazeNodes[i] = []
                for (let j = 0; j < action.payload.columns; j++) {
                    newMazeNodes[i][j] = {
                        visited: false, current: false, pathways: {N: false, S: false, W: false, E: false}
                    };
                }
            }
            return newMazeNodes

        case "MAZE_RESET":
            draft.forEach(row => {
                row.forEach(node => {
                    node.visited = false
                    node.current = false
                    node.pathways = {N: false, S: false, W: false, E: false}
                })
            });
            break

        default:
            throw new Error()

    }
}

export default mazeReducer
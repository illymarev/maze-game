const mazeNodesReducer = (draft, action) => {
    switch (action.type) {
        case "CLEAR_CURRENT":
            // TODO optimize this, this is O(N) while it can be O(1)
            draft.map(nestedArray => nestedArray.map(node => node.current = false))
            break

        case "MARK_CURRENT":
            draft[action.data.coordinates[0]][action.data.coordinates[1]].current = true
            break

        case "MARK_VISITED":
            draft[action.data.coordinates[0]][action.data.coordinates[1]]['visited'] = true
            break

        case "MARK_PATH":
            // const updatedState = [...state]
            draft[action.data.coordinates[0]][action.data.coordinates[1]]['pathways'][action.data.path] = true
            break

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

export default mazeNodesReducer
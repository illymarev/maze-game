import React from 'react';
import recursiveBacktracking from "./maze_generation/recursiveBacktracker";

const MAZE_GENERATION_FUNCTIONS = {
    'recursiveBacktracking': recursiveBacktracking
}

const nodeReducer = (state, action) => {
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
        default:
            throw new Error()

    }
}

const [height, width] = [5, 5]
const initialState = []
for (let i = 0; i < height; i++) {
    initialState[i] = []
    for (let j = 0; j < width; j++) {
        initialState[i][j] = {
            visited: false,
            current: false,
            pathways: {N: false, S: false, W: false, E: false}
        };
    }
}

const Maze = ({mazeGenerationFunction}) => {
    // TODO document properly based on beta docs
    const [currentMazeGenerationFunction, setCurrentMazeGenerationFunction] = React.useState('')

    const [nodesMatrix, dispatchNodesMatrix] = React.useReducer(nodeReducer, initialState);

    const nodesMatrixRef = React.useRef([])
    nodesMatrixRef.current = nodesMatrix

    const clearCurrent = () => {
        const action = {'type': 'CLEAR_CURRENT'}
        dispatchNodesMatrix(action)
    }

    const markCurrent = nodeCoordinates => {
        const action = {'type': 'MARK_CURRENT', data: {coordinates: nodeCoordinates}}
        dispatchNodesMatrix(action)
    }

    const markVisited = nodeCoordinates => {
        const action = {type: 'MARK_VISITED', data: {coordinates: nodeCoordinates}}
        dispatchNodesMatrix(action)
    }

    const markPath = (nodeCoordinates, path) => {
        const action = {type: 'MARK_PATH', data: {coordinates: nodeCoordinates, path: path}}
        dispatchNodesMatrix(action)
    }

    const generationActions = {
        clearCurrent: clearCurrent,
        markCurrent: markCurrent,
        markVisited: markVisited,
        markPath: markPath
    }


    if (currentMazeGenerationFunction !== mazeGenerationFunction) {
        setCurrentMazeGenerationFunction(mazeGenerationFunction)
        MAZE_GENERATION_FUNCTIONS[mazeGenerationFunction](nodesMatrixRef, generationActions)
    }

    return (
        <div className="maze">
            {nodesMatrix.map((row, yCoordinate) => {
                return row.map((nodeData, xCoordinate) => <Node data={nodeData} key={`${yCoordinate}-${xCoordinate}`}/>
                )
            })}
        </div>
    );
}

const Node = ({data}) => {
    const nodeStyle = {}
    if (data.current) {
        nodeStyle['background'] = "blue"
    }
    if (data.visited) {
        nodeStyle['color'] = 'red'
    }

    const validPathways = []
    for (const [path, available] of Object.entries(data.pathways)) {
        if (available) validPathways.push(path)
    }
    const pathwayText = validPathways.join()
    return <span className="matrixNode" style={nodeStyle}>{pathwayText ? pathwayText : 0}</span>
}


export default Maze
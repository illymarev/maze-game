import {useState, useRef, useReducer, useEffect} from 'react'
import mazeNodesReducer from "./reducers/mazeNodesReducer";
import generationFunctionsList from "./generation/generationFunctionsList";

const Maze = () => {
    const [dimensions, setDimensions] = useState({rows: '5', columns: '5'})
    const [mazeGenerationFunction, setMazeGenerationFunction] = useState('')
    const [mazeNodes, dispatchMazeNodes] = useReducer(mazeNodesReducer, []);

    // Read-only replica of the mazeNodes state that will be used in maze generation functions in
    // order to access the latest state
    const mazeNodesRef = useRef([])
    mazeNodesRef.current = mazeNodes


    useEffect(() => {
        initializeEmptyMaze()
    }, [])

    const handleGenerationFunctionChange = event => {
        event.preventDefault()
        setMazeGenerationFunction(event.target.value)
    }

    const handleDimensionsChange = event => {
        // TODO update CSS
        event.preventDefault()
        initializeEmptyMaze()
    }

    const initializeEmptyMaze = () => {
        const newMaze = []
        for (let i = 0; i < dimensions['rows']; i++) {
            newMaze[i] = []
            for (let j = 0; j < dimensions['columns']; j++) {
                newMaze[i][j] = {
                    visited: false,
                    current: false,
                    pathways: {N: false, S: false, W: false, E: false}
                };
            }
        }
        dispatchMazeNodes({type: "MAZE_INIT", payload: {maze: newMaze}})
    }


    // ACTIONS FOR GENERATION
    const clearCurrent = () => {
        const action = {'type': 'CLEAR_CURRENT'}
        dispatchMazeNodes(action)
    }

    const markCurrent = nodeCoordinates => {
        const action = {'type': 'MARK_CURRENT', data: {coordinates: nodeCoordinates}}
        dispatchMazeNodes(action)
    }

    const markVisited = nodeCoordinates => {
        const action = {type: 'MARK_VISITED', data: {coordinates: nodeCoordinates}}
        dispatchMazeNodes(action)
    }

    const markPath = (nodeCoordinates, path) => {
        const action = {type: 'MARK_PATH', data: {coordinates: nodeCoordinates, path: path}}
        dispatchMazeNodes(action)
    }

    const generationActions = {
        clearCurrent: clearCurrent,
        markCurrent: markCurrent,
        markVisited: markVisited,
        markPath: markPath
    }

    const useMazeGenerationFunction = (e) => {
        e.preventDefault()
        const resetAction = {type: 'MAZE_RESET'}
        dispatchMazeNodes(resetAction)

        const generationFunction = generationFunctionsList[mazeGenerationFunction]['func']
        generationFunction(mazeNodesRef, generationActions)
    }

    // ACTIONS FOR SOLVING


    // if (currentMazeGenerationFunction !== mazeGenerationFunction) {
    //     setCurrentMazeGenerationFunction(mazeGenerationFunction)
    //     MAZE_GENERATION_FUNCTIONS[mazeGenerationFunction](nodesMatrixRef, generationActions)
    // }

    return (
        <>
            <form onSubmit={handleDimensionsChange}>
                {/*TODO input validation*/}
                <input type={'number'} name={'rows'} value={dimensions['rows']}
                       onChange={e => setDimensions({...dimensions, rows: e.target.value})}
                />
                <input type={'number'} name={'columns'} value={dimensions['columns']}
                       onChange={e => setDimensions({...dimensions, columns: e.target.value})}
                />
                <button type={"submit"}>Update maze dimensions</button>
            </form>

            <form onSubmit={useMazeGenerationFunction}>
                <select value={mazeGenerationFunction} onChange={handleGenerationFunctionChange}>
                    {/*TODO input validation*/}
                    <option value={''}>Select a maze</option>
                    {Object.entries(generationFunctionsList).map(([key, {name}]) => {
                        return <option key={key} value={key}>{name}</option>
                    })}
                </select>
                <button type={"submit"}>Generate maze</button>
            </form>

            <div className="maze">
                {mazeNodes.map((row, yCoordinate) => {
                    return row.map((nodeData, xCoordinate) => <Node data={nodeData}
                                                                    key={`${yCoordinate}-${xCoordinate}`}/>
                    )
                })}
            </div>
        </>
    )
        ;
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
    const pathwayClasses = validPathways.join(' ')
    return <span className={`matrixNode ${pathwayClasses}`} style={nodeStyle}>{pathwayText ? pathwayText : 0}</span>
}


export default Maze
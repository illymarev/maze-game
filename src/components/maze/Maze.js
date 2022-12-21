import {useState, useRef, useEffect} from 'react'
import {useImmerReducer} from "use-immer";
import styled from "styled-components";
import mazeNodesReducer from "./reducers/mazeNodesReducer";
import generationFunctionsList from "./generation/generationFunctionsList";

const StyledMaze = styled.div`
  border: 1px solid black;
  margin-top: 10px;
  display: inline-grid;
  grid-template: repeat(${props => props.rows}, 50px) / repeat(${props => props.columns}, 50px);
  text-align: center;
`


// TODO start and end nodes (simple one, just 0,0 and -1, -1)
// TODO input validation, refactor input into separate components in separate files
// TODO refactor node into a separate file
// TODO after: user's ability to solve the maze
// TODO after: refactor (mazeNodesReducer to use immer, forms to separate components, reducers, etc.)
// TODO path finding algorithms
// TODO advanced start and end nodes (longest path)
const Maze = () => {
    const [dimensions, setDimensions] = useState({rows: '5', columns: '5'})
    const [dimensionsInput, setDimensionsInput] = useState(dimensions)
    const [mazeGenerationFunction, setMazeGenerationFunction] = useState('')
    const [mazeNodes, dispatchMazeNodes] = useImmerReducer(mazeNodesReducer, []);

    // Read-only replica of the mazeNodes state that will be used in maze generation functions in
    // order to access the latest state
    const mazeNodesRef = useRef([])
    mazeNodesRef.current = mazeNodes

    const initializeEmptyMaze = () => dispatchMazeNodes({type: "MAZE_INIT", payload: dimensions})


    useEffect(() => {
        initializeEmptyMaze()
    }, [dimensions])


    const handleGenerationFunctionChange = event => {
        event.preventDefault()
        setMazeGenerationFunction(event.target.value)
    }

    const handleDimensionsChange = event => {
        event.preventDefault()
        setDimensions(dimensionsInput)
    }


    // ACTIONS FOR GENERATION
    const clearCurrent = () => {
        const action = {'type': 'CLEAR_CURRENT'}
        dispatchMazeNodes(action)
    }

    const markCurrent = nodeCoordinates => {
        clearCurrent()
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

    return (
        <>
            {/*TODO refactor to separate component*/}
            <form onSubmit={handleDimensionsChange}>
                {/*TODO input validation*/}
                <input type={'number'} name={'rows'} value={dimensionsInput['rows']}
                       onChange={e => setDimensionsInput({...dimensionsInput, rows: e.target.value})}
                />
                <input type={'number'} name={'columns'} value={dimensionsInput['columns']}
                       onChange={e => setDimensionsInput({...dimensionsInput, columns: e.target.value})}
                />
                <button type={"submit"}>Update maze dimensions</button>
            </form>

            {/*TODO refactor to separate component*/}
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

            <StyledMaze rows={dimensions.rows} columns={dimensions.columns}>
                {mazeNodes.map((row, yCoordinate) => {
                    return row.map((nodeData, xCoordinate) => <Node data={nodeData}
                                                                    key={`${yCoordinate}-${xCoordinate}`}/>
                    )
                })}
            </StyledMaze>
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
import {useState, useRef, useEffect} from 'react'
import {useImmerReducer} from "use-immer";
import styled from "styled-components";
import mazeReducer from "./reducers/mazeReducer";
import generationFunctionsList from "./generation/generationFunctionsList";
import Node from "./Node";

const StyledMaze = styled.div`
  border: 1px solid black;
  margin-top: 10px;
  display: inline-grid;
  grid-template: repeat(${props => props.rows}, 50px) / repeat(${props => props.columns}, 50px);
  text-align: center;
`


// TODO refactor input into separate features in separate files
// TODO add input validation
// TODO full cleanup, fixes and refactoring! This is a mess
// TODO check all todos
// TODO add the generation algorithm wrapper. It should run certain logic before and after the algorithm
// Before the maze generation - reset the maze. Mark "generation in progress" flag
// After finishing the algorithm, it should mark the start and end nodes, as well as clear the current node.
// Mark "generation in progress" flag as false
// Decide if I want to do that cool visualization that demonstrates without walls and this stuff, only the real path
// If yes - do it here!
// TODO create another generation algorithm
// TODO game component with the state
// TODO add the game logic
// TODO after: user's ability to solve the maze
// TODO after: refactor (mazeReducer to use immer, forms to separate features, reducers, etc.)
// TODO path finding algorithms
// TODO advanced start and end nodes (longest path)
const Maze = () => {
    // I don't think that I need to store both states. I can store only the dimensionsInput,
    // and use the actual matrix to calculate the dimensions that will be passed to props. Double-check later
    const [dimensions, setDimensions] = useState({rows: '5', columns: '5'})
    const [dimensionsInput, setDimensionsInput] = useState(dimensions)
    const [mazeGenerationFunction, setMazeGenerationFunction] = useState('')
    const [maze, dispatchMaze] = useImmerReducer(mazeReducer, []);

    // Read-only replica of the mazeNodes state that will be used in maze generation functions in
    // order to access the latest state
    const mazeNodesRef = useRef([])
    mazeNodesRef.current = maze

    const initializeEmptyMaze = () => dispatchMaze({type: "MAZE_INIT", payload: dimensions})


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
        dispatchMaze(action)
    }

    const markCurrent = nodeCoordinates => {
        clearCurrent()
        const action = {'type': 'MARK_CURRENT', payload: {coordinates: nodeCoordinates}}
        dispatchMaze(action)
    }

    const markVisited = nodeCoordinates => {
        const action = {type: 'MARK_VISITED', payload: {coordinates: nodeCoordinates}}
        dispatchMaze(action)
    }

    const markPath = (nodeCoordinates, path) => {
        const action = {type: 'MARK_PATH', payload: {coordinates: nodeCoordinates, path: path}}
        dispatchMaze(action)
    }

    const generationActions = {
        clearCurrent: clearCurrent,
        markCurrent: markCurrent,
        markVisited: markVisited,
        markPath: markPath
    }

    // TODO handle the case that the user can click generate multiple times
    const useMazeGenerationFunction = (e) => {
        e.preventDefault()
        const resetAction = {type: 'MAZE_RESET'}
        dispatchMaze(resetAction)

        const generationFunction = generationFunctionsList[mazeGenerationFunction]['func']
        generationFunction(mazeNodesRef, generationActions)
        // TODO fix it. Generate only on finish
        markStartAndEndNodes()
    }

    const markStartAndEndNodes = () => {
        const action = {
            type: 'MARK_START_AND_END_NODES',
            payload: {start: [0, 0], end: [dimensions.rows - 1, dimensions.columns - 1]}
        }
        dispatchMaze(action)
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
                {maze.map((row, yCoordinate) => {
                    return row.map((nodeData, xCoordinate) => <Node data={nodeData}
                                                                    key={`${yCoordinate}-${xCoordinate}`}/>
                    )
                })}
            </StyledMaze>
        </>
    );
};


export default Maze
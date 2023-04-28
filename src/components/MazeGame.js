import ConfigurationPanel from "./ConfigurationPanel";
import Maze from "./Maze";
import {useCallback, useRef} from "react";

import {Stack} from "@mui/material";
import {GameState} from "./GameState";
import MazeLegend from "./MazeLegend";
import {checkIfValidStep} from "../algorithms/helpers";
import {observer} from "mobx-react";

const MazeGame = observer(({gameStore}) => {
    const maze = gameStore.maze
    const config = gameStore.config

    // TODO read about the UI state and decide whether this should live in the UI state or in the gameStore
    // TODO user's input next
    const mouseIsDown = useRef(false)
    const stopVisualization = useRef(false)

    const setStopVisualization = useCallback(value => stopVisualization.current = value, [])
    const setMouseIsDown = value => mouseIsDown.current = value


    // Use callback should be used in all the following functions because they are either props passed to
    // the configuration panel or functions that props depend on. Rendering configuration panel after every maze
    // node update is very heavy on performance and should be avoided
    const markNodeVisited = useCallback((row, column, force = false) => {
        if (
            (force || mouseIsDown.current) &&
            checkIfValidStep(maze.nodes, row, column) &&
            [2, 3].includes(this.config.gameState.id)
        ) {
            this.maze.applySingleAction({type: 'markVisited', payload: {row: row, column: column}})
            if (row === 0 && column === 0) {
                this.config.setGameState(3)
            } else if (row === maze.rows - 1 && column === maze.columns - 1) {
                this.config.setGameState(5)
            }
        }
    }, [])

    return (
        <div onMouseDown={() => setMouseIsDown(true)}
             onMouseUp={() => setMouseIsDown(false)}>
            <ConfigurationPanel
                gameStore={gameStore}
                config={config}
                setStopVisualization={setStopVisualization}
            />
            <Stack className="maze" alignItems='center' spacing={1} marginY={'1rem'}>
                <GameState config={config}/>
                <MazeLegend/>
                <Maze
                    maze={maze}
                    config={config}
                    markNodeVisited={markNodeVisited}
                />
            </Stack>
        </div>
    )
})

export default MazeGame

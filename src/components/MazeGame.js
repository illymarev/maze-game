import ConfigurationPanel from "./ConfigurationPanel";
import Maze from "./Maze";
import {Stack} from "@mui/material";
import {GameState} from "./GameState";
import MazeLegend from "./MazeLegend";
import {observer} from "mobx-react";


const MazeGame = observer(({gameStore}) => {
    const maze = gameStore.maze
    const config = gameStore.config
    const uiState = gameStore.uiState

    return (
        <div onMouseDown={() => uiState.setIsMouseDown(true)}
             onMouseUp={() => uiState.setIsMouseDown(false)}>
            <ConfigurationPanel
                gameStore={gameStore}
                config={config}
            />
            <Stack className="maze" alignItems='center' spacing={1} marginY={'1rem'}>
                <GameState config={config}/>
                <MazeLegend/>
                <Maze
                    maze={maze}
                    config={config}
                />
            </Stack>
        </div>
    )
})

export default MazeGame

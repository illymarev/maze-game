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
            {/*<div>*/}
            {/*    <button onClick={() => {*/}
            {/*        config.changeDimensions(8, 20)*/}
            {/*    }}>Small*/}
            {/*    </button>*/}
            {/*    <button onClick={() => {*/}
            {/*        config.changeDimensions(14, 35)*/}
            {/*    }}>Medium*/}
            {/*    </button>*/}
            {/*    <button onClick={() => {*/}
            {/*        config.changeDimensions(24, 60)*/}
            {/*    }}>Large*/}
            {/*    </button>*/}
            {/*</div>*/}
            <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
                <ConfigurationPanel gameStore={gameStore} config={config}/>
                <GameState config={config}/>
                <MazeLegend/>
            </Stack>

            <Stack marginBottom={'10px'} alignItems={'center'} justifyContent={'center'}>
                <Maze
                    maze={maze}
                    config={config}
                />
            </Stack>
        </div>
    )
})

export default MazeGame

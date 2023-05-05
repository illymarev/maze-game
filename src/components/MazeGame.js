import ConfigurationPanel from "./ConfigurationPanel";
import Maze from "./Maze";
import {Stack} from "@mui/material";
import {GameState} from "./GameState";
import MazeLegend from "./MazeLegend";
import {observer} from "mobx-react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import * as React from "react";

const drawerWidth = '20%'

// TODO 2) Add 2 farthest points as a default start/end
// TODO 3) Allow drag&drop of start/end points
const MazeGame = observer(({gameStore}) => {
    const maze = gameStore.maze
    const config = gameStore.config
    const uiState = gameStore.uiState

    return (
        <Box sx={{display: 'flex'}}
             onMouseDown={() => uiState.setIsMouseDown(true)}
             onMouseUp={() => uiState.setIsMouseDown(false)}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <ConfigurationPanel gameStore={gameStore} config={config}/>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Stack justifyContent={'center'} alignItems={'center'}>
                    <GameState config={config}/>
                    <MazeLegend/>
                    <Maze maze={maze} config={config}/>
                </Stack>

            </Box>
        </Box>
    )
})

export default MazeGame

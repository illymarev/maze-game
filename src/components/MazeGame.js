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


// TODO 3) Allow drag&drop of start/end points
const MazeGame = observer(({gameStore}) => {
    const maze = gameStore.maze
    const config = gameStore.config
    const state = gameStore.state

    return (
        <Box sx={{display: 'flex'}}
             onMouseDown={() => state.setIsMouseDown(true)}
             onMouseUp={() => state.setIsMouseDown(false)}>
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
                <ConfigurationPanel gameStore={gameStore} config={config} state={state}/>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
                height={'100vh'}
            >
                <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
                    <GameState state={state}/>
                    <MazeLegend/>
                    <Maze maze={maze} config={config}/>
                </Stack>

            </Box>
        </Box>
    )
})

export default MazeGame

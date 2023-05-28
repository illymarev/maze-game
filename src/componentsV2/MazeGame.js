import {observer} from "mobx-react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ConfigurationPanel from "./ConfigurationPanel";
import MazeLegend from "./MazeLegend";
import {Stack} from "@mui/material";
import GameState from "./GameState";
import Maze from "./Maze";

import * as React from "react";

const drawerWidth = '20%'

const MazeGame = observer(({rootStore}) => {
    const state = rootStore.stateStore

    return (
        <Box sx={{display: 'flex'}}
             onMouseDown={() => state.setMouseDown(true)}
             onMouseUp={() => state.setMouseDown(false)}>
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
                <ConfigurationPanel rootStore={rootStore}/>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
                height={'100vh'}
            >
                <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
                    <GameState state={state}/>
                    <MazeLegend/>
                    <Maze rootStore={rootStore}/>
                </Stack>

            </Box>
        </Box>
    )
})

export default MazeGame
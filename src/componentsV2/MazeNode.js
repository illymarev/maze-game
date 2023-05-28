import {Grid} from "@mui/material";
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import {gameInProgress, finishedSolving} from "../stores/options/gameStates";
import {observer} from "mobx-react";
import {noMovingItem, startFlag, finishFlag} from "../storesV2/options/movingItemOptions";

// TODO
const MazeNode = observer(({node, rootStore}) => {
    const state = rootStore.stateStore

    const registerUsersInput = () => {
        console.log('hey there')
        // node.markVisited()
        // if (node.isStart) {
        //     state.setGameState(gameInProgress)
        // } else if (node.isFinish) {
        //     gameStore.showCorrectPath()
        //     state.setGameState(finishedSolving)
        // }
    }

    let onMouseDownFunc, onMouseEnterFunc, onMouseUpFunc
    if (state.usersSolvingInputAllowed) {

        onMouseDownFunc = e => {
            console.log('hey')
            // e.preventDefault()
            // if (node.isStart || node.hasVisitedNeighbour) {
            //     registerUsersInput()
            // }
        }
        onMouseEnterFunc = () => {
            console.log('hey')
            // if (state.isMouseDown && (node.isStart || node.hasVisitedNeighbour)) {
            //     registerUsersInput()
            // }
        }
        onMouseUpFunc = () => {
        }

    } else if (state.movingStartAndFinishedAllowed) {
        onMouseDownFunc = (e) => {
            e.preventDefault();
            if (node.isStart || node.isFinish) {
                const movingItem = node.isStart ? startFlag : finishFlag
                state.setMovingItem(movingItem)
            }
        }
        onMouseEnterFunc = () => {
        }
        onMouseUpFunc = () => {
            if (state.movableItem) {
                state.movingItem === startFlag ? node.setStart(true) : node.setFinish(true)
                state.setMovingItem(noMovingItem)
            }
        }

    } else {
        onMouseDownFunc = (e) => {
            e.preventDefault()
        }
        onMouseEnterFunc = () => {
        }
        onMouseUpFunc = () => {
        }
    }


    const generationVisualizationStyle = {
        backgroundColor: node.visited ? 'rgba(29,227,124,0.35)' : null
    }
    if (node.current) {
        generationVisualizationStyle.backgroundColor = '#3b8ef1'
    }
    if (node.route) {
        generationVisualizationStyle.backgroundColor = 'rgba(247,255,22,0.75)'
    }

    let nodeText
    if (node.start) {
        nodeText = <OutlinedFlagRoundedIcon fontSize={'small'}/>
    } else if (node.finish) {
        nodeText = <SportsScoreOutlinedIcon fontSize={'small'}/>
    } else {
        nodeText = ''
    }

    return (
        <Grid item={true} xs={1}
              onMouseDown={e => {
                  onMouseDownFunc(e)
              }}
              onMouseEnter={() => {
                  onMouseEnterFunc()
              }}
              onMouseUp={() => {
                  onMouseUpFunc()
              }}
              sx={{
                  aspectRatio: '1/1', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  borderTop: node.edges.north ? null : '2px solid #ccc',
                  borderBottom: node.edges.south ? null : '2px solid #ccc',
                  borderLeft: node.edges.west ? null : '2px solid #ccc',
                  borderRight: node.edges.east ? null : '2px solid #ccc',
                  ...generationVisualizationStyle
              }}>
            {nodeText}
        </Grid>
    );
})


export default MazeNode

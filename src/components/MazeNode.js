import {Grid} from "@mui/material";
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import {gameInProgress, finishedSolving} from "../stores/options/gameStates";
import {observer} from "mobx-react";

// TODO route bug when nodes are close
// TODO make the drag and drop more visual
const MazeNode = observer(({node, config}) => {

    const state = config.gameStore.state

    const registerUsersInput = () => {
        node.markVisited()
        if (node.isStart) {
            state.setGameState(gameInProgress)
        } else if (node.isFinish) {
            state.setGameState(finishedSolving)
        }
    }

    let onMouseDownFunc, onMouseEnterFunc, onMouseUpFunc
    if (state.isUsersSolvingInputAllowed) {

        onMouseDownFunc = e => {
            e.preventDefault()
            if (node.isStart || node.hasVisitedNeighbour) {
                registerUsersInput()
            }
        }
        onMouseEnterFunc = () => {
            if (state.isMouseDown && (node.isStart || node.hasVisitedNeighbour)) {
                registerUsersInput()
            }
        }
        onMouseUpFunc = () => {
        }

    } else if (state.isMovingStartAndFinishedAllowed) {
        onMouseDownFunc = (e) => {
            e.preventDefault();
            if (node.isStart || node.isFinish) {
                const movableItem = node.isStart ? 'start' : 'finish'
                state.setMovableItem(movableItem)
            }
        }
        onMouseEnterFunc = () => {
        }
        onMouseUpFunc = () => {
            if (state.movableItem) {
                state.movableItem === 'start' ? node.setIsStart(true) : node.setIsFinish(true)
                state.setMovableItem(null)
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
    if (node.isRoute) {
        generationVisualizationStyle.backgroundColor = 'rgba(247,255,22,0.75)'
    }

    let nodeText
    if (node.isStart) {
        nodeText = <OutlinedFlagRoundedIcon fontSize={'small'}/>
    } else if (node.isFinish) {
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
                  borderTop: node.availablePathways.north ? null : '2px solid #ccc',
                  borderBottom: node.availablePathways.south ? null : '2px solid #ccc',
                  borderLeft: node.availablePathways.west ? null : '2px solid #ccc',
                  borderRight: node.availablePathways.east ? null : '2px solid #ccc',
                  ...generationVisualizationStyle
              }}>
            {nodeText}
        </Grid>
    );
})


export default MazeNode

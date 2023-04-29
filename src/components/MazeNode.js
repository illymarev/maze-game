import {Grid} from "@mui/material";
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import {observer} from "mobx-react";

const MazeNode = observer(({node, config}) => {

    const uiState = config.gameStore.uiState

    const isStart = node.row === 0 && node.column === 0
    const isFinish = node.row === node.maze.config.rows - 1 && node.column === node.maze.config.columns - 1

    const generationVisualizationStyle = {
        backgroundColor: node.visited ? 'rgba(29,227,124,0.35)' : null
    }
    if (node.current) {
        generationVisualizationStyle.backgroundColor = '#3b8ef1'
    }
    if (node.isRoute) {
        generationVisualizationStyle.backgroundColor = 'rgba(247,255,22,0.75)'
    }

    let nodeText = ''
    if (config.gameState.id === 1) {
        nodeText = ''
    } else if (isStart) {
        nodeText = <OutlinedFlagRoundedIcon fontSize={'small'}/>
    } else if (isFinish) {
        nodeText = <SportsScoreOutlinedIcon fontSize={'small'}/>
    } else {
        nodeText = ''
    }

    return (
        <Grid item={true} xs={1}
              onMouseDown={(e) => {
                  e.preventDefault()

                  if ((isStart || node.hasVisitedNeighbour) && config.isUsersSolvingInputAllowed) {
                      node.markVisited()
                  }
              }}
              onMouseEnter={() => {
                  if (uiState.isMouseDown && node.hasVisitedNeighbour && config.isUsersSolvingInputAllowed) {
                      node.markVisited()
                  }
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

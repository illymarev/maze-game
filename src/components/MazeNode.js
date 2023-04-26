import {Grid} from "@mui/material";
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import {observer} from "mobx-react";

const MazeNode = observer(({
                               handleMouseEnter,
                               gameStateId,
                               node: {nodesStore, row, column, current, visited, availablePathways, isRoute}
                           }) => {

    const isStart = row === 0 && column === 0
    const isFinish = row === nodesStore.rows - 1 && column === nodesStore.columns - 1

    const generationVisualizationStyle = {
        backgroundColor: visited ? 'rgba(29,227,124,0.35)' : null
    }
    if (current) {
        generationVisualizationStyle.backgroundColor = '#3b8ef1'
    }
    if (isRoute) {
        generationVisualizationStyle.backgroundColor = 'rgba(247,255,22,0.75)'
    }

    let nodeText = ''
    if (gameStateId === 1) {
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
                  handleMouseEnter(row, column, true)
              }}
              onMouseEnter={() => handleMouseEnter(row, column)}
              sx={{
                  aspectRatio: '1/1', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  borderTop: availablePathways.north ? null : '2px solid #ccc',
                  borderBottom: availablePathways.south ? null : '2px solid #ccc',
                  borderLeft: availablePathways.west ? null : '2px solid #ccc',
                  borderRight: availablePathways.east ? null : '2px solid #ccc',
                  ...generationVisualizationStyle
              }}>
            {nodeText}
        </Grid>
    );
})


export default MazeNode

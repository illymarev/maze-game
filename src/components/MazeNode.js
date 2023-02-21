import {Box, Grid} from "@mui/material";
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import {memo} from "react";

const MazeNode = memo(({
                           handleMouseEnter,
                           gameStateId,
                           rowNumber,
                           columnNumber,
                           rowsCount,
                           columnsCount,
                           node: {current, visited, availablePathways}
                       }) => {

    const isStart = rowNumber === 0 && columnNumber === 0
    const isFinish = rowNumber === rowsCount - 1 && columnNumber === columnsCount - 1

    const generationVisualizationStyle = {
        backgroundColor: visited ? '#3b8ef1' : null
    }
    if (current) {
        generationVisualizationStyle.backgroundColor = '#002c7c'
    }

    // TODO inprove styling
    const selectedStyle = gameStateId === 1 ? generationVisualizationStyle : generationVisualizationStyle

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
        <Grid item={true} xs={1} onMouseDown={() => handleMouseEnter({row: rowNumber, column: columnNumber}, true)}
              onMouseEnter={() => handleMouseEnter({row: rowNumber, column: columnNumber})}>
            <Box sx={{
                aspectRatio: '1/1', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                borderTop: availablePathways.north ? null : '2px solid #ccc',
                borderBottom: availablePathways.south ? null : '2px solid #ccc',
                borderLeft: availablePathways.west ? null : '2px solid #ccc',
                borderRight: availablePathways.east ? null : '2px solid #ccc',
                ...selectedStyle
            }}>
                {nodeText}
            </Box>
        </Grid>
    );
})


export default MazeNode

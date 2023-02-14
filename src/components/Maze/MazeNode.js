import {Box, Grid} from "@mui/material";
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';

const MazeNode = ({
                      rowNumber,
                      columnNumber,
                      rowsCount,
                      columnsCount,
                      node: {visited, availablePathways}
                  }) => {
    const isStart = rowNumber === 0 && columnNumber === 0
    const isFinish = rowNumber === rowsCount - 1 && columnNumber === columnsCount - 1

    return (
        <Grid item={true} xs={1}>
            <Box sx={{
                aspectRatio: '1/1', border: '1px solid #ccc', display: 'flex',
                alignItems: 'center', justifyContent: 'center'
            }}>
                {isStart ? <OutlinedFlagRoundedIcon fontSize={'small'}/> : null}
                {isFinish ? <SportsScoreOutlinedIcon fontSize={'small'}/> : null}
            </Box>
        </Grid>
    );
}


export default MazeNode

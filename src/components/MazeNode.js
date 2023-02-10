import {Box, Grid} from "@mui/material";

// <OutlinedFlagIcon fontSize={'small'}/>
const MazeNode = () => (
    <Grid item={true} xs={1}><Box sx={{
        aspectRatio: '1/1',
        border: '1px solid #ccc',
    }}></Box></Grid>
)

export default MazeNode
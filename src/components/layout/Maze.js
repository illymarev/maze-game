import {Grid, Stack, Box, Card} from "@mui/material";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';

const Maze = () => {
    const maze_nodes = []
    for (let i = 0; i < 169; i++) {
        maze_nodes.push(
            <Grid item={true} xs={1}><Box sx={{
                aspectRatio: '1/0.8',
                border: '1px solid #ccc',
            }}></Box></Grid>
        )
        // maze_nodes[0] = <Grid item={true} xs={1}><Box sx={{
        //     aspectRatio: '1/0.8',
        //     border: '1px solid #ccc',
        // }}><OutlinedFlagIcon/></Box></Grid>
    }
    return (
        <Stack className="maze" alignItems='center' marginY={'2rem'}>
            <Stack direction='row' spacing={5}>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
                    <Card variant="outlined"
                          sx={{
                              'background': 'red',
                              'aspectRatio': '1/1',
                              'width': '15px'
                          }}></Card>
                    <span>Visited</span>
                </Stack>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
                    <Card variant="outlined"
                          sx={{
                              'background': '#ccc',
                              'aspectRatio': '1/1',
                              'width': '15px'
                          }}></Card>
                    <span>Wall</span>
                </Stack>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
                    <OutlinedFlagIcon/><span>Start</span>
                </Stack>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
                    <SportsScoreIcon/><span>Finish</span>
                </Stack>
            </Stack>
            <Grid columns={13} container width={'35%'}>
                {maze_nodes}
            </Grid>
        </Stack>
    )
}

export default Maze;

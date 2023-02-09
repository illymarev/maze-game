import {Grid, Stack, Box} from "@mui/material";

const Maze = () => {
    const maze_nodes = []
    for (let i = 0; i < 100; i++) {
        maze_nodes.push(
            <Grid xs={1}><Box sx={{
                height: 25,
                border: '1px solid #ccc',
            }}>1</Box></Grid>
        )
    }
    return (
        <Stack className="maze" alignItems='center' mt={'2rem'}>
            <Stack direction='row' spacing={5}>
                <span>Visited</span>
                <span>Wall</span>
                <span>Start</span>
                <span>Finish</span>
            </Stack>
            <Grid columns={10} container mt={'0.5rem'} sx={{'padding': '0 5rem 0 5rem'}}>
                {maze_nodes}
            </Grid>
        </Stack>
    )
}

export default Maze;

import {Grid, Stack, Box} from "@mui/material";

const Maze = () => {
    const maze_nodes = []
    for (let i = 0; i < 169; i++) {
        maze_nodes.push(
            <Grid item={true} xs={1}><Box sx={{
                aspectRatio: '1/0.8',
                border: '1px solid #ccc',
            }}></Box></Grid>
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
            <Grid columns={13} container width={'35%'}>
                {maze_nodes}
            </Grid>
        </Stack>
    )
}

export default Maze;

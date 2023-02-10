import {Grid, Stack, Typography} from "@mui/material";
import MazeNode from "../MazeNode";
import MazeLegend from "../MazeLegend";

const Maze = () => {
    const maze_nodes = []
    for (let i = 0; i < 336; i++) {
        maze_nodes.push(<MazeNode/>)
    }
    return (
        <Stack className="maze" alignItems='center' spacing={1} marginY={'1rem'}>
            <Typography variant="h4" component="h2">
                Game In Progress
            </Typography>
            <MazeLegend/>
            <Grid columns={28} container width={{xs: '80%', md: '65%', lg: '60%'}}>
                {maze_nodes}
            </Grid>
        </Stack>
    )
}

export default Maze;

import {Grid, Stack, Typography} from "@mui/material";
import MazeNode from "../MazeNode";
import MazeLegend from "../MazeLegend";

const COLUMNS_NUMBER = 28;
const ROWS_NUMBER = 12

const Maze = () => {
    const maze_nodes = []
    for (let i = 0; i < COLUMNS_NUMBER * ROWS_NUMBER; i++) {
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

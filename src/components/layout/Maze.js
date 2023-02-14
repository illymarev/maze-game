import {Grid, Stack, Typography} from "@mui/material";
import MazeNode from "../MazeNode";
import MazeLegend from "../MazeLegend";

const COLUMNS_NUMBER = 30;
const ROWS_NUMBER = 12;

const Maze = () => {
    const maze_nodes = []
    for (let i = 0; i < COLUMNS_NUMBER * ROWS_NUMBER; i++) {
        maze_nodes.push(<MazeNode/>)
    }
    return (
        <Stack className="maze" alignItems='center' spacing={1} marginY={'1rem'}>
            <Stack marginBottom={'0.5rem'}>
                <Typography variant="h4" component="h2">
                    Ready To Start
                </Typography>
                <Typography variant='body2' component='h4' fontWeight={300}>
                    click the "solve" button or start solving yourself!
                </Typography>
            </Stack>

            <MazeLegend/>
            <Grid columns={COLUMNS_NUMBER} container width={{xs: '80%', md: '65%', lg: '60%'}}>
                {maze_nodes}
            </Grid>
        </Stack>
    )
}

export default Maze;

import {Grid, Stack, Typography} from "@mui/material";
import MazeNode from "./MazeNode";
import MazeLegend from "./MazeLegend";


const Maze = ({mazeNodes}) => {
    const [rowsCount, columnsCount] = [mazeNodes.length, mazeNodes[0].length]

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
            <Grid columns={columnsCount} container width={{xs: '80%', md: '65%', lg: '60%'}}>
                {mazeNodes.map(
                    (row, rowNumber) => row.map(
                        (node, columnNumber) =>
                            <MazeNode
                                key={`${rowNumber}-${columnNumber}`}
                                rowNumber={rowNumber}
                                columnNumber={columnNumber}
                                node={node}
                                rowsCount={rowsCount}
                                columnsCount={columnsCount}
                            />
                    )
                )}
            </Grid>
        </Stack>
    )
}

export default Maze;

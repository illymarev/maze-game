import {Grid, Stack, Typography} from "@mui/material";
import MazeNode from "./MazeNode";
import MazeLegend from "./MazeLegend";


const Maze = ({mazeNodes, gameState: {id, title, description}}) => {
    const [rowsCount, columnsCount] = [mazeNodes.length, mazeNodes[0].length]

    return (
        <Stack className="maze" alignItems='center' spacing={1} marginY={'1rem'}>
            <Stack marginBottom={'0.5rem'}>
                <Typography variant="h4" component="h4">
                    {title}
                </Typography>
                <Typography variant='body2' component='h4' fontWeight={300}>
                    {description}
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
                                gameStateId={id}
                            />
                    )
                )}
            </Grid>
        </Stack>
    )
}

export default Maze;

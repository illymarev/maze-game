import {Grid} from "@mui/material";
import MazeNode from "./MazeNode";

const Maze = ({mazeNodes, gameStateId, markNodeVisited}) => {
    const [rowsCount, columnsCount] = [mazeNodes.length, mazeNodes[0].length]

    return (
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
                            gameStateId={gameStateId}
                            handleMouseEnter={markNodeVisited}
                        />
                )
            )}
        </Grid>
    )
}

export default Maze;

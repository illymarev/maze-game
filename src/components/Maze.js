import {Grid} from "@mui/material";
import MazeNode from "./MazeNode";
import {observer} from "mobx-react";

const Maze = observer(({maze, config}) => {
    return (
        <Grid columns={config.columns} container width={{xs: '80%', md: '65%', lg: '60%'}}>
            {maze.nodes.map(
                (row, rowNumber) => row.map(
                    (node, columnNumber) =>
                        <MazeNode
                            key={`${rowNumber}-${columnNumber}`}
                            node={node}
                            config={config}
                        />
                )
            )}
        </Grid>
    )
})

export default Maze;

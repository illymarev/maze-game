import {Grid} from "@mui/material";
import MazeNode from "./MazeNode";
import {observer} from "mobx-react";

const Maze = observer(({maze, config}) => {
    return (
        <Grid columns={config.columns} container width={{xs: '67%', lg: '70%', xl: '75%'}}>
            {maze.nodes.map(
                row => row.map(
                    node => <MazeNode key={`${node.row}-${node.column}`} node={node} config={config}/>
                )
            )}
        </Grid>
    )
})

export default Maze;

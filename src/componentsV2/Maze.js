import {Grid} from "@mui/material";
import MazeNode from "./MazeNode";
import {observer} from "mobx-react";

const Maze = observer(({rootStore}) => {
    const maze = rootStore.mazeStore

    return (
        <Grid columns={maze.nodes[0].length} container width={{xs: '90%', lg: '93%', xxl: '97%'}}>
            {maze.nodes.map(
                row => row.map(
                    node => <MazeNode key={`${node.row}-${node.column}`} node={node} rootStore={rootStore}/>
                )
            )}
        </Grid>
    )
})

export default Maze;

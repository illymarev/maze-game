import {Grid} from "@mui/material";
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import {observer} from "mobx-react";

const MazeNode = observer(({node, rootStore}) => {
    const state = rootStore.stateStore
    const controller = rootStore.controller

    const onMouseDownFunc = e => {
        e.preventDefault()
        controller.registerUsersInput(node)
    }

    const onMouseEnterFunc = () => {
        if (state.mouseDown) controller.registerUsersInput(node);
    }

    const onMouseUpFunc = () => {
        controller.handleDroppingStartOrFinishFlag(node)
    }


    let backgroundColor
    if (node.route) {
        backgroundColor = 'rgba(247,255,22,0.75)'
    } else if (node.current) {
        backgroundColor = '#3b8ef1'
    } else if (node.visited) {
        backgroundColor = 'rgba(29,227,124,0.35)'
    } else {
        backgroundColor = 'white'
    }

    let nodeText
    if (node.start) {
        nodeText = <OutlinedFlagRoundedIcon fontSize={'small'}/>
    } else if (node.finish) {
        nodeText = <SportsScoreOutlinedIcon fontSize={'small'}/>
    } else {
        nodeText = ''
    }

    return (
        <Grid
            item={true}
            className={'mazeNode'}
            xs={1}
            onMouseDown={e => {
                onMouseDownFunc(e)
            }}
            onMouseEnter={() => {
                onMouseEnterFunc()
            }}
            onMouseUp={() => {
                onMouseUpFunc()
            }}
            sx={{
                borderTop: node.edges.north ? null : '2px solid #ccc',
                borderBottom: node.edges.south ? null : '2px solid #ccc',
                borderLeft: node.edges.west ? null : '2px solid #ccc',
                borderRight: node.edges.east ? null : '2px solid #ccc',
                backgroundColor: backgroundColor
            }}>
            {nodeText}
        </Grid>
    );
})


export default MazeNode

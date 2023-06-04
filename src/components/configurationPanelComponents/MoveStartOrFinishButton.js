import {observer} from "mobx-react";
import {movingStartAndFinish, readyToSolve} from "../../stores/options/gameStateOptions";
import {SwipeVerticalOutlined} from "@mui/icons-material";
import {Button} from "@mui/material";

const MoveStartOrFinishButton = observer(({state}) => {
    const onButtonClick = () => {
        if (state.gameState.id === movingStartAndFinish) {
            state.setGameState(readyToSolve);
        } else {
            state.setGameState(movingStartAndFinish);
        }
    }

    const text = state.gameState.id === movingStartAndFinish ? 'Stop Moving Start/Finish' : 'Move Start/Finish';
    const color = state.gameState.id === movingStartAndFinish ? 'danger' : 'neutral';

    return (
        <Button
            disabled={![readyToSolve, movingStartAndFinish].includes(state.gameState.id)}
            color={color}
            size={'large'}
            variant={'text'}
            startIcon={<SwipeVerticalOutlined/>}
            onClick={() => onButtonClick()}
        >
            {text}
        </Button>
    );
});

export default MoveStartOrFinishButton;
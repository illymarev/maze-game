import {observer} from "mobx-react";
import {generationInProgress, generationPending, solvingInProgress} from "../../stores/options/gameStateOptions";
import {Button} from "@mui/material";

const SolvingButton = observer(({state, controller}) => {
    const onButtonClick = () => {
        state.gameState.id === solvingInProgress ? controller.stopVisualization() : controller.solveMaze();
    }

    const text = state.gameState.id === solvingInProgress ? 'Stop Solving' : 'Solve';
    const color = state.gameState.id === solvingInProgress ? 'danger' : 'primary';

    return (
        <Button
            className={'primaryButton'}
            onClick={() => onButtonClick()}
            disabled={[generationPending, generationInProgress].includes(state.gameState.id)}
            variant="contained"
            color={color}
            size='large'
            sx={{height: {md: '50px', xl: '60px', xxl: '65px'}, fontSize: {xl: '1.25rem', xxl: '1.4rem'}}}
        >
            {text}
        </Button>
    );
});

export default SolvingButton;
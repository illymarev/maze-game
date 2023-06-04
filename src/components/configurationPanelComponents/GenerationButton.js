import {generationInProgress, solvingInProgress} from "../../stores/options/gameStateOptions";
import {Button} from "@mui/material";
import {observer} from "mobx-react";

const GenerationButton = observer(({state, controller}) => {
    const onButtonClick = () => {
        state.gameState.id === generationInProgress ? controller.stopVisualization() : controller.generateMaze();
    };

    const text = state.gameState.id === generationInProgress ? 'Stop Generating' : 'Generate';
    const color = state.gameState.id === generationInProgress ? 'danger' : 'secondary';

    return (
        <Button
            className={'primaryButton'}
            onClick={() => onButtonClick()}
            disabled={state.gameState.id === solvingInProgress}
            variant="contained"
            color={color}
            size='large'
            sx={{height: {md: '50px', xl: '60px', xxl: '65px'}, fontSize: {xl: '1.25rem', xxl: '1.4rem'}}}
        >
            {text}
        </Button>
    );
});

export default GenerationButton;
import {Button, Stack} from "@mui/material";
import {SwipeVerticalOutlined} from "@mui/icons-material";
import {observer} from "mobx-react";
import {
    generationPending,
    generationInProgress,
    solvingInProgress,
    readyToSolve,
    movingStartAndFinish
} from "../storesV2/options/gameStateOptions";
import GenerationAlgorithmSelector from "./configurationPanelComponents/GenerationAlgorithmSelector";
import SolvingAlgorithmSelector from "./configurationPanelComponents/SolvingAlgorithmSelector";
import VisualizationSpeedSelector from "./configurationPanelComponents/VisualizationSpeedSelector";
import StartAndFinishPlacementSelector from "./configurationPanelComponents/StartAndFinishPlacementSelector";
import MazeSizeSelector from "./configurationPanelComponents/MazeSizeSelector";

// TODO refactor into sub-components
const ConfigurationPanel = observer(({rootStore}) => {
    const state = rootStore.stateStore
    const config = rootStore.configStore
    const controller = rootStore.controller


    const onGenerationButtonClick = () => {
        state.gameState.id === generationInProgress ? controller.stopVisualization() : controller.generateMaze()
    }

    const onSolvingButtonClick = () => {
        state.gameState.id === solvingInProgress ? controller.stopVisualization() : controller.solveMaze()
    }

    const onMoveStartFinishButtonClick = () => {
        state.gameState.id === movingStartAndFinish ?
            state.setGameState(readyToSolve) : state.setGameState(movingStartAndFinish)
    }

    const generationButtonText = state.gameState.id === generationInProgress ? 'Stop Generating' : 'Generate'
    const generationButtonColor = state.gameState.id === generationInProgress ? 'danger' : 'secondary'

    const solvingButtonText = state.gameState.id === solvingInProgress ? 'Stop Solving' : 'Solve'
    const solvingButtonColor = state.gameState.id === solvingInProgress ? 'danger' : 'primary'

    const moveStartFinishButtonText = state.gameState.id === movingStartAndFinish ?
        'Stop Moving Start/Finish' : 'Move Start/Finish'

    const moveStartFinishButtonColor = state.gameState.id === movingStartAndFinish ? 'danger' : 'neutral'

    return (
        <Stack width={'100%'} height={'100%'} alignItems={'center'}
               justifyContent={'space-evenly'}>
            <Button onClick={() => onGenerationButtonClick()}
                    disabled={state.gameState.id === solvingInProgress}
                    variant="contained" color={generationButtonColor} size='large'
                    sx={{
                        'border-radius': '1.25rem',
                        width: '90%',
                        height: {md: '50px', xxl: '60px'},
                        fontSize: {xl: '1.15rem', xxl: '1.25rem'}
                    }}>
                {generationButtonText}
            </Button>
            <Button onClick={() => onSolvingButtonClick()}
                    disabled={[generationPending, generationInProgress].includes(state.gameState.id)}
                    variant="contained" color={solvingButtonColor} size='large'
                    sx={{
                        'border-radius': '1.25rem',
                        width: '90%',
                        height: {md: '50px', xxl: '60px'},
                        fontSize: {xl: '1.15rem', xxl: '1.25rem'}
                    }}>
                {solvingButtonText}
            </Button>

            <GenerationAlgorithmSelector config={config} state={state}/>

            <SolvingAlgorithmSelector config={config} state={state}/>

            <VisualizationSpeedSelector config={config} state={state}/>

            <StartAndFinishPlacementSelector config={config} state={state}/>

            <MazeSizeSelector config={config} state={state}/>

            <Button disabled={![readyToSolve, movingStartAndFinish].includes(state.gameState.id)}
                    color={moveStartFinishButtonColor}
                    size={'large'}
                    variant={'text'}
                    startIcon={<SwipeVerticalOutlined/>}
                    onClick={() => onMoveStartFinishButtonClick()}
            >
                {moveStartFinishButtonText}
            </Button>
        </Stack>
    )
})

export default ConfigurationPanel;

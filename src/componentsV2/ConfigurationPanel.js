import {Button, InputLabel, MenuItem, Stack, Select} from "@mui/material";
import {SwipeVerticalOutlined} from "@mui/icons-material";
import {observer} from "mobx-react";
import generationAlgorithmOptions from "../storesV2/options/generationAlgorithmOptions";
import solvingAlgorithmOptions from "../storesV2/options/solvingAlgorithmOptions";
import mazeSizeOptions from "../storesV2/options/mazeSizeOptions";
import {visualizationSpeedOptions} from "../storesV2/options/visualizationSpeedOptions";
import {defaultStartAndFinishPlacementOptions} from "../storesV2/options/defaultStartAndFinishPlacementOptions";
import {
    generationPending,
    generationInProgress,
    solvingInProgress,
    readyToSolve,
    movingStartAndFinish
} from "../storesV2/options/gameStateOptions";

const ConfigurationPanel = observer(({rootStore}) => {
    const state = rootStore.stateStore
    const config = rootStore.configStore
    const controller = rootStore.controller

    const generationAlgorithmUIOptions = []
    const solvingAlgorithmUIOptions = []
    const visualizationSpeedUIOptions = []
    const mazeSizeUIOptions = []
    const startAndFinishPlacementUIOptions = []

    for (const option of mazeSizeOptions) {
        mazeSizeUIOptions.push(
            <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
        )
    }

    for (const option of visualizationSpeedOptions) {
        visualizationSpeedUIOptions.push(
            <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
        )
    }

    for (const option of generationAlgorithmOptions) {
        generationAlgorithmUIOptions.push(
            <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
        )
    }

    for (const option of solvingAlgorithmOptions) {
        solvingAlgorithmUIOptions.push(
            <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
        )
    }

    for (const option of defaultStartAndFinishPlacementOptions) {
        startAndFinishPlacementUIOptions.push(
            <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
        )
    }

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

            <Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
                <InputLabel id="generation_algorithm_label">Generation Algorithm</InputLabel>
                <Select
                    disabled={state.visualizationInProgress}
                    labelId="generation_algorithm_label"
                    id="generation_algorithm_selector"
                    sx={{'border-radius': '1.25rem', width: '90%'}}
                    value={config.generationAlgorithm.id}
                    onChange={e => config.setGenerationAlgorithm(e.target.value)}
                >
                    {generationAlgorithmUIOptions}
                </Select>
            </Stack>

            <Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
                <InputLabel id="solving_algorithm_label">Solving Algorithm</InputLabel>
                <Select
                    disabled={state.visualizationInProgress}
                    labelId="solving_algorithm_label"
                    id="solving_algorithm_selector"
                    sx={{'border-radius': '1.25rem', width: '90%'}}
                    value={config.solvingAlgorithm.id}
                    onChange={e => config.setSolvingAlgorithm(e.target.value)}
                >
                    {solvingAlgorithmUIOptions}
                </Select>
            </Stack>
            <Stack justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <InputLabel id="visualization_speed_label">Visualization Speed</InputLabel>
                <Select
                    disabled={state.visualizationInProgress}
                    labelId="visualization_speed_label"
                    id="visualization_speed_slider"
                    sx={{'border-radius': '1.25rem', width: '90%'}}
                    value={config.visualizationSpeed.id}
                    onChange={e => config.setVisualizationDelay(e.target.value)}
                >
                    {visualizationSpeedUIOptions}
                </Select>
            </Stack>
            <Stack justifyContent={'center'} alignItems={'center'} width={'100%'}>
                {/*// TODO verify all ids*/}
                <InputLabel id="visualization_speed_label">Maze Size</InputLabel>
                <Select
                    disabled={state.visualizationInProgress}
                    labelId="visualization_speed_label"
                    id="visualization_speed_slider"
                    sx={{'border-radius': '1.25rem', width: '90%'}}
                    value={config.mazeSize.id}
                    onChange={e => config.setMazeSize(e.target.value)}
                >
                    {mazeSizeUIOptions}
                </Select>
            </Stack>
            <Stack justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <InputLabel id="visualization_speed_label">Default Start/Finish Position</InputLabel>
                <Select
                    disabled={state.visualizationInProgress}
                    labelId="visualization_speed_label"
                    id="visualization_speed_slider"
                    sx={{'border-radius': '1.25rem', width: '90%'}}
                    value={config.defaultStartAndFinishPlacement.id}
                    onChange={e => config.setDefaultStartAndFinishPlacement(e.target.value)}
                >
                    {startAndFinishPlacementUIOptions}
                </Select>
            </Stack>
            <Stack alignItems={'center'}>
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
        </Stack>
    )
})

export default ConfigurationPanel;

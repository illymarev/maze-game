import {Button, InputLabel, MenuItem, Stack, Select, Typography} from "@mui/material";
import {EditOutlined} from "@mui/icons-material";
import {observer} from "mobx-react";
import {
    visualizationSpeedOptions,
    generationAlgorithmOptions,
    solvingAlgorithmOptions,
    mazeSizeOptions,
    defaultStartAndFinishPlacementOptions
} from "../stores/configStore";
import * as React from "react";

const ConfigurationPanel = observer(({gameStore, config}) => {
    const generationAlgorithmUIOptions = []
    const solvingAlgorithmUIOptions = []
    const visualizationSpeedUIOptions = []
    const mazeSizeUIOptions = []
    const startAndFinishPlacementUIOptions = []

    for (const option of Object.values(mazeSizeOptions)) {
        mazeSizeUIOptions.push(
            <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
        )
    }

    for (const option of Object.values(visualizationSpeedOptions)) {
        visualizationSpeedUIOptions.push(
            <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
        )
    }

    for (const option of Object.values(generationAlgorithmOptions)) {
        generationAlgorithmUIOptions.push(
            <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
        )
    }

    for (const option of Object.values(solvingAlgorithmOptions)) {
        solvingAlgorithmUIOptions.push(
            <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
        )
    }

    for (const option of Object.values(defaultStartAndFinishPlacementOptions)){
        startAndFinishPlacementUIOptions.push(
            <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
        )
    }

    const onGenerationButtonClick = () => config.gameState.id === 1 ? gameStore.stopVisualization() : gameStore.generateMaze()
    const generationButtonText = config.gameState.id === 1 ? 'Stop Generating' : 'Generate'
    const generationButtonColor = config.gameState.id === 1 ? 'danger' : 'secondary'

    const onSolvingButtonClick = () => config.gameState.id === 4 ? gameStore.stopVisualization() : gameStore.solveMaze()
    const solvingButtonText = config.gameState.id === 4 ? 'Stop Solving' : 'Solve'
    const solvingButtonColor = config.gameState.id === 4 ? 'danger' : 'primary'

    return (
        <Stack width={'100%'} height={'100%'} alignItems={'center'}
               justifyContent={'space-evenly'}>
            <Button onClick={() => onGenerationButtonClick()}
                    disabled={config.gameState.id === 4}
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
                    disabled={[0, 1].includes(config.gameState.id)}
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
                    disabled={config.visualizationInProgress}
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
                    disabled={config.visualizationInProgress}
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
                    disabled={config.visualizationInProgress}
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
                    disabled={config.visualizationInProgress}
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
                    disabled={config.visualizationInProgress}
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
                <EditOutlined/>
                <Typography variant='body2' component='h4' fontWeight={300}>
                    Move Start/Finish
                </Typography>
            </Stack>
        </Stack>
    )
})

export default ConfigurationPanel;

import {Button, InputLabel, MenuItem, Slider, Stack, Select} from "@mui/material";
import {observer} from "mobx-react";
import {
    visualizationSpeedOptions,
    generationAlgorithmOptions,
    solvingAlgorithmOptions
} from "../stores/configStore";

const ConfigurationPanel = observer(({gameStore, config}) => {
    const visualizationSpeedUIOptions = []
    const generationAlgorithmUIOptions = []
    const solvingAlgorithmUIOptions = []

    for (const option of Object.values(visualizationSpeedOptions)) {
        visualizationSpeedUIOptions.push({value: option.id, label: option.label})
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

    const onGenerationButtonClick = () => config.gameState.id === 1 ? gameStore.stopVisualization() : gameStore.generateMaze()
    const generationButtonText = config.gameState.id === 1 ? 'Stop Generating' : 'Generate'
    const generationButtonColor = config.gameState.id === 1 ? 'danger' : 'secondary'

    const onSolvingButtonClick = () => config.gameState.id === 4 ? gameStore.stopVisualization() : gameStore.solveMaze()
    const solvingButtonText = config.gameState.id === 4 ? 'Stop Solving' : 'Solve'
    const solvingButtonColor = config.gameState.id === 4 ? 'danger' : 'primary'


    return (
        <Stack spacing={1} alignItems='center' marginTop={'1rem'}>

            <Stack alignItems='center' direction='row' spacing={2}>
                <Stack width={'200px'}>
                    <InputLabel id="generation_algorithm_label">Generation Algorithm</InputLabel>
                    <Select
                        disabled={config.visualizationInProgress}
                        labelId="generation_algorithm_label"
                        id="generation_algorithm_selector"
                        sx={{'border-radius': '1.25rem'}}
                        value={config.generationAlgorithm.id}
                        onChange={e => config.setGenerationAlgorithm(e.target.value)}
                    >
                        {generationAlgorithmUIOptions}
                    </Select>
                </Stack>
                <Stack spacing={2}>
                    <Button onClick={() => onGenerationButtonClick()}
                            disabled={config.gameState.id === 4}
                            variant="contained" color={generationButtonColor} size='large'
                            sx={{width: '200px', height: '50px', 'border-radius': '1.25rem'}}>
                        {generationButtonText}
                    </Button>
                    <Button onClick={() => onSolvingButtonClick()}
                            disabled={[0, 1].includes(config.gameState.id)}
                            variant="contained" color={solvingButtonColor} size='large'
                            sx={{width: '200px', height: '50px', 'border-radius': '1.25rem'}}>
                        {solvingButtonText}
                    </Button>
                </Stack>
                <Stack width={'200px'}>
                    <InputLabel id="solving_algorithm_label">Solving Algorithm</InputLabel>
                    <Select
                        disabled={config.visualizationInProgress}
                        labelId="solving_algorithm_label"
                        id="solving_algorithm_selector"
                        sx={{'border-radius': '1.25rem'}}
                        value={config.solvingAlgorithm.id}
                        onChange={e => config.setSolvingAlgorithm(e.target.value)}
                    >
                        {solvingAlgorithmUIOptions}
                    </Select>
                </Stack>
            </Stack>

            <Stack direction='column' justifyContent='center' alignItems='center'>
                <InputLabel id="visualization_speed_label">Visualization Speed</InputLabel>
                <Slider
                    disabled={config.visualizationInProgress}
                    step={null}
                    marks={visualizationSpeedUIOptions}
                    labelId="visualization_speed_label"
                    id='visualization_speed_slider'
                    value={config.visualizationSpeed.id}
                    valueLabelDisplay="off"
                    size='medium'
                    min={0} max={4}
                    sx={{width: '625px'}}
                    onChange={e => config.setVisualizationDelay(e.target.value)}
                />
            </Stack>

        </Stack>
    )
})

export default ConfigurationPanel;

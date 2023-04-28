import {Button, InputLabel, MenuItem, Slider, Stack, Select} from "@mui/material";
import {observer} from "mobx-react";

// TODO read about UI stores. It seems like it's a good use case here
// TODO automate generation/solving algorithm options and selecting from the store
// TODO move generation/solving funcs from mazeGame to maze store
const ConfigurationPanel = observer(({
                                         config,
                                         algorithmsSettings,
                                         onAlgorithmSettingChange,
                                         generationAlgorithmOptions,
                                         solvingAlgorithmOptions,
                                         generationFunction,
                                         solvingFunction,
                                         setStopVisualization
                                     }) => {

    const onGenerationButtonClick = () => config.gameState.id === 1 ? setStopVisualization(true) : generationFunction()
    const generationButtonColor = config.gameState.id === 1 ? 'danger' : 'secondary'

    const onSolvingButtonClick = () => config.gameState.id === 4 ? setStopVisualization(true) : solvingFunction()
    const solvingButtonColor = config.gameState.id === 4 ? 'danger' : 'primary'

    const generationAlgorithmMenuItems = []
    for (const [key, value] of Object.entries(generationAlgorithmOptions)) {
        generationAlgorithmMenuItems.push(
            <MenuItem key={key} value={key}>{value.title}</MenuItem>
        )
    }

    const solvingAlgorithmMenuItems = []
    for (const [key, value] of Object.entries(solvingAlgorithmOptions)) {
        solvingAlgorithmMenuItems.push(
            <MenuItem key={key} value={key}>{value.title}</MenuItem>
        )
    }

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
                        value={algorithmsSettings.generationAlgorithm}
                        onChange={e => onAlgorithmSettingChange('generationAlgorithm', e.target.value)}
                    >
                        {generationAlgorithmMenuItems}
                    </Select>
                </Stack>
                <Stack spacing={2}>
                    <Button onClick={() => onGenerationButtonClick()}
                            disabled={config.gameState.id === 4}
                            variant="contained" color={generationButtonColor} size='large'
                            sx={{width: '200px', height: '50px', 'border-radius': '1.25rem'}}>
                        {config.gameState.id === 1 ? 'Stop Generating' : 'Generate'}
                    </Button>
                    <Button onClick={() => onSolvingButtonClick()}
                            disabled={[0, 1].includes(config.gameState.id)}
                            variant="contained" color={solvingButtonColor} size='large'
                            sx={{width: '200px', height: '50px', 'border-radius': '1.25rem'}}>
                        {config.gameState.id === 4 ? 'Stop Solving' : 'Solve'}
                    </Button>
                </Stack>
                <Stack width={'200px'}>
                    <InputLabel id="solving_algorithm_label">Solving Algorithm</InputLabel>
                    <Select
                        disabled={config.visualizationInProgress}
                        labelId="solving_algorithm_label"
                        id="solving_algorithm_selector"
                        sx={{'border-radius': '1.25rem'}}
                        value={algorithmsSettings.solvingAlgorithm}
                        onChange={e => onAlgorithmSettingChange('solvingAlgorithm', e.target.value)}
                    >
                        {solvingAlgorithmMenuItems}
                    </Select>
                </Stack>
            </Stack>

            <Stack direction='column' justifyContent='center' alignItems='center'>
                <InputLabel id="visualization_speed_label">Visualization Speed</InputLabel>
                <Slider
                    disabled={config.visualizationInProgress}
                    step={null}
                    marks={config.visualizationDelayMarks}
                    labelId="visualization_speed_label"
                    id='visualization_speed_slider'
                    value={config.visualizationDelay.id}
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

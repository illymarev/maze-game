import {Button, InputLabel, MenuItem, Slider, Stack, Select} from "@mui/material";
import {memo} from "react";

const marks = [
    {
        value: 0,
        label: 'Slow'
    },
    {
        value: 1,
        label: 'Medium'
    },
    {
        value: 2,
        label: 'Fast'
    },
    {
        value: 3,
        label: 'Immediate'
    }
]

const ConfigurationPanel = memo(({
                                     algorithmsSettings,
                                     onAlgorithmSettingChange,
                                     generationAlgorithmOptions,
                                     solvingAlgorithmOptions,
                                     generationFunction,
                                     solvingFunction,
                                     gameStateId,
                                     setStopGeneration
                                 }) => {
    const disableChanges = gameStateId === 1
    const onGenerationButtonClick = () => disableChanges ? setStopGeneration(true) : generationFunction()
    const generationButtonColor = disableChanges ? 'danger' : 'secondary'

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
                        disabled={disableChanges}
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
                            variant="contained" color={generationButtonColor} size='large'
                            sx={{width: '200px', height: '50px', 'border-radius': '1.25rem'}}>
                        {disableChanges ? 'Stop Generation' : 'Generate'}
                    </Button>
                    <Button onClick={() => solvingFunction()}
                        disabled={disableChanges} variant="contained" color='primary' size='large'
                            sx={{width: '200px', height: '50px', 'border-radius': '1.25rem'}}>
                        Solve
                    </Button>
                </Stack>
                <Stack width={'200px'}>
                    <InputLabel id="solving_algorithm_label">Solving Algorithm</InputLabel>
                    <Select
                        disabled={disableChanges}
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
                    disabled={disableChanges}
                    step={null}
                    marks={marks}
                    labelId="visualization_speed_label"
                    id='visualization_speed_slider'
                    value={algorithmsSettings.visualizationSpeed}
                    valueLabelDisplay="off"
                    size='medium'
                    min={0} max={3}
                    sx={{width: '625px'}}
                    onChange={e => onAlgorithmSettingChange('visualizationSpeed', e.target.value)}
                />
            </Stack>

        </Stack>
    )
})

export default ConfigurationPanel;

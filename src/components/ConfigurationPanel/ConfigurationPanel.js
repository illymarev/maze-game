import {Button, InputLabel, MenuItem, Slider, Stack, Select} from "@mui/material";
import {memo} from "react";

const ConfigurationPanel = memo(({
                                     algorithmsSettings,
                                     onAlgorithmSettingChange,
                                     generationAlgorithmOptions,
                                     solvingAlgorithmOptions,
                                     generationFunction
                                 }) => {
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
                    <Button variant="contained" color='secondary' size='large' onClick={() => generationFunction()}
                            sx={{width: '200px', height: '50px', 'border-radius': '1.25rem'}}>
                        Generate
                    </Button>
                    <Button variant="contained" color='primary' size='large'
                            sx={{width: '200px', height: '50px', 'border-radius': '1.25rem'}}>
                        Solve
                    </Button>
                </Stack>
                <Stack width={'200px'}>
                    <InputLabel id="solving_algorithm_label">Solving Algorithm</InputLabel>
                    <Select
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

            {/*TODO optimize using useMemo or useCallback (dont recall which one to use in this scenario)*/}
            <Stack direction='column' justifyContent='center' alignItems='center'>
                <InputLabel id="visualization_speed_label">Visualization Speed</InputLabel>
                <Slider
                    labelId="visualization_speed_label"
                    id='visualization_speed_slider'
                    value={algorithmsSettings.visualizationSpeed}
                    valueLabelDisplay="auto"
                    size='medium'
                    min={0} max={100}
                    sx={{width: '625px'}}
                    onChange={e => onAlgorithmSettingChange('visualizationSpeed', e.target.value)}
                />
            </Stack>

        </Stack>
    )
})

export default ConfigurationPanel;

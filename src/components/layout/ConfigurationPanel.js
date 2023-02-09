import {Button, InputLabel, MenuItem, Slider, Stack, Select} from "@mui/material";


const ConfigurationPanel = () => (
    <Stack spacing={3} alignItems='center' marginTop={'1rem'}>

        <Stack alignItems='center' direction='row' spacing={2}>
            <Stack width={'250px'}>
                <InputLabel id="generation_algorithm_label">Generation Algorithm</InputLabel>
                <Select
                    labelId="generation_algorithm_label"
                    id="generation_algorithm_selector"
                    sx={{'border-radius': '1.25rem'}}
                    value='recursive_backtracking'>
                    <MenuItem value="recursive_backtracking">Recursive Backtracking</MenuItem>
                    <MenuItem value="random">TODO</MenuItem>
                </Select>
            </Stack>
            <Stack spacing={2}>
                <Button variant="contained" color='secondary' size='large'
                        sx={{width: '200px', height: '50px', 'border-radius': '1.25rem'}}>
                    Generate
                </Button>
                <Button variant="contained" color='primary' size='large'
                        sx={{width: '200px', height: '50px', 'border-radius': '1.25rem'}}>
                    Solve
                </Button>
            </Stack>
            <Stack width={'250px'}>
                <InputLabel id="solving_algorithm_label">Solving Algorithm</InputLabel>
                <Select
                    labelId="solving_algorithm_label"
                    id="solving_algorithm_selector"
                    sx={{'border-radius': '1.25rem'}}
                    value='dijkstras_algorithm'>
                    <MenuItem value="dijkstras_algorithm">Dijkstra's Algorithm</MenuItem>
                    <MenuItem value="random">TODO</MenuItem>
                </Select>
            </Stack>
        </Stack>

        <Stack direction='column' justifyContent='center' alignItems='center'>
            <InputLabel id="visualization_speed_label">Visualization Speed</InputLabel>
            <Slider
                labelId="visualization_speed_label"
                id='visualization_speed_slider'
                defaultValue={50}
                valueLabelDisplay="auto"
                size='medium'
                sx={{width: '730px'}}/>
        </Stack>

    </Stack>
)

export default ConfigurationPanel;

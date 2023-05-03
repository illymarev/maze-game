import {Button, InputLabel, MenuItem, Slider, Stack, Select, Grid, Typography} from "@mui/material";
import {SettingsOutlined, EditOutlined} from "@mui/icons-material";
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
        <Grid container spacing={2} marginTop={'10px'}>
            <Grid item xs={1.5}/>
            <Grid item xs={1.5}>
                <Stack height={'100%'} width={'100%'} justifyContent={'space-evenly'} alignItems={'center'} spacing={2}>
                    <Stack alignItems={'center'}>
                        <SettingsOutlined/>
                        <Typography variant='body2' component='h4' fontWeight={300}>
                            Advanced settings
                        </Typography>
                    </Stack>

                    <Stack alignItems={'center'}>
                        <EditOutlined/>
                        <Typography variant='body2' component='h4' fontWeight={300}>
                            Move Start/Finish
                        </Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={0.5}/>

            <Grid item xs={5}>
                <Stack justifyContent={'center'} alignItems={'center'} spacing={2} width={'100%'}>
                    <Grid container>
                        <Grid item xs={3.5}>
                            <Stack width={'100%'} height={'100%'}>
                                <InputLabel id="generation_algorithm_label">Generation Algorithm</InputLabel>
                                <Select
                                    disabled={config.visualizationInProgress}
                                    labelId="generation_algorithm_label"
                                    id="generation_algorithm_selector"
                                    sx={{'border-radius': '1.25rem', width: '100%'}}
                                    value={config.generationAlgorithm.id}
                                    onChange={e => config.setGenerationAlgorithm(e.target.value)}
                                >
                                    {generationAlgorithmUIOptions}
                                </Select>
                            </Stack>
                        </Grid>
                        <Grid item xs={0.5}/>
                        <Grid item xs={4}>
                            <Stack spacing={2} width={'100%'} height={'100%'} alignItems={'center'}
                                   justifyContent={'center'}>
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
                            </Stack>
                        </Grid>
                        <Grid item xs={0.5}/>
                        <Grid item xs={3.5}>
                            <Stack height={'100%'} width={'100%'}>
                                <InputLabel id="solving_algorithm_label">Solving Algorithm</InputLabel>
                                <Select
                                    disabled={config.visualizationInProgress}
                                    labelId="solving_algorithm_label"
                                    id="solving_algorithm_selector"
                                    sx={{'border-radius': '1.25rem', width: '100%'}}
                                    value={config.solvingAlgorithm.id}
                                    onChange={e => config.setSolvingAlgorithm(e.target.value)}
                                >
                                    {solvingAlgorithmUIOptions}
                                </Select>
                            </Stack>
                        </Grid>

                    </Grid>

                    <Stack justifyContent={'center'} alignItems={'center'} width={'100%'}>
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
                            onChange={e => config.setVisualizationDelay(e.target.value)}
                        />
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={0.5}/>


            <Grid item xs={3}/>

        </Grid>
    )
})

export default ConfigurationPanel;

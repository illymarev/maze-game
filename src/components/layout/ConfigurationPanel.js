import Button from '@mui/material/Button';
import {Box, Container, Stack, Grid} from "@mui/material";


const ConfigurationPanel = () => (
    <Stack spacing={3} sx={{
        'align-items': 'center',
        'margin-top': '1rem'
    }}>
        <Stack direction='row' spacing={5}>
            <Button variant="contained" color='secondary' size='large'
                    sx={{
                        width: '200px',
                        height: '50px',
                        'border-radius': '1.25rem',
                    }}>Generate</Button>
            <Button variant="contained" color='primary' size='large'
                    sx={{
                        width: '200px',
                        height: '50px',
                        'border-radius': '1.25rem',
                    }}>Solve</Button>
        </Stack>
        <Stack sx={{
            border: '1px solid #ccc',
            'border-radius': '1.25rem',
            padding: '1rem',
        }}>
            <Stack direction='row' spacing={2}>
                <div className='label_and_input'>
                    <label> Generation Algorithm
                        <select name='generation_algorithm_selector' id='generation_algorithm_selector'>
                            <option value='recursive_backtracking' selected='selected'>Recursive Backtracking</option>
                            <option value='random'>TODO</option>
                        </select>
                    </label>
                </div>
                <div className='label_and_input'>
                    <label> Solving Algorithm
                        <select name='solving_algorithm_selector' id='solving_algorithm_selector'>
                            <option value='dijkstras_algorithm' selected='selected'>Dijkstra's Algorithm</option>
                            <option value='random'>TODO</option>
                        </select>
                    </label>
                </div>
            </Stack>
            <div className='label_and_input'>
                <label>Visualization Speed
                    <input type='range' name='visualization_speed' id='visualization_speed' min='1' max='100'/>
                </label>
            </div>
        </Stack>
    </Stack>
)

export default ConfigurationPanel;

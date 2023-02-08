const ConfigurationPanel = () => (
    <div className='configuration_panel'>
        <div className='two_column_flex generate_and_solve_buttons'>
            <button className='generate_button button' id='generate_button'>Generate</button>
            <button className='solve_button button' id='solve_button'>Solve</button>
        </div>
        <div className='two_column_flex generation_and_solving_algorithms_selection'>
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
        </div>
        <div className='settings_window'>
            <h3>Options</h3>
            <div className='one_row'>
                <div className='label_and_input'>
                    <label>Width
                        <input type='number' name='width' id='width' min='5' max='100' value={10}/>
                    </label>
                </div>
                <div className='label_and_input'>
                    <label>Height
                        <input type='number' name='height' id='height' min='5' max='100' value={10}/>
                    </label>
                </div>
            </div>
            <div className='label_and_input'>
                <label>Visualization Speed
                    <input type='range' name='visualization_speed' id='visualization_speed' min='1' max='100'/>
                </label>
            </div>
        </div>
    </div>
)

export default ConfigurationPanel;

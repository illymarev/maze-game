const Content = () => (
    <div className="content">
        <div className='generate_and_solve_buttons'>
            <button className='generate_button button'>Generate</button>
            <button className='solve_button button'>Solve</button>
        </div>
        <div className='generation_and_solving_algorithms_selection'>
            <div className='label_and_input'>
                <label> Generation Algorithm
                    <select name='generation_algorithm' id='generation_algorithm'>
                        <option value='recursive_backtracking' selected='selected'>Recursive Backtracking</option>
                        <option value='random'>TODO</option>
                    </select>
                </label>
            </div>
            <div className='label_and_input'>
                <label> Solving Algorithm
                    <select name='solving_algorithm' id='solving_algorithm'>
                        <option value='dijkstras_algorithm' selected='selected'>Dijkstra's Algorithm</option>
                        <option value='random'>TODO</option>
                    </select>
                </label>
            </div>
        </div>
        <div className='settings_window'>
            <h3>Options</h3>
            <div className='two_columns'>
                <div className='label_and_input'>
                    <label>Width
                        <input type='number' name='width' id='width' min='1' max='100' value='10'/>
                    </label>
                </div>
                <div className='label_and_input'>
                    <label>Height
                        <input type='number' name='height' id='height' min='1' max='100' value='10'/>
                    </label>
                </div>
            </div>
            <div className='label_and_input'>
                <label>Visualization Speed
                    <input type='range' name='visualization_speed' id='visualization_speed' min='1' max='100'/>
                </label>
            </div>
        </div>
        <div className='maze_legend'>
            <ul>
                <li>Visited</li>
                <li>Wall</li>
                <li>Start</li>
                <li>Finish</li>
            </ul>
        </div>
    </div>
)

export default Content;

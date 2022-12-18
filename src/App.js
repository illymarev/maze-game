import {useState} from 'react'
import Maze from './components/maze/Maze.js'
import './App.css';

const App = () => {


    return (
        <div className="App">
            <h1>
                Welcome to my maze game!
            </h1>


            <Maze
                mazeGenerationFunction="recursiveBacktracking"/>
        </div>
    );
}
export default App;

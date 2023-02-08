import ConfigurationPanel from './components/layout/ConfigurationPanel';
import Footer from './components/layout/Footer';
import Maze from "./components/layout/Maze";
import './App.css';

function App() {
    return (
        <div className='app'>
            <ConfigurationPanel/>
            <Maze/>
            <Footer/>
        </div>
    );
}

export default App;

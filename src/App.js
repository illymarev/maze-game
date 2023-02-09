import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ConfigurationPanel from './components/layout/ConfigurationPanel';
import Footer from './components/layout/Footer';
import Maze from "./components/layout/Maze";
import './App.css';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        secondary: {
            main: '#0fb45d',
            contrastText: '#fff'
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className='app'>
                <ConfigurationPanel/>
                <Maze/>
                <Footer/>
            </div>
        </ThemeProvider>
    );
}

export default App;

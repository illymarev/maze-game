import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MazeGame from './components/MazeGame'
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
            <MazeGame/>
        </ThemeProvider>
    );
}

export default App;

import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MazeGame from './components/MazeGame'
import './App.css';
import WelcomeModal from "./components/WelcomeModal";
import {observer} from "mobx-react";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1200,
            lg: 1600,
            xl: 1800,
            xxl: 2000
        },
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
            main: 'rgba(0, 0, 0, 0.6)',
            contrastText: '#fff',
        },
        danger: {
            main: '#b71212',
            contrastText: '#fff',
        }
    },
});

const App = observer(({gameStore}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <WelcomeModal/>
            <MazeGame gameStore={gameStore}/>
        </ThemeProvider>
    );
})

export default App;

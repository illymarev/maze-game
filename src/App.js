import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MazeGame from './components/MazeGame'
import './App.css';
import WelcomeModal from "./components/WelcomeModal";
import {observer} from "mobx-react";

const theme = createTheme({
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

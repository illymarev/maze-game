import {Card, Stack} from "@mui/material";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

const MazeLegend = () => (
    <Stack direction='row' spacing={5}>
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
            <OutlinedFlagIcon/><span>Start</span>
        </Stack>
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
            <SportsScoreIcon/><span>Finish</span>
        </Stack>
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
            <Card variant="outlined"
                  sx={{
                      'background': 'rgba(29,227,124, 0.35)',
                      'aspectRatio': '1/1',
                      'width': '15px'
                  }}></Card>
            <span>Visited</span>
        </Stack>
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
            <Card variant="outlined"
                  sx={{
                      'background': '#ccc',
                      'aspectRatio': '1/1',
                      'width': '15px'
                  }}></Card>
            <span>Wall</span>
        </Stack>
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
            <Card variant="outlined"
                  sx={{
                      'background': '#3b8ef1',
                      'aspectRatio': '1/1',
                      'width': '15px'
                  }}></Card>
            <span>Current</span>
        </Stack>
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
            <Card variant="outlined"
                  sx={{
                      'background': 'rgba(247,255,22)',
                      'aspectRatio': '1/1',
                      'width': '15px'
                  }}></Card>
            <span>Shortest Path</span>
        </Stack>
    </Stack>
);

export default MazeLegend
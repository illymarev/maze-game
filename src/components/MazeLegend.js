import {Card, Stack} from "@mui/material";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import {memo} from "react";

const MazeLegend = memo(() => (
    <Stack direction='row' spacing={5}>
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
            <Card variant="outlined"
                  sx={{
                      'background': 'red',
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
            <OutlinedFlagIcon/><span>Start</span>
        </Stack>
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
            <SportsScoreIcon/><span>Finish</span>
        </Stack>
    </Stack>
))

export default MazeLegend
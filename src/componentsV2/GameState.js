import {Stack, Typography} from "@mui/material";
import {observer} from "mobx-react";

const GameState = observer(({state}) => (
    <Stack marginBottom={'2rem'}>
        <Typography variant="h3" component="h3">
            {state.gameState.title}
        </Typography>
        <Typography variant='body2' component='p' fontWeight={300}>
            {state.gameState.description}
        </Typography>
    </Stack>
))

export default GameState


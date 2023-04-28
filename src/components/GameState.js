import {Stack, Typography} from "@mui/material";
import {observer} from "mobx-react";

export const GameState = observer(({config}) => (
    <Stack marginBottom={'0.5rem'}>
        <Typography variant="h4" component="h4">
            {config.gameState.title}
        </Typography>
        <Typography variant='body2' component='h4' fontWeight={300}>
            {config.gameState.description}
        </Typography>
    </Stack>
))


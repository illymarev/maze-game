import {Stack, Typography} from "@mui/material";
import {observer} from "mobx-react";

export const GameState = observer(({config}) => (
    <Stack marginBottom={'2rem'}>
        <Typography variant="h3" component="h3">
            {config.gameState.title}
        </Typography>
        <Typography variant='body2' component='p' fontWeight={300}>
            {config.gameState.description}
        </Typography>
    </Stack>
))


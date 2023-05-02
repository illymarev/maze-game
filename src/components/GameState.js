import {Stack, Typography} from "@mui/material";
import {observer} from "mobx-react";

export const GameState = observer(({config}) => (
    <Stack>
        <Typography variant="h5" component="h5">
            {config.gameState.title}
        </Typography>
        <Typography variant='body2' component='p' fontWeight={300}>
            {config.gameState.description}
        </Typography>
    </Stack>
))


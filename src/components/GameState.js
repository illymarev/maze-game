import {Stack, Typography} from "@mui/material";
import {memo} from "react";

export const GameState = memo(({title, description}) => (
    <Stack marginBottom={'0.5rem'}>
        <Typography variant="h4" component="h4">
            {title}
        </Typography>
        <Typography variant='body2' component='h4' fontWeight={300}>
            {description}
        </Typography>
    </Stack>
))


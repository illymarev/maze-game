import {Stack, InputLabel, Select, MenuItem} from "@mui/material";

const SelectWithInput = ({id, labelId, labelText, disabled, value, onChangeFunction, options}) => (
    <Stack className={'selectWithInputStack'}>
        <InputLabel id={labelId}>{labelText}</InputLabel>
        <Select
            className={'selectWithInputSelect'}
            id={id}
            labelId={labelId}
            disabled={disabled}
            value={value}
            onChange={onChangeFunction}
        >
            {options.map(option => <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>)}
        </Select>
    </Stack>
);

export default SelectWithInput;

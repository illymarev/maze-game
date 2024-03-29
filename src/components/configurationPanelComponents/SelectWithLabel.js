import {InputLabel, MenuItem, Select, Stack} from "@mui/material";

const SelectWithLabel = ({id, labelId, labelText, disabled, value, onChangeFunction, options}) => (
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

export default SelectWithLabel;

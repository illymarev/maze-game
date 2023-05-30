import {observer} from "mobx-react";
import mazeSizeOptions from "../../storesV2/options/mazeSizeOptions";
import SelectWithInput from "./SelectWithInput";

const MazeSizeSelector = observer(({config, state}) =>
    <SelectWithInput
        id={'maze-size-selector'}
        labelId={'maze-size-selector-label'}
        labelText={'Maze Size'}
        disabled={state.visualizationInProgress}
        value={config.mazeSize.id}
        onChangeFunction={e => config.setMazeSize(e.target.value)}
        options={mazeSizeOptions}
    />
);

export default MazeSizeSelector;

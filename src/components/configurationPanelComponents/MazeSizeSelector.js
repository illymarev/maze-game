import {observer} from "mobx-react";
import mazeSizeOptions from "../../stores/options/mazeSizeOptions";
import SelectWithLabel from "./SelectWithLabel";

const MazeSizeSelector = observer(({config, state}) =>
    <SelectWithLabel
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

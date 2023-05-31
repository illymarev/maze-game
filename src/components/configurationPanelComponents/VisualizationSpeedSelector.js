import {observer} from "mobx-react";
import {visualizationSpeedOptions} from "../../stores/options/visualizationSpeedOptions";
import SelectWithLabel from "./SelectWithLabel";

const VisualizationSpeedSelector = observer(({state, config}) =>
    <SelectWithLabel
        id={'visualization-speed-selector'}
        labelId={'visualization-speed-selector-label'}
        labelText={'Visualization Speed'}
        disabled={state.visualizationInProgress}
        value={config.visualizationSpeed.id}
        onChangeFunction={e => config.setVisualizationSpeed(e.target.value)}
        options={visualizationSpeedOptions}
    />
);

export default VisualizationSpeedSelector;
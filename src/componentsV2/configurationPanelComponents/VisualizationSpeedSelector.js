import {observer} from "mobx-react";
import {visualizationSpeedOptions} from "../../storesV2/options/visualizationSpeedOptions";
import SelectWithInput from "./SelectWithInput";

const VisualizationSpeedSelector = observer(({state, config}) =>
    <SelectWithInput
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
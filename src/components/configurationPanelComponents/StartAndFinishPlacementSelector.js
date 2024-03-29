import {observer} from "mobx-react";
import {defaultStartAndFinishPlacementOptions} from "../../stores/options/defaultStartAndFinishPlacementOptions";
import SelectWithLabel from "./SelectWithLabel";

const StartAndFinishPlacementSelector = observer(({config, state}) =>
    <SelectWithLabel
        id={'start-and-finish-placement-selector'}
        labelId={'start-and-finish-placement-selector-label'}
        labelText={'Default Start/Finish Position'}
        disabled={state.visualizationInProgress}
        value={config.defaultStartAndFinishPlacement.id}
        onChangeFunction={e => config.setDefaultStartAndFinishPlacement(e.target.value)}
        options={defaultStartAndFinishPlacementOptions}
    />
);

export default StartAndFinishPlacementSelector;

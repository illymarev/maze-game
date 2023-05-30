import {observer} from "mobx-react";
import {defaultStartAndFinishPlacementOptions} from "../../storesV2/options/defaultStartAndFinishPlacementOptions";
import SelectWithInput from "./SelectWithInput";

const StartAndFinishPlacementSelector = observer(({config, state}) =>
    <SelectWithInput
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

import {observer} from "mobx-react";
import solvingAlgorithmOptions from "../../storesV2/options/solvingAlgorithmOptions";
import SelectWithLabel from "./SelectWithLabel";

const SolvingAlgorithmSelector = observer(({state, config}) =>
    <SelectWithLabel
        id={'solving-algorithm-selector'}
        labelId={'solving-algorithm-selector-label'}
        labelText={'Solving Algorithm'}
        disabled={state.visualizationInProgress}
        value={config.solvingAlgorithm.id}
        onChangeFunction={e => config.setSolvingAlgorithm(e.target.value)}
        options={solvingAlgorithmOptions}
    />
)

export default SolvingAlgorithmSelector;

import SelectWithInput from "./SelectWithInput";
import {observer} from "mobx-react";
import generationAlgorithmOptions from "../../storesV2/options/generationAlgorithmOptions";

const GenerationAlgorithmSelector = observer(({state, config}) =>
    <SelectWithInput
        id={'generation-algorithm-selector'}
        labelId={'generation-algorithm-selector-label'}
        labelText={'Generation Algorithm'}
        disabled={state.visualizationInProgress}
        value={config.generationAlgorithm.id}
        onChangeFunction={e => config.setGenerationAlgorithm(e.target.value)}
        options={generationAlgorithmOptions}
    />
);

export default GenerationAlgorithmSelector;
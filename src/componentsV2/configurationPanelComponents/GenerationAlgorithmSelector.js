import SelectWithLabel from "./SelectWithLabel";
import {observer} from "mobx-react";
import generationAlgorithmOptions from "../../storesV2/options/generationAlgorithmOptions";

const GenerationAlgorithmSelector = observer(({state, config}) =>
    <SelectWithLabel
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
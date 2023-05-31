import {Stack} from "@mui/material";
import {observer} from "mobx-react";
import GenerationAlgorithmSelector from "./configurationPanelComponents/GenerationAlgorithmSelector";
import SolvingAlgorithmSelector from "./configurationPanelComponents/SolvingAlgorithmSelector";
import VisualizationSpeedSelector from "./configurationPanelComponents/VisualizationSpeedSelector";
import StartAndFinishPlacementSelector from "./configurationPanelComponents/StartAndFinishPlacementSelector";
import MazeSizeSelector from "./configurationPanelComponents/MazeSizeSelector";
import GenerationButton from "./configurationPanelComponents/GenerationButton";
import SolvingButton from "./configurationPanelComponents/SolvingButton";
import MoveStartOrFinishButton from "./configurationPanelComponents/MoveStartOrFinishButton";

const ConfigurationPanel = observer(({rootStore}) => {
    const state = rootStore.stateStore
    const config = rootStore.configStore
    const controller = rootStore.controller

    return (
        <Stack width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'space-evenly'}>

            <GenerationButton state={state} controller={controller}/>

            <SolvingButton state={state} controller={controller}/>

            <GenerationAlgorithmSelector config={config} state={state}/>

            <SolvingAlgorithmSelector config={config} state={state}/>

            <VisualizationSpeedSelector config={config} state={state}/>

            <StartAndFinishPlacementSelector config={config} state={state}/>

            <MazeSizeSelector config={config} state={state}/>

            <MoveStartOrFinishButton state={state}/>

        </Stack>
    )
})

export default ConfigurationPanel;

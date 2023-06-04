import mazeSizeOptions from "./options/mazeSizeOptions";
import generationAlgorithmOptions from "./options/generationAlgorithmOptions";
import solvingAlgorithmOptions from "./options/solvingAlgorithmOptions";

import {fast, visualizationSpeedOptions} from './options/visualizationSpeedOptions'
import {
    defaultStartAndFinishPlacementOptions,
    longestShortestPathEdges
} from "./options/defaultStartAndFinishPlacementOptions";
import {makeAutoObservable} from "mobx";

class ConfigStore {
    mazeSize = mazeSizeOptions[0];
    visualizationSpeed = visualizationSpeedOptions[fast];
    generationAlgorithm = generationAlgorithmOptions[0];
    solvingAlgorithm = solvingAlgorithmOptions[0];
    defaultStartAndFinishPlacement = defaultStartAndFinishPlacementOptions[longestShortestPathEdges];

    constructor() {
        makeAutoObservable(this);
    };

    // ACTIONS
    setDefaultStartAndFinishPlacement(placementOptionId) {
        this.defaultStartAndFinishPlacement = defaultStartAndFinishPlacementOptions[placementOptionId];
    };

    setMazeSize(mazeSizeId) {
        this.mazeSize = mazeSizeOptions[mazeSizeId];
    };

    setVisualizationSpeed(visualizationSpeedOptionId) {
        this.visualizationSpeed = visualizationSpeedOptions[visualizationSpeedOptionId];
    };

    setGenerationAlgorithm(generationAlgorithmOptionId) {
        this.generationAlgorithm = generationAlgorithmOptions[generationAlgorithmOptionId];
    };

    setSolvingAlgorithm(solvingAlgorithmOptionId) {
        this.solvingAlgorithm = solvingAlgorithmOptions[solvingAlgorithmOptionId];
    };

    // COMPUTEDS
    get rows() {
        return this.mazeSize.rows;
    };

    get columns() {
        return this.mazeSize.columns;
    };

    get visualizationDelay() {
        return this.visualizationSpeed.delay;
    };

    get generationFunction() {
        return this.generationAlgorithm.relatedFunction;
    };

    get solvingFunction() {
        return this.solvingAlgorithm.relatedFunction;
    };

}

export default ConfigStore
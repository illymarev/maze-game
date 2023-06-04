import Controller from "./controller";

import ConfigStore from "./configStore";
import MazeStore from "./mazeStore";
import StateStore from "./stateStore";

class RootStore {
    constructor() {
        this.stateStore = new StateStore();
        this.configStore = new ConfigStore();
        this.mazeStore = new MazeStore();

        this.controller = new Controller(this);
        this.controller.createEmptyMaze();
    };
}

export default RootStore

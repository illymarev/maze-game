import Controller from "./controller";

import ConfigStore from "./configStore";
import MazeStore from "./mazeStore";
import StateStore from "./stateStore";

class RootStore {
    constructor() {
        // Initialize stores
        this.stateStore = new StateStore()
        this.configStore = new ConfigStore()
        this.mazeStore = new MazeStore()

        this.controller = new Controller(this) // Initialize the controller
        this.controller.createEmptyMaze()
    }
}

export default RootStore
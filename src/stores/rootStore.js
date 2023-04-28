import {GameConfigStore} from "./gameConfigStore";
import {MazeNodesStore} from "./mazeNodesStore";

export class RootStore {
    constructor() {
        this.config = new GameConfigStore(this)
        this.maze = new MazeNodesStore(this)
    }
}

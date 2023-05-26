// Controls all the complex logic involving multiple stores
class Controller {
    constructor(rootStore) {
        this.maze = rootStore.mazeStore
        this.config = rootStore.configStore
        this.state = rootStore.stateStore
    }

    createEmptyMaze() {
        this.maze.createEmptyNodes(this.config.rows, this.config.columns)
    }
}

export default Controller
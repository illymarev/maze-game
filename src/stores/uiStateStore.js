import {makeAutoObservable} from "mobx";

export class UiState {
    gameStore = null
    isMouseDown = false

    // TODO add loading progress

    constructor(gameStore) {
        makeAutoObservable(this, {
            gameStore: false
        })
        this.gameStore = gameStore
    }

    setIsMouseDown(bool) {
        this.isMouseDown = bool
    }
}
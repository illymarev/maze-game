import {noMovingItem} from "./options/movingItemOptions";
import {makeAutoObservable} from "mobx";
import {
    generationPending,
    generationInProgress,
    readyToSolve,
    movingStartAndFinish,
    gameInProgress,
    solvingInProgress,
    gameStateOptions
} from "./options/gameStateOptions"

// This is not a MobX store since it doesn't
class StateStore {
    movingItem = noMovingItem
    mouseDown = false
    gameState = gameStateOptions[generationPending]

    constructor() {
        makeAutoObservable(this, {
            // Both of these only impact the logic of allowing to apply certain actions, they don't influence the UI
            movingItem: false,
            mouseDown: false
        })
    }

    setMouseDown(bool) {
        this.mouseDown = bool
    }

    setMovingItem(item) {
        this.movingItem = item
    }

    // Actions

    setGameState(gameStateId) {
        this.gameState = gameStateOptions[gameStateId]
    }

    // Computeds

    get visualizationInProgress() {
        return [generationInProgress, solvingInProgress].includes(this.gameState.id)
    }

    get usersSolvingInputAllowed() {
        return [readyToSolve, gameInProgress].includes(this.gameState.id)
    }

    get movingStartAndFinishedAllowed() {
        return this.gameState.id === movingStartAndFinish
    }
}

export default StateStore
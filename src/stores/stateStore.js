import {makeAutoObservable} from "mobx";
import {
    generationPending,
    generationInProgress,
    readyToSolve,
    movingStartAndFinish,
    gameInProgress,
    solvingInProgress,
    gameStateOptions
} from "./options/gameStates"

export class StateStore {
    gameStore

    movableItem = null
    isMouseDown = false
    gameState = gameStateOptions[generationPending]

    constructor(gameStore) {
        makeAutoObservable(this, {
            gameStore: false
        })
        this.gameStore = gameStore
    }

    // Actions

    setGameState(gameStateId) {
        this.gameState = gameStateOptions[gameStateId]
    }

    setIsMouseDown(bool) {
        this.isMouseDown = bool
    }

    setMovableItem(item){
        this.movableItem = item
    }

    // Computeds

    get visualizationInProgress() {
        return [generationInProgress, solvingInProgress].includes(this.gameState.id)
    }

    get isUsersSolvingInputAllowed() {
        return [readyToSolve, gameInProgress].includes(this.gameState.id)
    }

    get isMovingStartAndFinishedAllowed() {
        return this.gameState.id === movingStartAndFinish
    }
}
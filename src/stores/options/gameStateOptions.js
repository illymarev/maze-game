// These are referenced in some stores & the controller, so create variables to avoid referencing by ID
export const generationPending = 0;
export const generationInProgress = 1;
export const readyToSolve = 2;
export const movingStartAndFinish = 3;
export const gameInProgress = 4;
export const solvingInProgress = 5;
export const finishedSolving = 6;

export const gameStateOptions = [
    {
        id: generationPending,
        title: 'Maze Generation Pending',
        description: 'Select the generation algorithm and click "generate" to start!'
    },
    {
        id: generationInProgress,
        title: 'Generation In Progress',
        description: 'Wait for the generation algorithm to finish before continuing.'
    },
    {
        id: readyToSolve,
        title: 'Ready To Start',
        description: 'Click the the "solve" button on top or start solving the maze yourself!'
    },
    {
        id: movingStartAndFinish,
        title: 'Moving Start And Finish',
        description: 'Drag the start and finish icons in order to change their placement'
    },
    {
        id: gameInProgress,
        title: 'Game In Progress',
        description: 'Continue playing or click the "solve" button if you need help!'
    },
    {
        id: solvingInProgress,
        title: 'Solving In Progress',
        description: 'Wait for the solving algorithm to finish before continuing.'
    },
    {
        id: finishedSolving,
        title: 'Finish! Maze Solved!',
        description: 'Nicely done! Click "generate" to continue with a new maze!'
    }
];
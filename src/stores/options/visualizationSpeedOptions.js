// These are referenced in the logic related to visualization, so create variables to avoid referencing by ID
export const slow = 0;
export const medium = 1;
export const fast = 2;
export const veryFast = 3;
export const immediate = 4;

export const visualizationSpeedOptions = [
    {
        id: slow,
        delay: 500,
        title: 'Slow'
    },
    {
        id: medium,
        delay: 100,
        title: 'Medium'
    },
    {
        id: fast,
        title: 'Fast' // No delay, uses the requestAnimationFrame
    },
    {
        id: veryFast,
        delay: 1.5,
        title: 'Very Fast'
    },
    {
        id: immediate,
        title: 'Immediate' // No delay, it does not visualize actions, only changes the whole maze at once
    }
];
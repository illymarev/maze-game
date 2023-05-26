// These are referenced in the logic related to visualization, so create variables to avoid referencing by ID
export const slow = 0
export const medium = 1
export const fast = 2
export const veryFast = 3
export const immediate = 4

export const visualizationSpeedOptions = [
    {
        id: slow,
        delay: 500,
        label: 'Slow'
    },
    {
        id: medium,
        delay: 100,
        label: 'Medium'
    },
    {
        id: fast,
        label: 'Fast' // No delay, uses the requestAnimationFrame
    },
    {
        id: veryFast,
        delay: 1.5,
        label: 'Very Fast'
    },
    {
        id: immediate,
        label: 'Immediate' // No delay, it does not visualize actions, only changes the whole maze at once
    }
]
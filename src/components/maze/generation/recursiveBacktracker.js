import {delay, determineDirection, randomizedDirections} from "./helpers";

// TODO rename
const recursiveBacktracking = (nodesMatrixRef, generationActions) => {
    const visitedNodes = []
    console.log('Ran once')
    recursiveBacktrackingHelper(nodesMatrixRef, visitedNodes, [0, 0], generationActions)
}

const recursiveBacktrackingHelper = async (nodesMatrixRef, visitedStack, nodeCoordinates, actions) => {
    actions.markCurrent(nodeCoordinates)
    await delay(0)

    if (!nodesMatrixRef.current[nodeCoordinates[0]][nodeCoordinates[1]].visited) {
        actions.markVisited(nodeCoordinates)
        visitedStack.push(nodeCoordinates)
    }

    let nextNodeDetails = {}
    const directions = randomizedDirections()

    for (const direction of directions) {
        const [nextX, nextY] = direction[1](...nodeCoordinates)
        const nextNodeVisited = nodesMatrixRef.current[nextX]?.[nextY]?.visited
        if (nextNodeVisited === false) {
            nextNodeDetails = {'x': nextX, 'y': nextY, 'path': direction[0]}
            break
        }
    }

    if (Object.keys(nextNodeDetails).length > 0) {
        actions.markPath(nodeCoordinates, nextNodeDetails.path)
        await recursiveBacktrackingHelper(nodesMatrixRef, visitedStack,
            [nextNodeDetails['x'], nextNodeDetails['y']], actions)
    } else {
        if (visitedStack.length > 1) {
            /* Removed the current node from the stack */
            visitedStack.pop()

            /* Get the last node in the stack */
            const nextNodeCoordinates = visitedStack[visitedStack.length - 1]
            actions.markPath(nodeCoordinates, determineDirection(nodeCoordinates, nextNodeCoordinates))
            /* Recursively call the function with the last node in the stack */
            await recursiveBacktrackingHelper(nodesMatrixRef, visitedStack, nextNodeCoordinates, actions)
        } else {
            /* The maze is complete, the first node is reached again */
            actions.clearCurrent()
        }
    }
}

export default recursiveBacktracking


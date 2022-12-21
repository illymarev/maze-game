const Node = ({data}) => {
    // It looks like every node is rerendered each time. Take a look, not sure whether it's true
    const nodeStyle = {}
    let nodeText = ''


    if (data.current) {
        nodeStyle['background'] = "blue"
    }


    if (data.start) {
        // TODO uncomment later
        // nodeText = 'START'
        nodeStyle['color'] = 'green'
    }

    if (data.end) {
        // TODO remove later, keep only for debugging purposes
        // nodeText = 'FINISH'
        nodeStyle['color'] = 'orange'
    }

    const validPathways = []
    for (const [path, available] of Object.entries(data.pathways)) {
        if (available) validPathways.push(path)
    }
    // TODO uncomment later
    nodeText = validPathways.join(' ')
    const pathwayClasses = validPathways.join(' ')
    return <span className={`matrixNode ${pathwayClasses}`} style={nodeStyle}>{nodeText}</span>
}

export default Node
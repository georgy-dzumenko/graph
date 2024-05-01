const parseEdgeKey = (edgeKey) => {
    return typeof edgeKey === 'string' ? edgeKey.split('=>') : []
}

export default parseEdgeKey
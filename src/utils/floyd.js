import { useSelector } from 'react-redux'
import getGraph from '@features/graph/getGraph'

const useFloydWarshall = () => {
    const { vertexes, adjMatrix } = useSelector(getGraph)

    return (startVertexKey, endVertexKey) => _floydWarshall(vertexes, adjMatrix, startVertexKey, endVertexKey)
}

function _floydWarshall(vertexes, matrix, startVertexKey, endVertexKey) {
    console.log('matrix', vertexes, matrix)
    // Initialize distance matrix and next matrix
    const startVertex = vertexes.find(({ vertexKey }) => startVertexKey === vertexKey)
    const endVertex = vertexes.find(({ vertexKey }) => endVertexKey === vertexKey)

    let n = matrix.length
    let distance = []
    let next = []
    for (let i = 0; i < n; i++) {
        distance.push([])
        next.push([])
        for (let j = 0; j < n; j++) {
            distance[i].push(matrix[i][j].cost)
            next[i].push(j)
        }
    }

    // Apply Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (distance[i][j] > distance[i][k] + distance[k][j]) {
                    distance[i][j] = distance[i][k] + distance[k][j]
                    next[i][j] = next[i][k]
                }
            }
        }
    }

    // Reconstruct path
    let path = []
    let u = startVertex.index
    let v = endVertex.index
    console.log(next, u, v)
    while (u !== v) {
        console.log(next?.[u]?.[v])
        if (!!next?.[u]?.[v]) {
            path.push(u)
            u = next[u][v]
        }
    }
    path.push(v)

    return path
}

export default useFloydWarshall

import { useSelector } from 'react-redux'
import getGraph from '@features/graph/getGraph'

const useDijkstra = () => {
    const { vertexes, adjMatrix } = useSelector(getGraph)

    return (startVertexKey, endVertexKey) => dijkstra(vertexes, adjMatrix, startVertexKey, endVertexKey)
}

function dijkstra(vertices, links, startVertexKey, endVertexKey) {
    // Функція для знаходження індексу вершини за ключем
    function findVertexIndexByKey(key) {
        return vertices.findIndex((vertex) => vertex.vertexKey === key)
    }

    const startVertexIndex = findVertexIndexByKey(startVertexKey)
    const endVertexIndex = findVertexIndexByKey(endVertexKey)

    if (startVertexIndex === -1 || endVertexIndex === -1) {
        return [] // Повертаємо пустий масив, якщо одна з вершин не знайдена
    }

    const queue = []
    const distances = Array(vertices.length).fill(Number.POSITIVE_INFINITY)
    const previousVertices = Array(vertices.length).fill(null)

    distances[startVertexIndex] = 0
    queue.push(startVertexIndex)

    while (queue.length > 0) {
        const currentVertexIndex = queue.shift()

        if (currentVertexIndex === endVertexIndex) {
            break // Якщо досягнуто кінцеву вершину, завершуємо цикл
        }

        for (let i = 0; i < vertices.length; i++) {
            const link = links[currentVertexIndex][i]
            if (link && link.startVertex === vertices[currentVertexIndex].vertexKey) {
                const neighborIndex = i
                console.log(link)
                const distanceToNeighbor = distances[currentVertexIndex] + link.cost

                if (distanceToNeighbor < distances[neighborIndex]) {
                    distances[neighborIndex] = distanceToNeighbor
                    previousVertices[neighborIndex] = currentVertexIndex
                    queue.push(neighborIndex)
                }
            }
        }
    }

    // Побудова шляху з кінцевої вершини до початкової
    const shortestPath = []
    let currentVertexIndex = endVertexIndex
    while (currentVertexIndex !== null) {
        shortestPath.unshift(vertices[currentVertexIndex])
        currentVertexIndex = previousVertices[currentVertexIndex]
    }

    return shortestPath
}

export default useDijkstra

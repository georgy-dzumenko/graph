import { useSelector } from 'react-redux'
import getGraph from '@features/graph/getGraph'

const useFloydWarshall = () => {
    const { vertexes, adjMatrix } = useSelector(getGraph)

    return (startVertexKey, endVertexKey) => floydWarshall(vertexes, adjMatrix, startVertexKey, endVertexKey)
}

function floydWarshall(vertexes, matrix, startVertexKey, endVertexKey) {
    const n = matrix.length;
    
    console.log('matrix', matrix)


    console.log('endVertexKey', startVertexKey, endVertexKey)

    const startVertex = vertexes.find(({vertexKey}) => vertexKey === startVertexKey)
    const endVertex = vertexes.find(({vertexKey}) => vertexKey === endVertexKey)

    console.log('result', startVertex, endVertex)

    // Створюємо матрицю найкоротших відстаней та ініціалізуємо її відстанями між вершинами
    
    
    let dist = [];
    console.log('dist', dist)
    for (let i = 0; i < n; i++) {
        dist[i] = [];
        for (let j = 0; j < n; j++) {
            if (i === j) {
                dist[i][j] = 0;
            } else {
                dist[i][j] = Infinity;
            }
        }
    }

    console.log('dist1', dist)
    
    // Заповнюємо початкові відстані з матриці зв'язків
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] !== undefined) {
                dist[i][j] = matrix[i][j].cost;
            }
        }
    }
    
    console.log('dist2', dist)

    // Виконуємо алгоритм Флойда-Уоршелла
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    console.log('dist3', dist[1][2])

    // Знаходимо шлях від startVertex до endVertex
    let path = [startVertex.index];
    let currentVertex = startVertex.index;

    while (currentVertex !== endVertex.index) {
        // console.log('currentVertex1', currentVertex, endVertex.index)
        let minDist = Infinity;
        let nextVertex = null;
        for (let i = 0; i < n; i++) {
            if (dist[currentVertex][i] < minDist) {
                minDist = dist[currentVertex][i];
                nextVertex = i;
            }
        }

        path.push(nextVertex);
        currentVertex = nextVertex;
    }
    
    return path;
}

export default useFloydWarshall

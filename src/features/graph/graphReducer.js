import { createSlice } from '@reduxjs/toolkit'
import createEdgeKey from '@utils/createEdgeKey'

const initialState = {
    currentEdge: null,
    edges: [],
    vertexes: [],
    adjMatrix: [],
    selectedVertexes: []
}

export const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {
        startCurrentEdge: (state, action) => {
            state.currentEdge = { startVertex: action.payload }
        },
        endCurrentEdge: (state, action) => {
            state.edges = [
                ...state.edges,
                {
                    startVertex: state.currentEdge.startVertex,
                    endVertex: action.payload,
                    edgeKey: createEdgeKey(state.currentEdge.startVertex, action.payload),
                    cost: 1
                }
            ]
        },
        changeEdgeCost: (state, action) => {
            state.edges = state.edges.map((el) => {
                if (el.edgeKey === action.payload.edgeKey) {
                    return { ...el, cost: action.payload.cost }
                } else {
                    return el
                }
            })
        },
        destroyEdge: (state, action) => {
            state.edges = state.edges.filter((el, index) => index !== +action.payload)
        },
        destroyEdgeByKey: (state, action) => {
            state.edges = state.edges.filter(({ edgeKey }) => edgeKey !== action.payload)
        },
        destroyVertex: (state, action) => {
            state.vertexes = state.vertexes.filter((v) => action.payload !== v.vertexKey)
            state.edges = state.edges.filter((el, index) => el.startVertex !== action.payload && el.endVertex !== action.payload)

            const sortedVertexes = state.vertexes.sort((a, b) => new Date(a) - new Date(b))

            state.vertexes = sortedVertexes.map((el, index) => ({ ...el, index }))
        },
        renameVertex: (state, action) => {
            state.vertexes = state.vertexes.map((el) => {
                if (action.payload.vertexKey === el.vertexKey) {
                    return {
                        ...el,
                        name: action.payload.name
                    }
                }
                return el
            })
        },
        cancelCurrentEdge: (state) => {
            state.currentEdge = null
        },
        createEdge: (state, action) => {
            state.edges = [
                ...state.edges,
                {
                    startVertex: action.payload.startVertexKey,
                    endVertex: action.payload.endVertexKey,
                    edgeKey: createEdgeKey(action.payload.startVertexKey, action.payload.endVertexKey),
                    cost: action.payload.cost
                }
            ]
        },
        setEdgeCost: (state, action) => {
            state.edges = state.edges.map((el) => {
                if (el.edgeKey === action.payload.edgeKey) {
                    return { ...el, cost: action.payload.cost }
                } else {
                    return el
                }
            })
        },
        createVertex: (state, action) => {
            state.vertexes = [
                ...state.vertexes,
                {
                    coords: action.payload.coords,
                    name: action.payload.name,
                    vertexKey: action.payload.vertexKey
                }
            ]

            const sortedVertexes = state.vertexes.sort((a, b) => new Date(a) - new Date(b))

            state.vertexes = sortedVertexes.map((el, index) => ({ ...el, index }))
        },
        generateMatrix: (state) => {
            const sortedVertexes = state.vertexes.sort((a, b) => new Date(a) - new Date(b))

            let adjMatrix = sortedVertexes.map(() => [])

            for (let i = 0; i < sortedVertexes.length; i++) {
                for (let j = 0; j < sortedVertexes.length; j++) {
                    adjMatrix[i][j] = state.edges.find(
                        (edges) => edges.startVertex === sortedVertexes[i].vertexKey && edges.endVertex === sortedVertexes[j].vertexKey
                    ) || { cost: 0 }
                }
            }

            state.adjMatrix = adjMatrix
        },
        selectVertexes: (state, action) => {
            state.selectedVertexes = state.vertexes.filter(({ coords }) => {
                let xFit
                let yFit

                if (action.payload.startPoint.x < action.payload.endPoint.x) {
                    xFit = coords.x > action.payload.startPoint.x && coords.x < action.payload.endPoint.x
                } else {
                    xFit = coords.x < action.payload.startPoint.x && coords.x > action.payload.endPoint.x
                }

                if (action.payload.startPoint.y < action.payload.endPoint.y) {
                    yFit = coords.y > action.payload.startPoint.y && coords.y < action.payload.endPoint.y
                } else {
                    yFit = coords.y < action.payload.startPoint.y && coords.y > action.payload.endPoint.y
                }

                return xFit && yFit
            })
        },
        cleanSelectedVertexes: (state) => {
            state.selectedVertexes = []
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    selectVertexes,
    generateMatrix,
    changeEdgeCost,
    renameVertex,
    createEdge,
    createVertex,
    startCurrentEdge,
    endCurrentEdge,
    cancelCurrentEdge,
    destroyEdge,
    destroyVertex,
    cleanSelectedVertexes,
    setEdgeCost,
    destroyEdgeByKey
} = graphSlice.actions

export default graphSlice.reducer

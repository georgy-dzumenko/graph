import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentEdge: null,
    edges: [],
    vertexes: []
}

export const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {
        startCurrentEdge: (state, action) => {
            console.log(action, action.payload)
            state.currentEdge = { startVertex: action.payload }
        },
        endCurrentEdge: (state, action) => {
            state.edges = [
                ...state.edges,
                {
                    startVertex: state.currentEdge.startVertex,
                    endVertex: action.payload,
                    cost: 1
                }
            ]
        },
        cancelCurrentEdge: (state) => {
            state.currentEdge = null
        },
        createEdge: (state, action) => {
            state.edges = [
                ...state.edges,
                {
                    startVertex: vertexes.find(({ vertexKey }) => vertexKey === action.payload.startVertexKey),
                    endVertex: vertexes.find(({ vertexKey }) => vertexKey === action.payload.endVertexKey),
                    cost: action.payload.cost
                }
            ]
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
        }
    }
})

// Action creators are generated for each case reducer function
export const { createEdge, createVertex, startCurrentEdge, endCurrentEdge, cancelCurrentEdge } = graphSlice.actions

export default graphSlice.reducer

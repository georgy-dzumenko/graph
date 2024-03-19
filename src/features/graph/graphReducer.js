import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentEdge: null,
    edges: [],
    vertexes: [],
    //context menu data:
    isContextMenuOpened: false,
    contextMenu: {}
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
        destroyEdge: (state, action) => {
            state.edges = state.edges.filter((el, index) => index !== +action.payload)
        },
        destroyConnection: (state, action) => {
            state.vertexes = state.vertexes.filter((v) => action.payload !== v.vertexKey)
            state.edges = state.edges.filter((el, index) => el.startVertex !== action.payload && el.endVertex !== action.payload)
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
        },
        openContextMenu: (state, action) => {
            state.contextMenu = action.payload
            state.isContextMenuOpened = true
        },
        closeContextMenu: (state, action) => {
            state.isContextMenuOpened = false
            state.contextMenu = {}
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    openContextMenu,
    closeContextMenu,
    createEdge,
    createVertex,
    startCurrentEdge,
    endCurrentEdge,
    cancelCurrentEdge,
    destroyEdge,
    destroyConnection
} = graphSlice.actions

export default graphSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isContextMenuOpened: false,
    contextMenu: {},
    graphKey: '',
    modal: {},
    selectVertexMethod: null,
    isModalOpened: false,
    hoverData: {
        fromVertex: null,
        toVertex: null,
    },
    language: 'ua',
    demonstrateList: []
}

export const interfaceSlice = createSlice({
    name: 'interface',
    initialState,
    reducers: {
        selectGraphKey: (state, action) => {
            state.graphKey = action.payload
        },
        openContextMenu: (state, action) => {
            state.contextMenu = action.payload
            state.isContextMenuOpened = true
        },
        closeContextMenu: (state, action) => {
            state.isContextMenuOpened = false
            state.contextMenu = {}
        },
        openModal: (state, action) => {
            state.modal = action.payload
            state.isModalOpened = true
        },
        closeModal: (state, action) => {
            state.isModalOpened = false
            state.modal = {}
        },
        setSelectedVertexMethod: (state, action) => {
            state.selectVertexMethod = action.payload
        },
        setHoverData: (state, action) => {
            state.hoverData = action.payload
        },
        setDemonstrateList: (state, action) => {
            state.demonstrateList = action.payload
        },
        setLanguage: (state, action) => {
            state.language = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setLanguage, openContextMenu, closeContextMenu, closeModal, openModal, setDemonstrateList, setSelectedVertexMethod, setHoverData, selectGraphKey } = interfaceSlice.actions

export default interfaceSlice.reducer

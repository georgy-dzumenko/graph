import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isContextMenuOpened: false,
    contextMenu: {},
    modal: {},
    selectVertexMethod: null,
    isModalOpened: false
}

export const interfaceSlice = createSlice({
    name: 'interface',
    initialState,
    reducers: {
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
        }
    }
})

// Action creators are generated for each case reducer function
export const { openContextMenu, closeContextMenu, closeModal, openModal, setSelectedVertexMethod } = interfaceSlice.actions

export default interfaceSlice.reducer

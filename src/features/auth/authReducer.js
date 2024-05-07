import { createSlice } from '@reduxjs/toolkit'

export const auth = createSlice({
  name: 'auth',
  initialState: {
    data: {}
  },
  reducers: {
    setAuth: (state, action) => {
        state.data = action.payload;
    },
    logout: (state, action) => {
        state.data = {};
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuth, logout } = auth.actions

export default auth.reducer

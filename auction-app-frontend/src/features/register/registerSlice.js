import { createSlice } from '@reduxjs/toolkit'

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        userRegistered: false,
    },
    reducers: {
        setRegistered: (state, action) => {
            state.userRegistered = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setRegistered } = registerSlice.actions

export default registerSlice.reducer
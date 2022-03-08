import { createSlice } from '@reduxjs/toolkit';

export const notFoundSlice = createSlice({
    name: 'notFoundHandler',
    initialState: {
        notFoundError: false,
    },
    reducers: {
        setNotFoundError: (state, action) => {
            state.notFoundError = action.payload;
        }
    },
});

export const { setNotFoundError } = notFoundSlice.actions;

export default notFoundSlice.reducer;
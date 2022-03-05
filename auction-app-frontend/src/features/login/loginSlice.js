import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userLoggedIn: false,
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.userLoggedIn = action.payload;
        }
    },
});

export const { setLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;
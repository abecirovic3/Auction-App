import { createSlice } from '@reduxjs/toolkit';

export const routeHistorySlice = createSlice({
    name: 'routeHistory',
    initialState: {
        routes: ['', '']
    },
    reducers: {
        setLastRoute: (state, action) => {
            state.routes = action.payload;
        }
    }
});

export const { setLastRoute } = routeHistorySlice.actions;

export default routeHistorySlice.reducer;
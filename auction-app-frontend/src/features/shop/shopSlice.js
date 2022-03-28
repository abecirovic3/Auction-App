import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        products: [],
        page: 0,
        isLastPage: false,
        gridItemWidth: 4
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setIsLastPage: (state, action) => {
            state.isLastPage = action.payload
        },
        setGridItemWidth: (state, action) => {
            state.gridItemWidth = action.payload
        }
    },
});

export const {
    setProducts,
    setPage,
    setIsLastPage,
    setGridItemWidth
} = shopSlice.actions;

export default shopSlice.reducer;
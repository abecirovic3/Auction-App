import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        products: [],
        page: 0,
        isLastPage: false,
        gridItemWidth: 4,
        errorAlerts: [],
        searchSuggestion: null
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
        },
        setErrorAlerts: (state, action) => {
            state.errorAlerts = action.payload
        },
        setSearchSuggestion: (state, action) => {
            state.searchSuggestion = action.payload
        }
    },
});

export const {
    setProducts,
    setPage,
    setIsLastPage,
    setGridItemWidth,
    setErrorAlerts,
    setSearchSuggestion
} = shopSlice.actions;

export default shopSlice.reducer;
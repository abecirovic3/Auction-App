import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        filters: {
            minPrice: null,
            maxPrice: null,
            search: null
        },
        categories: [],
        products: {
            data: [],
            page: 0,
            isLastPage: false
        },
        disableFilters: false
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setProductsData: (state, action) => {
            state.products.data = action.payload
        },
        setProductsPage: (state, action) => {
            state.products.page = action.payload
        },
        setProductsIsLastPage: (state, action) => {
            state.products.isLastPage = action.payload
        },
        setDisableFilters: (state, action) => {
            state.disableFilters = action.payload
        }
    },
});

export const {
    setFilters,
    setCategories,
    setProducts,
    setProductsData,
    setProductsPage,
    setProductsIsLastPage,
    setDisableFilters
} = shopSlice.actions;

export default shopSlice.reducer;
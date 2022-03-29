import { createSlice } from '@reduxjs/toolkit';

export const productFiltersSlice = createSlice({
    name: 'productFilters',
    initialState: {
        filters: {
            minPrice: null,
            maxPrice: null,
            subCategories: {},
            search: null
        },
        topLevelCategories: {},
        disableFilters: false
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload
        },
        setTopLevelCategories: (state, action) => {
            state.topLevelCategories = action.payload
        },
        setSubCategories: (state, action) => {
            state.filters.subCategories = action.payload
        },
        setDisableFilters: (state, action) => {
            state.disableFilters = action.payload
        },
        setMinPrice: (state, action) => {
            state.filters.minPrice = action.payload
        },
        setMaxPrice: (state, action) => {
            state.filters.maxPrice = action.payload
        },
        setPriceRange: (state, action) => {
            state.filters.minPrice = action.payload[0]
            state.filters.maxPrice = action.payload[1]
        }
    },
});

export const {
    setFilters,
    setTopLevelCategories,
    setSubCategories,
    setDisableFilters,
    setMinPrice,
    setMaxPrice,
    setPriceRange
} = productFiltersSlice.actions;

export default productFiltersSlice.reducer;
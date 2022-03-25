import { createSlice } from '@reduxjs/toolkit';

export const productFiltersSlice = createSlice({
    name: 'productFilters',
    initialState: {
        filters: {
            minPrice: null,
            maxPrice: null,
            topLevelCategories: {},
            subCategories: {},
            search: null
        },
        disableFilters: false
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload
        },
        setTopLevelCategories: (state, action) => {
            state.filters.topLevelCategories = action.payload
        },
        setSubCategories: (state, action) => {
            state.filters.subCategories = action.payload
        },
        setDisableFilters: (state, action) => {
            state.disableFilters = action.payload
        }
    },
});

export const {
    setFilters,
    setTopLevelCategories,
    setSubCategories,
    setDisableFilters } = productFiltersSlice.actions;

export default productFiltersSlice.reducer;
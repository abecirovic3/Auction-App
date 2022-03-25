import { createSlice } from '@reduxjs/toolkit';

export const productFiltersSlice = createSlice({
    name: 'productFilters',
    initialState: {
        filters: {
            minPrice: null,
            maxPrice: null,
            categories: null,
            search: null
        },
        disableFilters: false
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload
        },
        setDisableFilters: (state, action) => {
            state.disableFilters = action.payload
        }
    },
});

export const { setFilters, setDisableFilters } = productFiltersSlice.actions;

export default productFiltersSlice.reducer;
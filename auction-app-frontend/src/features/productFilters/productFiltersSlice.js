import { createSlice } from '@reduxjs/toolkit';

export const productFiltersSlice = createSlice({
    name: 'productFilters',
    initialState: {
        filters: {
            minPrice: null,
            maxPrice: null,
            subCategories: {},
        },
        sort: {
            sortKey: null,
            sortDirection: null
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
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setSortKey: (state, action) => {
            state.sort.sortKey = action.payload;
        },
        setSortDirection: (state, action) => {
            state.sort.sortDirection = action.payload;
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
    setPriceRange,
    setSort,
    setSortKey,
    setSortDirection
} = productFiltersSlice.actions;

export default productFiltersSlice.reducer;
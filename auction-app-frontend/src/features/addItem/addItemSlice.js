import { createSlice } from '@reduxjs/toolkit';

export const addItemSlice = createSlice({
    name: 'addItem',
    initialState: {
        name: '',
        description: '',
        category: '',
        subCategory: '',
        startPrice: '',
        startDate: null,
        endDate: null,
        imageData: {
            uploaded: true,
            images: []
        },
        imageDeleteInProgress: false,
        address: '',
        city: '',
        zipCode: '',
        country: ''
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSubCategory: (state, action) => {
            state.subCategory = action.payload;
        },
        setStartPrice: (state, action) => {
            state.startPrice = action.payload;
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },
        setImageData: (state, action) => {
            state.imageData = action.payload;
        },
        setImages: (state, action) => {
            state.imageData.images = action.payload;
        },
        setImageDeleteInProgress: (state, action) => {
            state.imageDeleteInProgress = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setZipCode: (state, action) => {
            state.zipCode = action.payload;
        },
        setCountry: (state, action) => {
            state.country = action.payload;
        },
    }
});

export const {
    setName,
    setDescription,
    setCategory,
    setSubCategory,
    setStartPrice,
    setStartDate,
    setEndDate,
    setImageData,
    setImages,
    setImageDeleteInProgress,
    setAddress,
    setCity,
    setZipCode,
    setCountry
} = addItemSlice.actions;

export default addItemSlice.reducer;
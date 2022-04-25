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
        country: '',
        userCard: {
            name: '',
            number: '',
            expirationMonth: '',
            expirationYear: '',
            cvc: ''
        },
        errorAlerts: []
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
        setErrorAlerts: (state, action) => {
            state.errorAlerts = action.payload;
        },
        setAddItemInitial: (state) => {
            state.name = '';
            state.description = '';
            state.category = '';
            state.subCategory = '';
            state.startPrice = '';
            state.startDate = null;
            state.endDate = null;
            state.imageData = {
                uploaded: true,
                images: []
            };
            state.imageDeleteInProgress = false;
            state.address = '';
            state.city = '';
            state.zipCode = '';
            state.country = '';
            state.errorAlerts = [];
            state.userCard = {
                name: '',
                number: '',
                expirationMonth: '',
                expirationYear: '',
                cvc: ''
            };
        },
        setUserCard: (state, action) => {
            state.userCard = action.payload;
        },
        setUserCardName: (state, action) => {
            state.userCard.name = action.payload;
        },
        setUserCardNumber: (state, action) => {
            state.userCard.number = action.payload;
        },
        setUserCardExpirationMonth: (state, action) => {
            state.userCard.expirationMonth = action.payload;
        },
        setUserCardExpirationYear: (state, action) => {
            state.userCard.expirationYear = action.payload;
        },
        setUserCardCvc: (state, action) => {
            state.userCard.cvc = action.payload;
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
    setCountry,
    setAddItemInitial,
    setErrorAlerts,
    setUserCard,
    setUserCardName,
    setUserCardNumber,
    setUserCardExpirationMonth,
    setUserCardExpirationYear,
    setUserCardCvc
} = addItemSlice.actions;

export default addItemSlice.reducer;
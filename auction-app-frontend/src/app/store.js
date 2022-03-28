import { configureStore } from '@reduxjs/toolkit'
import registerReducer from 'features/register/registerSlice'
import loginReducer from 'features/login/loginSlice'
import notFoundHandlerReducer from 'features/notFounHandler/notFoundSlice'
import productFiltersReducer from 'features/productFilters/productFiltersSlice';
import shopReducer from 'features/shop/shopSlice';

export default configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        notFoundHandler: notFoundHandlerReducer,
        productFilters: productFiltersReducer,
        shop: shopReducer
    },
});
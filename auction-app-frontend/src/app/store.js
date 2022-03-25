import { configureStore } from '@reduxjs/toolkit'
import registerReducer from 'features/register/registerSlice'
import loginReducer from 'features/login/loginSlice'
import notFoundHandlerReducer from 'features/notFounHandler/notFoundSlice'
import productFiltersReducer from 'features/productFilters/productFiltersSlice';

export default configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        notFoundHandler: notFoundHandlerReducer,
        productFilters: productFiltersReducer
    },
});
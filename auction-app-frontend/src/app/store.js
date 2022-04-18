import { configureStore } from '@reduxjs/toolkit'
import registerReducer from 'features/register/registerSlice'
import loginReducer from 'features/login/loginSlice'
import notFoundHandlerReducer from 'features/notFounHandler/notFoundSlice'
import productFiltersReducer from 'features/productFilters/productFiltersSlice';
import shopReducer from 'features/shop/shopSlice';
import categoryReducer from 'features/category/categorySlice';
import addItemReducer from 'features/addItem/addItemSlice';
import routeHistoryReducer from 'features/routeHistory/routeHistorySlice';

export default configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        notFoundHandler: notFoundHandlerReducer,
        productFilters: productFiltersReducer,
        shop: shopReducer,
        category: categoryReducer,
        addItem: addItemReducer,
        routeHistory: routeHistoryReducer,
    },
});
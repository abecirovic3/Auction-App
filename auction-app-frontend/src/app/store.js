import { configureStore } from '@reduxjs/toolkit'
import registerReducer from '../features/register/registerSlice'

export default configureStore({
    reducer: {
        register: registerReducer,
    },
});
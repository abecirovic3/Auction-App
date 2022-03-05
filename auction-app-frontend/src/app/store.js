import { configureStore } from '@reduxjs/toolkit'
import registerReducer from '../features/register/registerSlice'
import loginReducer from '../features/login/loginSlice'

export default configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
    },
});
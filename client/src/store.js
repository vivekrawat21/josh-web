import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import cartReducer from './features/cart/cartSlice.js';
import courseReducer from './features/course/courseSlice.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        course: courseReducer
    },
});
export default store;
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import cartReducer from './features/cart/cartSlice.js';
import bundleReducer from './features/bundles/BundleSlice.js'
import courseReducer from './features/courses/courseSlice.js';
import mentorReducer from './features/mentors/mentorSlice.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        bundle: bundleReducer,
        course: courseReducer,
        mentor: mentorReducer,
        
    },
});
export default store;
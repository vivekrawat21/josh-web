import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        addItems: (state, action) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart.pop();
        },
        clearCart: (state, action) => {
            state.cart.length = 0;
        }
    }
})

export const { addItems, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
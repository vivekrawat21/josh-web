import { createSlice } from "@reduxjs/toolkit";

const bundleSlice = createSlice({
    name: "bundle",
    initialState: {
        bundles: [],
    },
    reducers: {
        setBundle: (state, action) => {
            state.bundles.push(action.payload);
        },
    },
});

export const { setBundle } = bundleSlice.actions;
export default bundleSlice.reducer;

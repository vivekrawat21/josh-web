import { createSlice } from "@reduxjs/toolkit";

const bundleSlice = createSlice({
    name: "bundles",
    initialState: {
        course: [],
    },
    reducers: {
        setBundles: (state, action) => {
            state.course.push(action.payload);
        },
    },
});

export const { setBundles } = bundleSlice.actions;
export default bundleSlice.reducer;

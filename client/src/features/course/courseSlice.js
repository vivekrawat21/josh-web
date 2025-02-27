import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        course: [],
    },
    reducers: {
        setCourses: (state, action) => {
            state.course.push(action.payload);
        },
    },
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;

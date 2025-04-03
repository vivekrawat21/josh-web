import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        courses: [],
    },
    reducers: {
        addCourse: (state, action) => {
            state.courses.push(action.payload);
        },
        addTrendingCourses: (state, action) => {
            state.courses = action.payload;
        },
    },
});

export const { addCourse, addTrendingCourses } = courseSlice.actions;
export default courseSlice.reducer;

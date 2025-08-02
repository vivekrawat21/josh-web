import { createSlice } from "@reduxjs/toolkit";

const mentorSlice = createSlice({
    name: "mentor",
    initialState: {
        mentors: [],
    },
    reducers: {
        addMentors: (state, action) => {
            state.mentors.push(action.payload);
        },
       
    },
});

export const { addMentors } = mentorSlice.actions;
export default mentorSlice.reducer;

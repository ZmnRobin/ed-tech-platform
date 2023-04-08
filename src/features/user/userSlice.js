import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignment: undefined,
    quiz: undefined,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignment= action.payload;
        },
        addQuiz: (state,action) => {
            state.quiz = action.payload;
        },
    },
});

export const {addAssignment,addQuiz } = userSlice.actions;
export default userSlice.reducer;

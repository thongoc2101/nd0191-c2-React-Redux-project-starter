import { createSlice } from "@reduxjs/toolkit";
import { QuestionActions } from "../actions/question.action";

const initialState = {
    questions: null,
};

export const QuestionSlice = createSlice({
    name: 'questions',
    initialState: initialState,
    reducers: {
        setAnsweredUser: (state, action) => {
            const questionItem = Object.values(state.questions).find(user => user.id === action.payload.id);
            questionItem[action.payload.answer].votes.push(action.payload.id);

            state.questions = {
                ...state.questions,
                [questionItem.id]: questionItem
            }
        }
    },
    extraReducers: (builder) => {
        // Add extra reducers here
        builder.addCase(QuestionActions.getQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
        });
    }
});

export const { setAnsweredUser } = QuestionSlice.actions;
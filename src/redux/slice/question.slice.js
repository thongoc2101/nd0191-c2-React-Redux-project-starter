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
            const qid = action.payload.id;
            const answer = action.payload.answer;
            const authedUser = action.payload.authedUser;

            state.questions = {
                ...state.questions,
                [qid]: {
                  ...state.questions[qid],
                  [answer]: {
                    ...state.questions[qid][answer],
                    votes: state.questions[qid][answer].votes.push(authedUser)
                  }
                }
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
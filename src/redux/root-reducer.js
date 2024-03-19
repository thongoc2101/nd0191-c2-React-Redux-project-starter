import { combineReducers } from "@reduxjs/toolkit";
import { AuthSlice } from "./slice/auth.slice";
import { QuestionSlice } from "./slice/question.slice";

export const rootReducer = combineReducers({
    auth: AuthSlice.reducer,
    questions: QuestionSlice.reducer,
});
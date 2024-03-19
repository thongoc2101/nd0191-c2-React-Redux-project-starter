import { createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion } from "../../api/_DATA";

const name = 'question';
export const QuestionActions = {
    addQuestion: createAsyncThunk(`${name}/addQuestion`,
        async (param) => {
            return await _saveQuestion(param);
        }),

    getQuestions: createAsyncThunk(`${name}/getQuestions`,
        async () => {
            return await _getQuestions();
        })
}
import { createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../../api/_DATA";

const name = 'auth';
export const AuthActions = {
    getUsers: createAsyncThunk(`${name}/getUsers`,
        async () => {
            return await _getUsers();
        })
}
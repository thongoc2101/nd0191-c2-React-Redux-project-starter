import { createSlice } from "@reduxjs/toolkit";
import { AuthActions } from "../actions/auth.action";

const initialState = {
    userInfo: null,
    users: null,
    isLogin: false
};

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            const user = Object.values(state.users).find(user => user.id === action.payload.username && user.password === action.payload.password);
            if (user) {
                state.isLogin = true;
                state.userInfo = user;
            } else {
                state.isLogin = false;
                state.userInfo = null;
            }
        },
        logout: (state) => {
            state.isLogin = false;
            state.userInfo = null;
        },

        setQuestionUser: (state, action) => {
            const userItem = Object.values(state.users).find(user => user.id === action.payload.author);
            userItem.questions.push(action.payload.id);

            state.userInfo = userItem;
            state.users = {
                ...state.users,
                [userItem.id]: userItem
            }
        },

        setUserAnswer: (state, action) => {
            const authedUser = action.payload.authedUser;
            const answer = action.payload.answer;
            const qid = action.payload.id;

            state.users = {
                ...state.users,
                [authedUser]: {
                  ...state.users[authedUser],
                  answers: {
                    ...state.users[authedUser].answers,
                    [qid]: answer
                  }
                }
              }
        }
    },
    extraReducers: (builder) => {
        // Add extra reducers here
        builder.addCase(AuthActions.getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });
    }
});

export const { login, logout, setQuestionUser, setUserAnswer } = AuthSlice.actions;
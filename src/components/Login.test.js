import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import Login from "./Login";
import { AuthActions } from "../redux/actions/auth.action";

describe("Login", () => {
    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it('click submit button', async () => {
        await store.dispatch(AuthActions.getUsers());

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );

        const usernameInputElement = component.getByTestId("username");
        const passwordInputElement = component.getByTestId("password");
        const submitButtonElement = component.getByTestId("submit");
        expect(usernameInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
        expect(submitButtonElement).toBeInTheDocument();

        fireEvent.change(usernameInputElement, {target: {value: 'sarahedo'}});
        fireEvent.change(passwordInputElement, {target: {value: 'wrongpassword'}});
        expect(usernameInputElement.value).toBe("sarahedo");
        expect(passwordInputElement.value).toBe("wrongpassword");
        fireEvent.click(submitButtonElement);
    });
});
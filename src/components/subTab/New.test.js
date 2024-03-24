import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import New from "./New";

describe("New", () => {
    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <New />
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("should display all elements", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <New/>
                </BrowserRouter>
            </Provider>
        );

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();

        const firstOptionLabelElement = component.getByTestId("firstOptionLabel");
        const firstOptionInputElement = component.getByTestId("firstOption");
        const secondOptionLabelElement = component.getByTestId("secondOptionLabel");
        const secondOptionInputElement = component.getByTestId("secondOption");
        const submitButtonElement = component.getByTestId("submit-new-poll");

        expect(firstOptionLabelElement.textContent).toBe("First Option");
        expect(secondOptionLabelElement.textContent).toBe("Second Option");
        expect(submitButtonElement.textContent).toBe("Submit");

        fireEvent.change(firstOptionInputElement, {target: {value: 'Text 1'}});
        fireEvent.change(secondOptionInputElement, {target: {value: 'Text 2'}});
        expect(firstOptionInputElement.value).toBe("Text 1");
        expect(secondOptionInputElement.value).toBe("Text 2");
    });
});
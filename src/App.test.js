import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {store} from "./redux/store";
import { AuthActions } from './redux/actions/auth.action';
import { login } from './redux/slice/auth.slice';

describe("App", () => {
    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("should show Login page when not logged in", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        const heading = component.getByTestId("login-header");
        expect(heading).toBeInTheDocument();
    });

    it("should show Home page when logged in", async () => {
        await store.dispatch(AuthActions.getUsers());
        await store.dispatch(login({ username: 'tylermcginnis', password: 'abc321'}))

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );

        const heading = component.getByTestId("home-header");
        expect(heading).toBeInTheDocument();
    });
});

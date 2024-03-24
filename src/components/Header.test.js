import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {store} from "../redux/store";
import Header from './Header';
import { AuthActions } from '../redux/actions/auth.action';
import { login } from '../redux/slice/auth.slice';

describe("Header", () => {
    it("should render the component when logged in", async () => {
        await store.dispatch(AuthActions.getUsers());
        await store.dispatch(login({ username: 'tylermcginnis', password: 'abc321'}))

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {store} from "../../redux/store";
import { AuthActions } from '../../redux/actions/auth.action';
import { login } from '../../redux/slice/auth.slice';
import PollPage from './PollPage';
import { QuestionActions } from '../../redux/actions/question.action';

describe("PollPage", () => {
    it("should render the component when logged in", async () => {
        await store.dispatch(AuthActions.getUsers());
        await store.dispatch(login({ username: 'tylermcginnis', password: 'abc321'}))
        await store.dispatch(QuestionActions.getQuestions());

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <PollPage />
                </BrowserRouter>
            </Provider>
        );

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});

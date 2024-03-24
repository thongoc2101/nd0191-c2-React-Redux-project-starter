import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from "../../redux/store";
import { AuthActions } from '../../redux/actions/auth.action';
import { login, setUserAnswer } from '../../redux/slice/auth.slice';
import PollPage from './PollPage';
import { QuestionActions } from '../../redux/actions/question.action';
import { setAnsweredUser } from '../../redux/slice/question.slice';
import { act } from 'react-dom/test-utils';

describe("PollPage", () => {
    it("should render the component when logged in", async () => {
        await store.dispatch(AuthActions.getUsers());
        await store.dispatch(login({ username: 'tylermcginnis', password: 'abc321' }))
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

    it("should save question answer when click votes", async () => {
        await store.dispatch(AuthActions.getUsers());
        await store.dispatch(login({ username: 'tylermcginnis', password: 'abc321' }));
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

        const pollPageHeadingElement = component.getByTestId("pollPage-header");
        const submitOptionOneButtonElement = component.getByTestId("submit-optionOne");
        expect(submitOptionOneButtonElement).toBeInTheDocument();

        expect(submitOptionOneButtonElement.textContent).toBe("Click");
        if (submitOptionOneButtonElement) {
            fireEvent.click(submitOptionOneButtonElement);
        }

        await act(async () => {
            store.dispatch(QuestionActions.saveQuestionAnswer({ qid: 'xj352vofupe1dqz9emx13r', answer: 'optionOne', authedUser: "sarahedo" }));
            store.dispatch(setAnsweredUser({ id: 'xj352vofupe1dqz9emx13r', answer: 'optionOne', authedUser: "sarahedo" }));
            store.dispatch(setUserAnswer({ id: 'xj352vofupe1dqz9emx13r', answer: 'optionOne', authedUser: "sarahedo" }));
            store.dispatch(QuestionActions.getQuestions());
        });

        expect(pollPageHeadingElement).toBeInTheDocument();
    });
});

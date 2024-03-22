import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionActions } from "../../redux/actions/question.action";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const [questions, setQuestions] = useState([]);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(QuestionActions.getQuestions()).then((res) => {
            setQuestions(Object.values(res.payload));
        });
    }, [dispatch]);

    const renderTemplate = (question) => {
        return (
            <Link to={'questions/' + question.id}>
                <div className="w-full m-1 rounded-xl bg-white mx-auto items-center border border-solid">
                    <div className="text-xl font-bold">{question.author}</div>
                    <div className="text-xs italic mb-2">{new Date(question.timestamp).toDateString()}</div>
                    <div>
                        <button type="button" className="text-lime-500">Show</button>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <div className="p-6">
            <h3 className="text-xl font-bold mt-6">New Questions</h3>
            <div className="grid grid-cols-2 gap-4">
                {questions
                    .filter((question) => (!question.optionOne.votes.includes(userInfo.id)
                        && !question.optionTwo.votes.includes(userInfo.id)))
                    .map((question) => (
                        <div key={question.id}>
                            {renderTemplate(question)}
                        </div>
                    ))}
            </div>

            <h3 className="text-xl font-bold mt-6">Done</h3>
            <div className="grid grid-cols-2 gap-4">
                {questions
                    .filter((question) => (question.optionOne.votes.includes(userInfo.id)
                        || question.optionTwo.votes.includes(userInfo.id)))
                    .map((question) => (
                        <div key={question.id}>
                            {renderTemplate(question)}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Home;
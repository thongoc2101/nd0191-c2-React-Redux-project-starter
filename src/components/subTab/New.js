import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionActions } from "../../redux/actions/question.action";
import { setQuestionUser } from "../../redux/slice/auth.slice";
import { useNavigate } from "react-router-dom";

const New = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);
    const [firstOption, setFirstOption] = useState('');
    const [secondOption, setSecondOption] = useState('');

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        // Check for unique question options. Both options should not be the same.
        if (firstOption === secondOption) {
            setShowErrorMessage(true);
            return;
        }

        dispatch(QuestionActions.addQuestion({
            optionOneText: firstOption,
            optionTwoText: secondOption,
            author: userInfo.id
        })).then((res) => {
            setFirstOption('');
            setSecondOption('');
            dispatch(setQuestionUser(res.payload));
            navigate({ pathname: '/' });
        });
    };

    const inputStyle = "w-full mt-2 px-3 py-2 border border-slate-300 rounded-md";
    return (
        <div className="new-page-container px-14">
            <h1 className="text-3xl font-bold mt-9">Would You Rather</h1>
            <h3 className="text-sm">Create Your Own Poll</h3>
            <form onSubmit={onSubmit}>

                <div className="mt-3">
                    <label htmlFor="firstOption"
                        className="block text-sm font-bold">First Option</label>
                    <input
                        value={firstOption}
                        onChange={(e) => setFirstOption(e.target.value)}
                        type="text"
                        name="firstOption"
                        id="firstOption"
                        maxLength={255}
                        className={inputStyle} />
                </div>

                <div className="mt-3">
                    <label htmlFor="secondOption"
                        className="block text-sm font-bold">Second Option</label>
                    <input
                        value={secondOption}
                        onChange={(e) => setSecondOption(e.target.value)}
                        type="text"
                        name="secondOption"
                        id="secondOption"
                        maxLength={255}
                        className={inputStyle} />
                </div>

                {showErrorMessage &&
                    <div className="mt-3 text-left">
                        <span className="text-red-600">Both options should not be the same</span>
                    </div>
                }

                <div className="mt-5 text-right">
                    <button type="submit" disabled={!firstOption || !secondOption}
                        className="bg-sky-500 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white disabled:bg-slate-500 disabled:text-white disabled:cursor-not-allowed">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
}

export default New;
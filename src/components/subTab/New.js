import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionActions } from "../../redux/actions/question.action";
import { setQuestionUser } from "../../redux/slice/auth.slice";

const New = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [firstOption, setFirstOption] = useState('');
    const [secondOption, setSecondOption] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(QuestionActions.addQuestion({
            optionOneText: firstOption,
            optionTwoText: secondOption,
            author: userInfo.id
        })).then((res) => {
            setFirstOption('');
            setSecondOption('');
            dispatch(setQuestionUser(res.payload));
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
                        className={inputStyle} />
                </div>

                <div className="mt-5 text-right">
                    <button type="submit"
                        className="bg-sky-500 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
}

export default New;
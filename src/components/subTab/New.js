import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionActions } from "../../redux/actions/question.action";
import { setQuestionUser } from "../../redux/slice/auth.slice";

const New = () => {
    const dispatch = useDispatch();

    const { userInfo, users } = useSelector((state) => state.auth);
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

    const inputStyle = "px-3 py-2 bg-white border border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 disabled:shadow-none";

    return (
        <div className="new-page px-14">
            <h1 className="text-3xl font-bold mt-9">Would You Rather</h1>
            <h3 className="text-sm">Create Your Own Poll</h3>
            <form onSubmit={onSubmit}>

                <div className="mt-3">
                    <label htmlFor="firstOption"
                        className="block text-sm font-bold">First Option</label>
                    <div className="mt-1">
                        <input
                            value={firstOption}
                            onChange={(e) => setFirstOption(e.target.value)}
                            type="text"
                            name="firstOption"
                            id="firstOption"
                            className={inputStyle} />
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="secondOption"
                        className="block text-sm font-bold">Second Option</label>
                    <div className="mt-1">
                        <input
                            value={secondOption}
                            onChange={(e) => setSecondOption(e.target.value)}
                            type="text"
                            name="secondOption"
                            id="secondOption"
                            className={inputStyle} />
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <button type="submit"
                        className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
}

export default New;
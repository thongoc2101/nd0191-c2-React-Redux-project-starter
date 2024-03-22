import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionActions } from "../../redux/actions/question.action";
import { useEffect, useState } from "react";
import { setAnsweredUser } from "../../redux/slice/question.slice";

const PollPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = useParams();
    const questionId = params.id;

    const { userInfo } = useSelector((state) => state.auth);

    const [question, setQuestion] = useState(null);
    const [hasVotedForOptionOne, setHasVotedForOptionOne] = useState(false);
    const [hasVotedForOptionTwo, setHasVotedForOptionTwo] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);

    // init data
    useEffect(() => {
        dispatch(QuestionActions.getQuestions()).then((res) => {
            const question = Object.values(res.payload).find((question) => question.id === questionId);
            if (!question) navigate({ pathname: '/404' })

            setQuestion(question);

            const hasVotedForOptionOneTemp = question?.optionOne?.votes.includes(userInfo.id);
            const hasVotedForOptionTwoTemp = question?.optionTwo?.votes.includes(userInfo.id);

            setHasVotedForOptionOne(hasVotedForOptionOneTemp);
            setHasVotedForOptionTwo(hasVotedForOptionTwoTemp);
            setHasVoted(hasVotedForOptionOneTemp || hasVotedForOptionTwoTemp);
        });
    }, [dispatch, questionId, userInfo.id, navigate]);

    const handleChangeOption = (e, optionChoose) => {
        e.preventDefault();
        dispatch(setAnsweredUser({ id: question.id, answer: optionChoose }));
        navigate("/");
    };

    const calcVotes = (option, question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
        switch (option) {
            case "optionOne":
                return question.optionOne.votes.length / numberVotesTotal * 100 + "%";
            case "optionTwo":
                return question.optionTwo.votes.length / numberVotesTotal * 100 + "%";
            default:
                return "";
        }
    };

    const renderTemplateVoted = (question, numberVotes, option) => {
        return (
            <>
                {!hasVoted && <p className="bg-sky-500 rounded-md">Click</p>}
                {hasVoted && <p className="text-xs">Votes: {numberVotes} ({calcVotes(option, question)})</p>}
            </>
        )
    }

    return (
        <div className="poll-page-information">
            <h1 className="text-2xl font-bold mt-9">Poll by {userInfo.id}</h1>

            <div className="flex justify-center">
                <img src={userInfo.avatarURL} alt="" className="h-20 w-20" />
            </div>

            <div className="flex justify-center">
                <h2 className="text-2xl font-bold mt-6">Would you rather?</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                {/* button option one */}
                <button
                    onClick={(e) => handleChangeOption(e, 'optionOne')}
                    disabled={hasVoted}
                    className={"p-2 rounded-xl bg-white border border-solid" + (hasVotedForOptionOne ? " bg-lime-500" : "")}>
                    <p className="mb-2">{question?.optionOne?.text}</p>
                    {renderTemplateVoted(question, question?.optionOne?.votes.length, "optionOne")}
                </button>

                {/* button option two */}
                <button
                    onClick={(e) => handleChangeOption(e, 'optionTwo')}
                    disabled={hasVoted}
                    className={"p-2 rounded-xl bg-white border border-solid" + (hasVotedForOptionTwo ? " bg-lime-500" : "")}>
                    <p className="mb-2">{question?.optionTwo?.text}</p>
                    {renderTemplateVoted(question, question?.optionTwo?.votes.length, "optionTwo")}
                </button>
            </div>
        </div>
    );
}

export default PollPage;
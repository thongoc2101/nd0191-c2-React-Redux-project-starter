import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const { isLogin } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleBackButton = () => {
        navigate({ pathname: isLogin ? '/' : '/login' })
    }

    return (
        <div>
            <h3>Page NotFound</h3>
            <div className="btn-back">
                <button className="underline underline-offset-4" onClick={handleBackButton} type="button">
                    {isLogin ? 'Back to Home' : 'Back to Login'}
                </button>
            </div>
        </div>
    )
}

export default NotFound;
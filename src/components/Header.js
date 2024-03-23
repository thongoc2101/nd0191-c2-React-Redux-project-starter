import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/auth.slice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <nav className="grid grid-cols-2 gap-4">
            <div className="left-information">
                <Link to="/" className="font-medium px-3 py-2 text-slate-700 rounded-md">Home</Link>
                <Link to="/leaderboard" className="font-medium px-3 py-2 text-slate-700 rounded-md">Leaderboard</Link>
                <Link to="/add" className="font-medium px-3 py-2 text-slate-700 rounded-md">New</Link>
            </div>

            <div className="right-information">
                <span
                    className="font-medium px-3 py-2 text-slate-700">{userInfo?.name}</span>
                <button onClick={handleLogout}
                    className="font-medium px-3 py-2 text-slate-700 rounded-md">Logout
                </button>
            </div>
        </nav>
    );
}

export default Header;
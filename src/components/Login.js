import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../redux/actions/auth.action';
import { login } from '../redux/slice/auth.slice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const { userInfo, isLogin } = useSelector((state) => state.auth);

    const [username, setUsername] = useState(userInfo?.id || '');
    const [password, setPassword] = useState(userInfo?.password || '');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    }

    useEffect(() => {
        dispatch(AuthActions.getUsers());
    }, [dispatch]);

    useEffect(() => {
        if (isLogin) navigate('/');
    }, [isLogin, navigate]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full px-6 py-8 rounded-md">
                <h2 className="text-2xl font-bold mb-8" data-testid="login-header">Employee Polls</h2>
                <form>
                    <div>
                        <label htmlFor="username" className="text-sm font-semibold">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder='User'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            data-testid="username"
                            className="w-full rounded-md px-3 py-2 border border-slate-300 mt-2" />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            value={password}
                            data-testid="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md px-3 py-2 border border-slate-300 mt-2" />
                    </div>
                    <div className="mt-4 text-center">
                        <button data-testid="submit" type="submit" onClick={handleSubmit}
                            className="bg-stone-400 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Login;
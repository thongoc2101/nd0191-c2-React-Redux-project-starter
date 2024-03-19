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
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full px-6 py-8 bg-white rounded-md">
                <h2 className="text-2xl font-bold mb-8">Employee Polls</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-slate-700">Username</label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder='User'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
                        <div className="mt-1">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none" />
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button type="submit" onClick={handleSubmit}
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
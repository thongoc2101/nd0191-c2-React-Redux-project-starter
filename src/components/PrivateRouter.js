import { useSelector } from "react-redux";
import Login from "./Login";

const PrivateRouter = ({children}) => {
    const { isLogin } = useSelector(state => state.auth);

    return (
        <>
            {isLogin ? children : <Login />}
        </>
    );
}

export default PrivateRouter;
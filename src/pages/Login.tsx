import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useTitle } from "../globals";
import { Navigate } from "react-router-dom";
import { login } from "../store/action-creators/auth";
import EmailConfirmation from "./EmailConfirmation";
import PasswordPrompt from "./PasswordPrompt";

const Login: FC = () => {
    useTitle('Вход');
    const [cardId, setCardId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const { isAuth, user, isLoading, error } = useAppSelector(state => state.authReducer);
    if (isAuth) {
        if (!user.emailConfirmed) {
            return <EmailConfirmation />;
        }
        if (user.passwordNeedReset) {
            return <>пароль</>;
        }
        return <Navigate to={`/users/${user.id}`} />;
    }
    return (
        <>
            <h2>Вход</h2>
            <form>
                <input onChange={e => setCardId(e.target.value)} value={cardId} />
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" />
                <button onClick={() => dispatch(login(cardId, password))}>Вход</button>
            </form>
            {isLoading && <h2>...</h2>}
            {!!error && <h4>{error}</h4>}
        </>
    );
};

export default Login;
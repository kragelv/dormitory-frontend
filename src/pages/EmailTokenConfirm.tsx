import { FC, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { confirmEmail } from "../store/action-creators/email";

const EMAIL_TOKEN_PARAM = "token";

const EmailTokenConfirm: FC = () => {
    const isAuth = useAppSelector(state => state.authReducer.isAuth);
    const userEmailConfirmed = useAppSelector(state => state.authReducer.user.emailConfirmed);
    const email = useAppSelector(state => state.authReducer.user.email);
    const { confirmed, isLoading, error } = useAppSelector(state => state.emailConfirmReducer);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isValid, setValid] = useState(false);
    let initialConfirmed = false;
    useEffect(() => {
        initialConfirmed = userEmailConfirmed;
    }, []);
    useEffect(() => {
        if (!isAuth) {
            setValid(false);
            return;
        }
        const token = searchParams.get(EMAIL_TOKEN_PARAM);
        console.debug(token);
        if (!token) {
            setValid(false);
            return;
        }
        dispatch(confirmEmail(token));
        setValid(true);
    }, [searchParams, isAuth, dispatch]);
    if (!isAuth || initialConfirmed) //fix this
        return <Navigate to={"/"} />;
    return (
        <div>
            {
                !isAuth ? <h2>Для подтверждения почты необходимо войти в аккаунт</h2> :
                    !isValid ? <h2>Некорректная ссылка</h2> :
                        isLoading ? <h3>Загрузка..</h3> :
                            !!error ? <h2>{error}</h2> :
                                <h2>Почта {email} подтверждена</h2>
            }
            <button onClick={() => navigate("/login")}>Продолжить</button>
        </div>
    );
};
export default EmailTokenConfirm;
import { FC, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook/redux";
import { confirmEmail } from "../store/action-creators/email";
import NavigationBar from "../components/NavigationBar/NavigationBar";

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
    const [initialConfirmed, setInitialConfirmed] = useState(false);
    useEffect(() => {
        setInitialConfirmed(userEmailConfirmed);
    }, [setInitialConfirmed]);
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
    }, [isAuth, searchParams]);
    if (!isAuth || initialConfirmed) //fix this
        return <Navigate to={"/"} />;
        //TODO: add container and class
    return (
        <>
            <NavigationBar />
            <div className="">
                <div className="success-email-confirm"> 
                    {
                        !isAuth ? <h2 className="error-state">Для подтверждения почты необходимо войти в аккаунт</h2> :
                            !isValid ? <h2 className="error-state">Некорректная ссылка</h2> :
                                isLoading ? <h3 className="error-state">Загрузка..</h3> :
                                    !!error ? <h2 className="error-state">{error}</h2> :
                                        <h2 className="success-state">Почта {email} подтверждена</h2>
                    }
                    <button className="login" onClick={() => navigate("/login")}>Продолжить</button>
                </div>
            </div>
        </>

    );
};
export default EmailTokenConfirm;

import { FC } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import Authz from "../../components/Authz";
import { sendResetToken } from "../../store/action-creators/password";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../models/auth/authorities";

const ResetPasswordPrompt: FC = () => {
    const email = useAppSelector(state => state.authReducer.user.email);
    const error = useAppSelector(state => state.passwordSendReducer.error);
    const isLoading = useAppSelector(state => state.passwordSendReducer.isLoading);
    const sendToEmail = useAppSelector(state => state.passwordSendReducer.email);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleContinue = () => {
        dispatch(sendResetToken(email!))
            .then(() => navigate("/login"));
    };
    return (
        <Authz passwordResetOff>
            <NavigationBar />
            <h2>Для работы с приложением необходимо установить пароль.
                На адрес электронной почты {email} будет отправлено письмо,
                содержащее ссылку для настройки пароля.</h2>
            <button className="btn btn-primary" onClick={handleContinue} type="submit" disabled={isLoading}>
                {isLoading ?
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                    <span>Продолжить</span>
                }
            </button>
            {!!error ? <p>error</p> :
                !!sendToEmail && <p>Отправлено на {sendToEmail}</p>}
        </Authz>
    );
};

export default ResetPasswordPrompt;

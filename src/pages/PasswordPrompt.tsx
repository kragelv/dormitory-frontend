import { FC } from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Authz from "../components/Authz";
import { sendResetToken } from "../store/action-creators/password";
import { useNavigate } from "react-router-dom";
import { error } from "console";

const PasswordPrompt: FC = () => {
    const email = useAppSelector(state => state.authReducer.user.email);
    const { email: sendToEmail, error } = useAppSelector(state => state.passwordSendReducer);
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
            <button onClick={handleContinue}>Отправить</button>
            {!!error ? <p>error</p> :
                !!sendToEmail && <p>Отправлено на {sendToEmail}</p>}
        </Authz>
    );
};

export default PasswordPrompt;

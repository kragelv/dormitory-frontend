import "./PasswordReset.css";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { changePassword } from "../store/action-creators/password";
import { useTitle } from "../globals";
import NavigationBar from "../components/NavigationBar";

interface IPasswordResetForm {
    password: string,
    passwordRepeat: string;
}

const PasswordSchema = Yup.object({
    password: Yup.string()
        .required('Обязательное поле')
        .min(8, 'Минимальная длина пароля 8 символов'),
    passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
});

const PASSWORD_TOKEN_PARAM = "token";

const PasswordReset: FC = () => {
    useTitle("Сброс пароля");
    const initialValues: IPasswordResetForm = {
        password: '',
        passwordRepeat: ''
    };
    const { isLoading, error } = useAppSelector(state => state.passwordChangeReducer);
    const [isValidLink, setValidLink] = useState(false);
    const [token, setToken] = useState("");
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const token = searchParams.get(PASSWORD_TOKEN_PARAM);
        console.debug(token);
        if (!token) {
            setValidLink(false);
            return;
        }
        setToken(token);
        setValidLink(true);
    }, [searchParams]);
    if (!isValidLink)
        return <h2>Некорректная ссылка</h2>;
    return (
        <>
            <NavigationBar />
            <h2>Сброс пароля</h2>
            {!!error ? (
                <>
                    <h2>{error}</h2>
                    <button onClick={() => navigate("/login")}>Продолжить</button>
                </>
            ) : (
                <Formik
                    initialValues={initialValues}
                    validationSchema={PasswordSchema}
                    onSubmit={values => {
                        dispatch(changePassword({ token, newPassword: values.password }))
                            .then(() => navigate("/login"));
                    }}
                >
                    {props => {
                        const { values, touched, errors, isValid, isSubmitting, handleSubmit, handleBlur, handleChange } = props;
                        return (
                            <form className="pw-form" onSubmit={handleSubmit}>
                                <label htmlFor="password">Новый пароль</label>
                                <input type="password"
                                    id="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password
                                            ? "text-input error"
                                            : "text-input"
                                    } />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                                <label htmlFor="passwordRepeat">Повторите пароль</label>
                                <input type="password"
                                    id="passwordRepeat"
                                    name="passwordRepeat"
                                    value={values.passwordRepeat}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.passwordRepeat && touched.passwordRepeat
                                            ? "text-input error"
                                            : "text-input"
                                    } />
                                {errors.passwordRepeat && touched.passwordRepeat && (
                                    <div className="input-feedback">{errors.passwordRepeat}</div>
                                )}
                                <button type="submit" disabled={!isValid || isSubmitting || isLoading}>Сбросить пароль</button>
                            </form>
                        );
                    }}
                </Formik>
            )}
        </>);
};

export default PasswordReset;
import "./PasswordReset.css";
import {Formik} from "formik";
import React, {FC, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import * as Yup from "yup";
import {useAppDispatch, useAppSelector} from "../store/hook/redux";
import {changePassword} from "../store/action-creators/password";
import {useTitle} from "../globals";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {ICON_FOR_INPUTS, LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT} from "../constants";
import {IonIcon} from "@ionic/react";
import FirstForm from "../components/FirstForm/FirstForm";

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
    const {isLoading, error} = useAppSelector(state => state.passwordChangeReducer);
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
        return <div className="container">
            <div className="screen-1">
                <h2 className="error-state">Некорректная ссылка</h2>
            </div>
        </div>;

    return (
        <>
                <NavigationBar/>
                <div className="f-container">
                    {!!error ? (
                        <>
                            <div className="screen-1">
                                <h2 className="error-state">{error}</h2>
                                <button className="login" onClick={() => navigate("/login")}>Продолжить</button>
                            </div>
                        </>
                    ) : (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={PasswordSchema}
                            onSubmit={values => {
                                dispatch(changePassword({token, newPassword: values.password}))
                                    .then(() => navigate("/login"));
                            }}
                        >
                            {props => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    isValid,
                                    isSubmitting,
                                    handleSubmit,
                                    handleBlur,
                                    handleChange
                                } = props;
                                return (
                                    <FirstForm noValidate onSubmit={handleSubmit}>
                                        <svg className="logo" width="100px" height="100px" viewBox="0 0 48 48"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <rect width="100" height="100" fill="white" fillOpacity="0.01"/>
                                            <circle cx="39" cy="9" r="5" fill="#2F88FF" stroke="#000000" strokeWidth="4"
                                                    strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="9" cy="39" r="5" fill="#2F88FF" stroke="#000000" strokeWidth="4"
                                                    strokeLinecap="round" strokeLinejoin="round"/>
                                            <rect x="4" y="4" width="10" height="10" fill="#2F88FF" stroke="#000000"
                                                  strokeWidth="4"
                                                  strokeLinecap="round" strokeLinejoin="round"/>
                                            <rect x="34" y="34" width="10" height="10" fill="#2F88FF" stroke="#000000"
                                                  strokeWidth="4"
                                                  strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M34 9H14" stroke="#000000" strokeWidth="4" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                            <path d="M34 39H14" stroke="#000000" strokeWidth="4" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                            <path d="M9 34L9 14" stroke="#000000" strokeWidth="4" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                            <path d="M39 34L39 14" stroke="#000000" strokeWidth="4"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>


                                        <div className="form-field-container">
                                            <label htmlFor="password">{LABEL_FOR_INPUTS["password"]}:</label>
                                            <div className="input-container">
                                                <IonIcon className="ion-icon" icon={ICON_FOR_INPUTS["password"]}/>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["password"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["password"]}
                                                    className="form-control inp_text"
                                                    id="password"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["password"] && touched["password"] && errors["password"]}
                                            </p>
                                        </div>

                                        <div className="form-field-container">
                                            <label
                                                htmlFor="passwordRepeat">{LABEL_FOR_INPUTS["passwordRepeat"]}:</label>
                                            <div className="input-container">
                                                <IonIcon className="ion-icon" icon={ICON_FOR_INPUTS["password"]}/>
                                                <input
                                                    type="password"
                                                    name="passwordRepeat"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["passwordRepeat"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["passwordRepeat"]}
                                                    className="form-control inp_text"
                                                    id="passwordRepeat"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["passwordRepeat"] && touched["passwordRepeat"] && errors["passwordRepeat"]}
                                            </p>
                                        </div>

                                        <button className="login" type="submit"
                                                disabled={!isValid || isSubmitting || isLoading}>Сбросить
                                            пароль
                                        </button>
                                    </FirstForm>
                                );
                            }}
                        </Formik>
                    )}
                </div>
        </>);
};

export default PasswordReset;

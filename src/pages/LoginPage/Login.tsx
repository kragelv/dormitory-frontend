import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useTitle} from "../../globals";
import {Navigate} from "react-router-dom";
import {login} from "../../store/action-creators/auth";
import EmailConfirmation from "../EmailConfirmationPage/EmailConfirmation";
import PasswordPrompt from "../PasswordPrompt";
import {Formik} from "formik";
import * as Yup from "yup";
import {ICON_FOR_INPUTS, LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT} from "../../constants";
import {IonIcon} from "@ionic/react";
import "./Login.css"
import {useToasters} from "../../contexts/ToasterContexts";
import ResetPasswordBlock from "../ResetPasswordBlockPage/ResetPasswordBlock";

const Login: FC = () => {
    const shape = {
        cardId: Yup.string()
            .required("Номер пропуска это обязательное поле")
            .min(6, "Номер пропуска состоит из минимум 6 знаков"),
        password: Yup.string()
            .required("Пароль это обязательное поле")
            .min(6, "Пароль состоит из минимум 6 знаков"),
    }
    const {showToasterError} = useToasters();
    useTitle('Вход');
    const [cardId, setCardId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const {isAuth, user, isLoading, error} = useAppSelector(state => state.authReducer);
    if (isAuth) {
        if (!user.emailConfirmed) {
            return <EmailConfirmation/>;
        }
        if (user.passwordNeedReset) {
            return <ResetPasswordBlock/>;
        }
        return <Navigate to={`/users/${user.id}`}/>;
    }
    return (
        <>
            <div className="container">
                <Formik
                    validationSchema={Yup.object().shape(shape)}
                    initialValues={
                        {
                            cardId: "",
                            password: ""
                        }
                    }
                    onSubmit={(values: { cardId: string, password: string }) => {
                        dispatch(login(values.cardId, values.password));
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit
                      }) => (
                        <form className="screen-1" noValidate onSubmit={handleSubmit}>
                            <svg className="logo" width="100px" height="100px" viewBox="0 0 48 48" fill="none"
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
                                <path d="M39 34L39 14" stroke="#000000" strokeWidth="4" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                            <div className="password">
                                <label htmlFor="cardId">{LABEL_FOR_INPUTS["cardId"]}:</label>
                                <div key="cardId">
                                    <div className="sec-2">
                                        <IonIcon className="ion-icon" icon={ICON_FOR_INPUTS["cardId"]}/>
                                        <input
                                            type="cardId"
                                            name="cardId"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values["cardId"]}
                                            placeholder={PLACEHOLDER_FOR_INPUT["cardId"]}
                                            className="form-control inp_text"
                                            id="cardId"
                                        />
                                    </div>
                                    <p className="error">
                                        {errors["cardId"] && touched["cardId"] && errors["cardId"]}
                                    </p>
                                </div>
                            </div>

                            <div className="password">
                                <label htmlFor="password">{LABEL_FOR_INPUTS["password"]}:</label>
                                <div key="password">
                                    <div className="sec-2">
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
                            </div>

                            <button className="login" type="submit">Логин</button>
                            {/*<div className="footer"><span></span><span>Забыли пароль?</span></div>*/}
                        </form>

                    )}
                </Formik>
            </div>
            {isLoading && <h2>...</h2>}
            {!!error && showToasterError(error)}
        </>
    );
};

export default Login;

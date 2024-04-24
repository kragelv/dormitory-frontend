import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import { useTitle } from "../../globals";
import { Navigate } from "react-router-dom";
import { login } from "../../store/action-creators/auth";
import EmailConfirmation from "../EmailConfirmationPage/EmailConfirmation";
import { Formik } from "formik";
import * as Yup from "yup";
import { ICON_FOR_INPUTS, LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT } from "../../constants";
import { IonIcon } from "@ionic/react";
import { useToasters } from "../../contexts/ToasterContexts";
import Logo from "../../components/Logo/Logo";
import ResetPasswordPrompt from "../ResetPasswordPromtPage/ResetPasswordPrompt";
import FirstForm from "../../components/FirstForm/FirstForm";

interface ILoginForm {
    cardId: string,
    password: string;
}

const initialValues: ILoginForm = {
    cardId: '',
    password: ''
};

const LoginSchema = Yup.object({
    cardId: Yup.string()
        .required("Обязательное поле")
        .min(6, "Номер пропуска состоит из минимум 6 знаков"),
    password: Yup.string()
        .required("Обязательное поле")
        .min(6, "Пароль состоит из минимум 6 знаков"),
});

const Login: FC = () => {
    const { showToasterError } = useToasters();
    useTitle('Вход');
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.authReducer.isAuth);
    const isLoading = useAppSelector(state => state.authReducer.isLoading);
    const user = useAppSelector(state => state.authReducer.user);
    const error = useAppSelector(state => state.authReducer.error);
    useEffect(() => {
        if (!!error) {
            showToasterError(error);
        }
    }, [error, showToasterError]);
    return (
        <>
            {isAuth ?
                (!user.emailConfirmed ? <EmailConfirmation /> : (user.passwordNeedReset ? <ResetPasswordPrompt /> : <Navigate to={`/users/${user.id}`} />)) :
                <div className="f-container">
                    <Formik
                        validationSchema={LoginSchema}
                        initialValues={initialValues}
                        onSubmit={(values) => {
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
                            <FirstForm noValidate onSubmit={handleSubmit}>
                                <Logo width="100px" height="100px" className="logo" />
                                <div className="form-field-container">
                                    <label htmlFor="cardId">{LABEL_FOR_INPUTS["cardId"]}:</label>
                                    <div className="input-container">
                                        <IonIcon className="ion-icon" icon={ICON_FOR_INPUTS["cardId"]} />
                                        <input
                                            type="cardId"
                                            name="cardId"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values["cardId"]}
                                            placeholder={PLACEHOLDER_FOR_INPUT["cardId"]}
                                            className="inp_text"
                                            id="cardId"
                                        />
                                    </div>
                                    {errors["cardId"] && touched["cardId"] &&
                                        <div className="error-container">
                                            <p className="error">
                                                {errors["cardId"]}
                                            </p>
                                        </div>
                                    }


                                </div>

                                <div className="form-field-container">
                                    <label htmlFor="password">{LABEL_FOR_INPUTS["password"]}:</label>
                                    <div className="input-container">
                                        <IonIcon className="ion-icon" icon={ICON_FOR_INPUTS["password"]} />
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values["password"]}
                                            placeholder={PLACEHOLDER_FOR_INPUT["password"]}
                                            id="password"
                                        />
                                    </div>
                                    {
                                        errors["password"] && touched["password"] &&
                                        <div className="error-container">
                                            <p className="error">
                                                {errors["password"]}
                                            </p>
                                        </div>
                                    }
                                </div>
                                <button className="btn btn-primary" type="submit" disabled={isLoading}>
                                    {isLoading ?
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                        <span>Вход</span>
                                    }
                                </button>
                                {/*<div className="footer"><span></span><span>Забыли пароль?</span></div>*/}
                            </FirstForm>
                        )}
                    </Formik>
                </div>
            }
        </>
    );
};

export default Login;

import "./EmailConfirmation.css";
import { FC } from "react";
import { Form, Formik, validateYupSchema, yupToFormErrors } from "formik";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import { fetchEmailAvailable, resendEmailConfirmation, sendEmailConfirmation } from "../../store/action-creators/email";
import * as Yup from "yup";
import { store } from "../../store/store";
import createDebounce from "../../util/debounce";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./EmailConfirmation.css";
import { ICON_FOR_INPUTS, LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT } from "../../constants";
import { IonIcon } from "@ionic/react";
import Logo from "../../components/Logo/Logo";
import FirstForm from "../../components/FirstForm/FirstForm";

interface IEmailForm {
    email: string;
}

const initialValues: IEmailForm = {
    email: ''
};

async function checkEmailAvailableState(email: string) {
    await store.dispatch(fetchEmailAvailable(email));
    return store.getState().emailReducer.isAvailable;
}

const [emailDeb, cancelEmail] = createDebounce(checkEmailAvailableState, 300);

const InnerEmailSchema = Yup.object({
    email: Yup.string()
        .when("$req", (req, schema) => {
            if (req)
                schema.required("Обязательное поле");
            return schema;
        })
        .email("Некорректная почта")
});

const EmailSchema = Yup.object({
    email: Yup
        .mixed()
        .test(
            "unique-email",
            async (value, context) => {
                cancelEmail();
                return InnerEmailSchema.validate({ email: value }, context.options)
                    .then(async ({ email }) => {
                        if (!email) { //for compatibility with $req yup context
                            return true;
                        }
                        const isAvailable = await emailDeb(email);
                        if (!isAvailable) {
                            return context.createError({ message: "Почта недоступна" });
                        }
                        return true;
                    })
                    .catch((e) => {
                        if (e instanceof Yup.ValidationError) {
                            return context.createError({ ...e });
                        }
                        return context.createError({ message: "Некорректная почта" });
                    });
            }
        )
});

const EmailConfirmation: FC = () => {
    const userEmail = useAppSelector(state => state.authReducer.user.email);
    const emailState = useAppSelector(state => state.emailReducer);
    const emailSendState = useAppSelector(state => state.emailSendReducer);
    const dispatch = useAppDispatch();
    return (
        <>
            <NavigationBar />
            <div className="page-container">
                <Formik
                    initialValues={initialValues}
                    validate={async (values) => {
                        try {
                            console.log("userEmail: " + !userEmail);
                            await validateYupSchema(values, EmailSchema, false, { req: !userEmail });
                        } catch (e) {
                            return yupToFormErrors(e);
                        }
                    }}
                    onSubmit={values => {
                        (userEmail && !values.email) ?
                            dispatch(resendEmailConfirmation()) :
                            dispatch(sendEmailConfirmation(values.email));
                    }}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            isValid,
                            handleSubmit,
                            handleBlur,
                            handleChange
                        } = props;
                        return (
                            <FirstForm onSubmit={(e) => { console.log(e); e.nativeEvent.preventDefault(); handleSubmit(e); }}>
                                <Logo width="100px" height="100px" />
                                <div className="form-field-container">
                                    <label htmlFor="email">{LABEL_FOR_INPUTS["email"]}:</label>
                                    <div key="email">
                                        <div className="input-container">
                                            <IonIcon className="ion-icon" icon={ICON_FOR_INPUTS["email"]} />
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values["email"]}
                                                placeholder={PLACEHOLDER_FOR_INPUT["email"]}
                                                id="email"
                                            />
                                        </div>
                                        {emailState.isLoading && <div>...</div>}
                                        {errors["email"] && touched["email"] &&
                                            <div className="error-container">
                                                <p className="error">
                                                    {errors["email"]}
                                                </p>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit" disabled={!isValid || emailSendState.isLoading}>
                                    {emailSendState.isLoading ?
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                        <span>Продолжить</span>
                                    }
                                </button>
                                {!!emailSendState.error ?
                                    <p className="error-state">{emailSendState.error}</p> :
                                    (emailSendState.email) &&
                                    <p className="success-state">Отправлено на {emailSendState.email}</p>
                                }
                            </FirstForm>
                        );
                    }}
                </Formik>
            </div>
        </>
    );
};

export default EmailConfirmation;

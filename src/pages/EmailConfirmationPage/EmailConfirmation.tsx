import React, {FC} from "react";
import {Form, Formik, validateYupSchema, yupToFormErrors} from "formik";
import {useAppDispatch, useAppSelector} from "../../store/hook/redux";
import {fetchEmailAvailable, resendEmailConfirmation, sendEmailConfirmation} from "../../store/action-creators/email";
import * as Yup from "yup";
import {store} from "../../store/store";
import createDebounce from "../../util/debounce";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./EmailConfirmation.css"
import {ICON_FOR_INPUTS, LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT} from "../../constants";
import {IonIcon} from "@ionic/react";

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
                return InnerEmailSchema.validate({email: value}, context.options)
                    .then(async ({email}) => {
                        if (!email) { //for compatibility with $req yup context
                            return true;
                        }
                        const isAvailable = await emailDeb(email);
                        if (!isAvailable) {
                            return context.createError({message: "Почта недоступна"});
                        }
                        return true;
                    })
                    .catch((e) => {
                        if (e instanceof Yup.ValidationError) {
                            return context.createError({...e});
                        }
                        return context.createError({message: "Некорректная почта"});
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
            <div className="container-nav">
                <NavigationBar/>
                <div className="container-email">
                    <Formik
                        initialValues={initialValues}
                        validate={async (values) => {
                            try {
                                console.log("userEmail: " + !userEmail);
                                await validateYupSchema(values, EmailSchema, false, {req: !userEmail});
                            } catch (e) {
                                return yupToFormErrors(e);
                            }
                        }}
                        onSubmit={values => {
                            (userEmail && !values.email) ?
                                dispatch(resendEmailConfirmation()) :
                                dispatch(sendEmailConfirmation(values.email));
                        }}
                        enableReinitialize={false}
                    >
                        {props => {
                            const {
                                values,
                                touched,
                                errors,
                                isValid,
                                submitCount,
                                handleSubmit,
                                handleBlur,
                                handleChange
                            } = props;
                            return (
                                <Form className="screen-1" onSubmit={(e) => { console.log(e); e.nativeEvent.preventDefault(); handleSubmit(e)}}>
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
                                        <path d="M39 34L39 14" stroke="#000000" strokeWidth="4" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                    <div className="password">
                                        <label htmlFor="email">{LABEL_FOR_INPUTS["email"]}:</label>
                                        <div key="email">
                                            <div className="sec-2">
                                                <IonIcon className="ion-icon" icon={ICON_FOR_INPUTS["email"]}/>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["email"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["email"]}
                                                    className="form-control inp_text"
                                                    id="email"
                                                />
                                            </div>
                                            {emailState.isLoading && <div>...</div>}
                                            <p className="error">
                                                {errors["email"] && touched["email"] && errors["email"]}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="login" type="submit"
                                            disabled={!isValid || emailSendState.isLoading}>Отправить
                                    </button>
                                    {!!emailSendState.error ?
                                        <p className="error-state">{emailSendState.error}</p> :
                                        ( emailSendState.email) &&
                                        <p className="success-state">Отправлено на {emailSendState.email}</p>
                                    }
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default EmailConfirmation;

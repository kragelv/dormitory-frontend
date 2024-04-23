import { FC } from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import { useAppDispatch, useAppSelector } from "../store/hook/redux";
import { fetchEmailAvailable, resendEmailConfirmation, sendEmailConfirmation } from "../store/action-creators/email";
import * as Yup from "yup";
import { store } from "../store/store";
import createDebounce from "../util/debounce";
import NavigationBar from "../components/NavigationBar";

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
                            return context.createError({ message: "Почта не доступна" });
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
            <h2>Подтверждение почты</h2>
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
                    const { values, touched, errors, isValid, submitCount,  handleSubmit, handleBlur, handleChange } = props;
                    return (
                        <form className="pw-form" onSubmit={handleSubmit}>
                            <label htmlFor="email">Почта</label>
                            <div className="d-flex">
                                <input type="email"
                                    id="email"
                                    name="email"
                                    placeholder={userEmail ?? undefined}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email
                                            ? "text-input error"
                                            : "text-input"
                                    } />
                                {emailState.isLoading && <div>...</div>}
                            </div>
                            {errors.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                            <button type="submit" disabled={!isValid || emailSendState.isLoading}>Отправить</button>
                            {!!emailSendState.error ?
                                <p>{emailSendState.error}</p> :
                                (submitCount > 0 && emailSendState.email) && <p>Отправлено на {emailSendState.email}</p>
                            }
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default EmailConfirmation;

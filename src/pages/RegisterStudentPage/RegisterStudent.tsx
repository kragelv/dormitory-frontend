import React, {FC, ReactNode} from "react";
import {useTitle} from "../../globals";
import "./RegisterStudent.css"
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {Formik} from "formik";
import * as Yup from "yup";
import {login} from "../../store/action-creators/auth";
import {ICON_FOR_INPUTS, LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT} from "../../constants";
import {IonIcon} from "@ionic/react";

const RegisterStudent: FC = () => {
    useTitle("Регистрация студента")
    const shape = {
        cardNumber: Yup.string()
            .required('Номер пропускной карты является обязательным полем.')
            .max(64, 'Длина пропускного номера карты не может превышать 64 символа.'),
        surname: Yup.string()
            .required('Фамилия является обязательным полем.')
            .max(40, 'Длина фамилии не может превышать 40 символов.'),
        name: Yup.string()
            .required('Имя является обязательным полем.')
            .max(40, 'Длина имени не может превышать 40 символов.'),
        patronymic: Yup.string()
            .max(40, 'Длина отчества не может превышать 40 символов.'),
        birthPlace: Yup.string()
            .required('Место рождения является обязательным полем.')
            .max(255, 'Длина поля "Место рождения" не может превышать 255 символов.'),
        residentialAddress: Yup.string()
            .required('Адрес прописки является обязательным полем.')
            .max(255, 'Длина адреса прописки не может превышать 255 символов.'),
        yearOfFinish: Yup.date()
            .required('Год окончания УО является обязательным полем.'),
        password: Yup.string()
            .required('Пароль является обязательным полем.')
            .min(8, 'Пароль не может быть меньше 8 символов.')
            .max(255, 'Пароль не может превышать 255 символов.'),
        dateOfBirth: Yup.date()
            .required('Дата выдачи паспорта является обязательным полем.')
            .max(new Date(), 'Дата выдачи паспорта не может быть позже текущей даты.'),
    }

    return (
        <div className="container-nav">
            <Header/>
            <div className="report-container">
                <NavigationBar/>

                <div className="container-email">
                    <div className="leisure-form">
                        <Formik
                            validationSchema={Yup.object().shape(shape)}
                            initialValues={
                                {
                                    cardNumber: "",
                                    surname: "",
                                    name: "",
                                    patronymic: "",
                                    surnameBEL: "",
                                    nameBEL: "",
                                    patronymicBEL: "",
                                    dateOfBirth: new Date(),
                                    birthPlace: "",
                                    residentialAddress: "",
                                    phoneNumber: "",
                                    yearOfFinish: new Date(),

                                }
                            }
                            onSubmit={(values: {
                                cardNumber: string,
                                surname: string,
                                name: string,
                                patronymic: string,
                                surnameBEL: string,
                                nameBEL: string,
                                patronymicBEL: string,
                                dateOfBirth: Date,
                                birthPlace: string,
                                residentialAddress: string,
                                phoneNumber: string,
                                yearOfFinish: Date,

                            }) => {

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
                                    <div className="password">
                                        <label htmlFor="cardNumber">{LABEL_FOR_INPUTS["cardNumber"]}:</label>
                                        <div key="cardNumber">
                                            <div className="sec-2">
                                                <input
                                                    type="cardNumber"
                                                    name="cardNumber"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["cardNumber"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["cardNumber"]}
                                                    className="form-control inp_text"
                                                    id="cardNumber"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["cardNumber"] && touched["cardNumber"] && errors["cardNumber"]}
                                            </p>
                                        </div>
                                    </div>

                                    <p>Русский вариант:</p>

                                    <div className="password">
                                        <label htmlFor="surname">{LABEL_FOR_INPUTS["surname"]}:</label>
                                        <div key="surname">
                                            <div className="sec-2">
                                                <input
                                                    type="surname"
                                                    name="surname"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["surname"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["surname"]}
                                                    className="form-control inp_text"
                                                    id="surname"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["surname"] && touched["surname"] && errors["surname"]}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="password">
                                        <label htmlFor="name">{LABEL_FOR_INPUTS["name"]}:</label>
                                        <div key="name">
                                            <div className="sec-2">
                                                <input
                                                    type="name"
                                                    name="name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["name"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["name"]}
                                                    className="form-control inp_text"
                                                    id="name"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["name"] && touched["name"] && errors["name"]}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="password">
                                        <label htmlFor="patronymic">{LABEL_FOR_INPUTS["patronymic"]}:</label>
                                        <div key="patronymic">
                                            <div className="sec-2">
                                                <input
                                                    type="patronymic"
                                                    name="patronymic"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["patronymic"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["patronymic"]}
                                                    className="form-control inp_text"
                                                    id="patronymic"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["patronymic"] && touched["patronymic"] && errors["patronymic"]}
                                            </p>
                                        </div>
                                    </div>

                                    <p>Белорусский вариант:</p>

                                    <div className="password">
                                        <label htmlFor="surnameBEL">{LABEL_FOR_INPUTS["surname"]}:</label>
                                        <div key="surnameBEL">
                                            <div className="sec-2">
                                                <input
                                                    type="surnameBEL"
                                                    name="surnameBEL"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["surnameBEL"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["surname"]}
                                                    className="form-control inp_text"
                                                    id="surnameBEL"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["surnameBEL"] && touched["surnameBEL"] && errors["surnameBEL"]}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="password">
                                        <label htmlFor="nameBEL">{LABEL_FOR_INPUTS["name"]}:</label>
                                        <div key="nameBEL">
                                            <div className="sec-2">
                                                <input
                                                    type="nameBEL"
                                                    name="nameBEL"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["nameBEL"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["name"]}
                                                    className="form-control inp_text"
                                                    id="nameBEL"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["nameBEL"] && touched["nameBEL"] && errors["nameBEL"]}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="password">
                                        <label htmlFor="dateOfBirth">{LABEL_FOR_INPUTS["dateOfBirth"]}:</label>
                                        <div key="dateOfBirth">
                                            <div className="sec-2">
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["dateOfBirth"].toString()}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["dateOfBirth"]}
                                                    className="form-control inp_text"
                                                    id="dateOfBirth"
                                                />
                                            </div>
                                            <p className="error">
                                                {(errors["dateOfBirth"] as ReactNode) && (touched["dateOfBirth"] as ReactNode) && (errors["dateOfBirth"] as ReactNode)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="password">
                                        <label htmlFor="birthPlace">{LABEL_FOR_INPUTS["birthPlace"]}:</label>
                                        <div key="birthPlace">
                                            <div className="sec-2">
                                                <input
                                                    type="birthPlace"
                                                    name="birthPlace"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["birthPlace"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["birthPlace"]}
                                                    className="form-control inp_text"
                                                    id="birthPlace"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["birthPlace"] && touched["birthPlace"] && errors["birthPlace"]}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="password">
                                        <label
                                            htmlFor="residentialAddress">{LABEL_FOR_INPUTS["residentialAddress"]}:</label>
                                        <div key="residentialAddress">
                                            <div className="sec-2">
                                                <input
                                                    type="residentialAddress"
                                                    name="residentialAddress"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["residentialAddress"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["residentialAddress"]}
                                                    className="form-control inp_text"
                                                    id="residentialAddress"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["residentialAddress"] && touched["residentialAddress"] && errors["residentialAddress"]}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="password">
                                        <label
                                            htmlFor="phoneNumber">{LABEL_FOR_INPUTS["phoneNumber"]}:</label>
                                        <div key="phoneNumber">
                                            <div className="sec-2">
                                                <input
                                                    type="phoneNumber"
                                                    name="phoneNumber"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["phoneNumber"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["phoneNumber"]}
                                                    className="form-control inp_text"
                                                    id="phoneNumber"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["phoneNumber"] && touched["phoneNumber"] && errors["phoneNumber"]}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="password">
                                        <label
                                            htmlFor="yearOfFinish">{LABEL_FOR_INPUTS["yearOfFinish"]}:</label>
                                        <div key="yearOfFinish">
                                            <div className="sec-2">
                                                <input
                                                    type="date"
                                                    name="yearOfFinish"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values["phoneNumber"]}
                                                    placeholder={PLACEHOLDER_FOR_INPUT["yearOfFinish"]}
                                                    className="form-control inp_text"
                                                    id="yearOfFinish"
                                                />
                                            </div>
                                            <p className="error">
                                                {errors["yearOfFinish"] as ReactNode && touched["yearOfFinish"] as ReactNode && errors["yearOfFinish"] as ReactNode}
                                            </p>
                                        </div>
                                    </div>

                                    {/*<div className="password">*/}
                                    {/*    <label*/}
                                    {/*        htmlFor="isGoldMedal">{LABEL_FOR_INPUTS["isGoldMedal"]}:</label>*/}
                                    {/*    <div key="isGoldMedal">*/}
                                    {/*        <div className="sec-2">*/}
                                    {/*            <input*/}
                                    {/*                type="radio"*/}
                                    {/*                name="isGoldMedal"*/}
                                    {/*                onChange={handleChange}*/}
                                    {/*                onBlur={handleBlur}*/}
                                    {/*                value={values["isGoldMedal"]}*/}
                                    {/*                placeholder={PLACEHOLDER_FOR_INPUT["isGoldMedal"]}*/}
                                    {/*                className="form-control inp_text"*/}
                                    {/*                id="isGoldMedal"*/}
                                    {/*            />*/}
                                    {/*            <input*/}
                                    {/*                type="radio"*/}
                                    {/*                name="isGoldMedal"*/}
                                    {/*                onChange={handleChange}*/}
                                    {/*                onBlur={handleBlur}*/}
                                    {/*                value={values["isGoldMedal"]}*/}
                                    {/*                placeholder={PLACEHOLDER_FOR_INPUT["isGoldMedal"]}*/}
                                    {/*                className="form-control inp_text"*/}
                                    {/*                id="isGoldMedal"*/}
                                    {/*            />*/}
                                    {/*        </div>*/}
                                    {/*        <p className="error">*/}
                                    {/*            {errors["isGoldMedal"] && touched["isGoldMedal"] && errors["isGoldMedal"]}*/}
                                    {/*        </p>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {/*<div className="password">*/}
                                    {/*    <label*/}
                                    {/*        htmlFor="isGoldMedal">{LABEL_FOR_INPUTS["isGoldMedal"]}:</label>*/}
                                    {/*    <div key="isGoldMedal">*/}
                                    {/*        <div className="sec-2">*/}
                                    {/*            <input*/}
                                    {/*                type="radio"*/}
                                    {/*                name="isGoldMedal"*/}
                                    {/*                onChange={handleChange}*/}
                                    {/*                onBlur={handleBlur}*/}
                                    {/*                value={values["isGoldMedal"]}*/}
                                    {/*                placeholder={PLACEHOLDER_FOR_INPUT["isGoldMedal"]}*/}
                                    {/*                className="form-control inp_text"*/}
                                    {/*                id="isGoldMedal"*/}
                                    {/*            />*/}
                                    {/*            <input*/}
                                    {/*                type="radio"*/}
                                    {/*                name="isGoldMedal"*/}
                                    {/*                onChange={handleChange}*/}
                                    {/*                onBlur={handleBlur}*/}
                                    {/*                value={values["isGoldMedal"]}*/}
                                    {/*                placeholder={PLACEHOLDER_FOR_INPUT["isGoldMedal"]}*/}
                                    {/*                className="form-control inp_text"*/}
                                    {/*                id="isGoldMedal"*/}
                                    {/*            />*/}
                                    {/*        </div>*/}
                                    {/*        <p className="error">*/}
                                    {/*            {errors["isGoldMedal"] && touched["isGoldMedal"] && errors["isGoldMedal"]}*/}
                                    {/*        </p>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    <button className="login" type="submit">Логин</button>
                                    {/*<div className="footer"><span></span><span>Забыли пароль?</span></div>*/}
                                </form>

                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterStudent

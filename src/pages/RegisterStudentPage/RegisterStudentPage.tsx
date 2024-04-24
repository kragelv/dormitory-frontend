import React, {FC, ReactNode} from "react";
import {useTitle} from "../../globals";
import "./RegisterStudentPage.css"
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {Formik} from "formik";
import * as Yup from "yup";
import {login} from "../../store/action-creators/auth";
import {ICON_FOR_INPUTS, LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT} from "../../constants";
import {IonIcon} from "@ionic/react";
import SecondForm from "../../components/SecondForm/SecondForm";

interface IRegisterStudentForm {
    cardId: string,
    surname: string,
    name: string,
    patronymic: string,
    passportSeries: string,
    passportNumber: number,
    birthdate: Date,
    passportIssueDate: Date,
    passportIssuePlace: string,
    residentialAddress: string,
    passportId: string,
    phoneNumber: string,
    representativeSurname: string,
    representativeName: string,
    representativePatronymic: string,
    representativePassportSeries: string,
    representativePassportNumber: number,
    representativePassportId: string,
    representativePassportIssueDate: Date,
    representativePassportIssuePlace: string,
    representativeResidentialAddress: string,
    representativePasportId: string,
    roomNumber: number,
    startDate: Date,
    expiryDate: Date
}

const initialValues: IRegisterStudentForm = {
    cardId: '',
    surname: '',
    name: '',
    patronymic: '',
    passportSeries: '',
    passportNumber: 5454245,
    birthdate: new Date(),
    passportIssueDate: new Date(),
    passportIssuePlace: '',
    residentialAddress: '',
    passportId: '',
    phoneNumber: '',
    representativeSurname: '',
    representativeName: '',
    representativePatronymic: '',
    representativePassportSeries: '',
    representativePassportNumber: 3545441,
    representativePassportId: '',
    representativePassportIssueDate: new Date(),
    representativePassportIssuePlace: '',
    representativeResidentialAddress: '',
    representativePasportId: '',
    roomNumber: 3847383,
    startDate: new Date(),
    expiryDate: new Date()
}

const RegisterStudentSchema = Yup.object({
    cardId: Yup.string().required('Пожалуйста, укажите идентификатор карты.'),
    surname: Yup.string().required('Пожалуйста, укажите фамилию.'),
    name: Yup.string().required('Пожалуйста, укажите имя.'),
    patronymic: Yup.string().required('Пожалуйста, укажите отчество.'),
    passportSeries: Yup.string().required('Пожалуйста, укажите серию паспорта.'),
    passportNumber: Yup.number().required('Пожалуйста, укажите номер паспорта.'),
    birthdate: Yup.date().required('Пожалуйста, укажите дату рождения.').max(new Date(), 'Дата рождения должна быть до сегодняшнего дня.'),
    passportIssueDate: Yup.date().required('Пожалуйста, укажите дату выдачи паспорта.').max(new Date(), 'Дата выдачи паспорта должна быть до сегодняшнего дня.'),
    passportIssuePlace: Yup.string().required('Пожалуйста, укажите место выдачи паспорта.'),
    residentialAddress: Yup.string().required('Пожалуйста, укажите место проживания.'),
    passportId: Yup.string().required('Пожалуйста, укажите идентификатор паспорта.'),
    phoneNumber: Yup.string().required('Пожалуйста, укажите номер телефона.'),
    representativeSurname: Yup.string().required('Пожалуйста, укажите фамилию представителя.'),
    representativeName: Yup.string().required('Пожалуйста, укажите имя представителя.'),
    representativePatronymic: Yup.string().required('Пожалуйста, укажите отчество представителя.'),
    representativePassportSeries: Yup.string().required('Пожалуйста, укажите серию паспорта представителя.'),
    representativePassportNumber: Yup.number().required('Пожалуйста, укажите номер паспорта представителя.'),
    representativePassportIssueDate: Yup.date().required('Пожалуйста, укажите дату выдачи паспорта представителя.').max(new Date(), 'Дата выдачи паспорта представителя должна быть до сегодняшнего дня.'),
    representativePassportIssuePlace: Yup.string().required('Пожалуйста, укажите место выдачи паспорта представителя.'),
    representativeResidentialAddress: Yup.string().required('Пожалуйста, укажите место проживания представителя.'),
    representativePasportId: Yup.string().required('Пожалуйста, укажите идентификатор паспорта представителя.'),
    roomNumber: Yup.number().required('Пожалуйста, укажите номер комнаты.'),
    startDate: Yup.date().required('Пожалуйста, укажите дату начала.').min(new Date(), 'Дата начала должна быть после сегодняшнего дня.'),
    expiryDate: Yup.date().required('Пожалуйста, укажите дату окончания.').min(Yup.ref('startDate'), 'Дата окончания должна быть после даты начала.'),    
})

const RegisterStudent: FC = () => {
    useTitle("Регистрация студента")
    return (
        <>
            <Header />
            <NavigationBar />
            <div className="sec-container">
            <Formik
                validationSchema={RegisterStudentSchema}
                initialValues={initialValues}
                
                onSubmit={(values) => {
                    
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
                        <SecondForm noValidate onSubmit={handleSubmit}>
                            <div className="form-field-container">
                                <label htmlFor="cardNumber">{LABEL_FOR_INPUTS["cardNumber"]}: </label>
                                <div className="input-container">
                                    <input
                                        type="cardId"
                                        name="cardId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={PLACEHOLDER_FOR_INPUT["cardNumber"]}
                                        className="inp_text"
                                        id="cardId"
                                    />
                                </div>
                                <p className="error">
                                    {errors["cardId"] && touched["cardId"] && errors["cardId"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="surname">{LABEL_FOR_INPUTS["surname"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="surname"
                                        name="surname"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["surname"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["surname"]}
                                        className=""
                                        id="surname"
                                    />
                                </div>
                                <p className="error">
                                    {errors["surname"] && touched["surname"] && errors["surname"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="name">{LABEL_FOR_INPUTS["name"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="name"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["name"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["name"]}
                                        className=""
                                        id="name"
                                    />
                                </div>
                                <p className="error">
                                    {errors["name"] && touched["name"] && errors["name"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="patronymic">{LABEL_FOR_INPUTS["patronymic"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="patronymic"
                                        name="patronymic"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["patronymic"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["patronymic"]}
                                        className=""
                                        id="patronymic"
                                    />
                                </div>
                                <p className="error">
                                    {errors["patronymic"] && touched["patronymic"] && errors["patronymic"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="passportSeries">{LABEL_FOR_INPUTS["passportSeries"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="passportSeries"
                                        name="passportSeries"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["passportSeries"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["passportSeries"]}
                                        className=""
                                        id="passportSeries"
                                    />
                                </div>
                                <p className="error">
                                    {errors["passportSeries"] && touched["passportSeries"] && errors["passportSeries"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="passportSeries">{LABEL_FOR_INPUTS["passportNumber"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="passportNumber"
                                        name="passportNumber"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["passportNumber"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["passportNumber"]}
                                        className=""
                                        id="passportNumber"
                                    />
                                </div>
                                <p className="error">
                                    {errors["passportNumber"] && touched["passportNumber"] && errors["passportNumber"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="birthdate">{LABEL_FOR_INPUTS["dateOfBirth"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="date"
                                        name="birthdate"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["birthdate"].toString()}
                                        placeholder={PLACEHOLDER_FOR_INPUT["dateOfBirth"]}
                                        className=""
                                        id="birthdate"
                                    />
                                </div>
                                <p className="error">
                                    {(errors["birthdate"] as ReactNode) && (touched["birthdate"] as ReactNode) && (errors["birthdate"] as ReactNode)}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="passportIssueDate">{LABEL_FOR_INPUTS["passportIssueDate"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="date"
                                        name="passportIssueDate"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["passportIssueDate"].toString()}
                                        placeholder={PLACEHOLDER_FOR_INPUT["passportIssueDate"]}
                                        className=""
                                        id="passportIssueDate"
                                    />
                                </div>
                                <p className="error">
                                    {(errors["passportIssueDate"] as ReactNode) && (touched["passportIssueDate"] as ReactNode) && (errors["passportIssueDate"] as ReactNode)}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="residentialAddress">{LABEL_FOR_INPUTS["residentialAddress"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="residentialAddress"
                                        name="residentialAddress"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["residentialAddress"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["residentialAddress"]}
                                        className=""
                                        id="residentialAddress"
                                    />
                                </div>
                                <p className="error">
                                    {errors["residentialAddress"] && touched["residentialAddress"] && errors["residentialAddress"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="passportId">{LABEL_FOR_INPUTS["passportId"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="passportId"
                                        name="passportId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["passportId"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["passportId"]}
                                        className=""
                                        id="passportId"
                                    />
                                </div>
                                <p className="error">
                                    {errors["passportId"] && touched["passportId"] && errors["passportId"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="phoneNumber">{LABEL_FOR_INPUTS["phoneNumber"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="phoneNumber"
                                        name="phoneNumber"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["phoneNumber"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["phoneNumber"]}
                                        className=""
                                        id="phoneNumber"
                                    />
                                </div>
                                <p className="error">
                                    {errors["phoneNumber"] && touched["phoneNumber"] && errors["phoneNumber"]}
                                </p>
                            </div>

                            <p>Информация о законном представителе</p>

                            <div className="form-field-container">
                                <label htmlFor="representativeSurname">{LABEL_FOR_INPUTS["surname"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="surname"
                                        name="surname"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["representativeSurname"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["surname"]}
                                        className=""
                                        id="representativeSurname"
                                    />
                                </div>
                                <p className="error">
                                    {errors["surname"] && touched["surname"] && errors["surname"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="representativeName">{LABEL_FOR_INPUTS["name"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="name"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["representativeName"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["name"]}
                                        className=""
                                        id="representativeName"
                                    />
                                </div>
                                <p className="error">
                                    {errors["name"] && touched["name"] && errors["name"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="representativePatronymic">{LABEL_FOR_INPUTS["patronymic"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="patronymic"
                                        name="patronymic"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["representativePatronymic"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["patronymic"]}
                                        className=""
                                        id="representativePatronymic"
                                    />
                                </div>
                                <p className="error">
                                    {errors["patronymic"] && touched["patronymic"] && errors["patronymic"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="representativePassportSeries">{LABEL_FOR_INPUTS["passportSeries"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="passportSeries"
                                        name="passportSeries"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["representativePassportSeries"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["passportSeries"]}
                                        className=""
                                        id="representativePassportSeries"
                                    />
                                </div>
                                <p className="error">
                                    {errors["passportSeries"] && touched["passportSeries"] && errors["passportSeries"]}
                                </p>
                            </div>


                           

                            <div className="form-field-container">
                                <label htmlFor="representativePassportIssueDate">{LABEL_FOR_INPUTS["passportIssueDate"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="date"
                                        name="representativePassportIssueDate"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["passportIssueDate"].toString()}
                                        placeholder={PLACEHOLDER_FOR_INPUT["passportIssueDate"]}
                                        className=""
                                        id="representativePassportIssueDate"
                                    />
                                </div>
                                <p className="error">
                                    {(errors["representativePassportIssueDate"] as ReactNode) && (touched["representativePassportIssueDate"] as ReactNode) && (errors["representativePassportIssueDate"] as ReactNode)}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="representativeResidentialAddress">{LABEL_FOR_INPUTS["residentialAddress"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="residentialAddress"
                                        name="representativeResidentialAddress"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["representativeResidentialAddress"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["residentialAddress"]}
                                        className=""
                                        id="representativeResidentialAddress"
                                    />
                                </div>
                                <p className="error">
                                    {errors["residentialAddress"] && touched["residentialAddress"] && errors["residentialAddress"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="representativePassportId">{LABEL_FOR_INPUTS["passportId"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="passportId"
                                        name="representativePassportId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["representativePassportId"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["passportId"]}
                                        className=""
                                        id="representativePassportId"
                                    />
                                </div>
                                <p className="error">
                                    {errors["representativePassportId"] && touched["representativePassportId"] && errors["representativePassportId"]}
                                </p>
                            </div>

                            <button className="btn btn-primary" type="submit">Оформить договор</button>
                        </SecondForm>
                    )}
                </Formik>
            </div>
        </>
            
    )
}

export default RegisterStudent

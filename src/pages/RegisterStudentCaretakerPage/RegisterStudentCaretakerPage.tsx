import React, {FC, ReactNode} from "react";
import {useTitle} from "../../globals";
import "./RegisterStudentCaretakerPage.css"
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {Formik} from "formik";
import * as Yup from "yup";
import {login} from "../../store/action-creators/auth";
import {ICON_FOR_INPUTS, LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT} from "../../constants";
import {IonIcon} from "@ionic/react";
import SecondForm from "../../components/SecondForm/SecondForm";

interface IRegisterStudentCaretakerForm {
    cardId: string,
    contractId: string,
    surname: string,
    surnameBy: string,
    name: string,
    nameBy: string,
    patronymic: string,
    patronymicBy: string,
    passportSeries: string,
    passportNumber: number,
    birthdate: Date,
    birthPlace: string,
    residentialAddress: string,
    phoneNumber: string,
    group: string, 
    graduationYear: number,
    gradePointAverage: number,
    aboutCollege: string,
    hobbies: string,
    motherSurname: string,
    motherName: string,
    motherPatronymic: string,
    motherWorkplace: string,
    motherPhoneNumber: string,
    motherPassportId: string,
    fatherSurname: string,
    fatherName: string,
    fatherPatronymic: string,
    fatherWorkplace: string,
    fatherPhoneNumber: string,
    fatherPassportId: string
}

const initialValues: IRegisterStudentCaretakerForm = {
    cardId: '',
    contractId: '',
    surname: '',
    surnameBy: '',
    name: '',
    nameBy: '',
    patronymic: '',
    patronymicBy: '',
    passportSeries: '',
    passportNumber: 5454245,
    birthdate: new Date(),
    birthPlace: '',
    residentialAddress: '',
    phoneNumber: '',
    group: '',
    graduationYear: 0,
    gradePointAverage: 0,
    aboutCollege: '',
    hobbies: '',
    motherSurname: '',
    motherName: '',
    motherPatronymic: '',
    motherWorkplace: '',
    motherPhoneNumber: '',
    motherPassportId: '',
    fatherSurname: '',
    fatherName: '',
    fatherPatronymic: '',
    fatherWorkplace: '',
    fatherPhoneNumber: '',
    fatherPassportId: ''
}

const RegisterStudentCaretakerSchema = Yup.object({
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
    roomNumber: Yup.number().required('Пожалуйста, укажите номер комнаты.'),
})

const RegisterStudentCaretaker: FC = () => {
    useTitle("Регистрация студента")
    return (
        <>
            <Header />
            <NavigationBar />
            <div className="sec-container">
            <Formik
                validationSchema={RegisterStudentCaretakerSchema}
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
                            {/* Поставить значение поля в соответствии с пришедшим */}
                            <div className="form-field-container">
                                <label htmlFor="contractId">{LABEL_FOR_INPUTS["contractId"]}: </label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        name="contractId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder={PLACEHOLDER_FOR_INPUT["contractId"]}
                                        className=""
                                        id="contractId"
                                        readOnly
                                    />
                                </div>
                                <p className="error">
                                    {errors["contractId"] && touched["contractId"] && errors["contractId"]}
                                </p>
                            </div>

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
                                <label htmlFor="surnameBy">{LABEL_FOR_INPUTS["surnameBy"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        name="surnameBy"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["surnameBy"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["surnameBy"]}
                                        className=""
                                        id="surnameBy"
                                    />
                                </div>
                                <p className="error">
                                    {errors["surnameBy"] && touched["surnameBy"] && errors["surnameBy"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="nameBy">{LABEL_FOR_INPUTS["nameBy"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        name="nameBy"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["name"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["nameBy"]}
                                        className=""
                                        id="nameBy"
                                    />
                                </div>
                                <p className="error">
                                    {errors["nameBy"] && touched["nameBy"] && errors["nameBy"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="patronymicBy">{LABEL_FOR_INPUTS["patronymicBy"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="patronymic"
                                        name="patronymicBy"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["patronymicBy"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["patronymicBy"]}
                                        className=""
                                        id="patronymicBy"
                                    />
                                </div>
                                <p className="error">
                                    {errors["patronymic"] && touched["patronymic"] && errors["patronymic"]}
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
                                <label
                                    htmlFor="birthPlace">{LABEL_FOR_INPUTS["birthPlace"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="residentialAddress"
                                        name="birthPlace"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["birthPlace"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["birthPlace"]}
                                        className=""
                                        id="birthPlace"
                                    />
                                </div>
                                <p className="error">
                                    {errors["birthPlace"] && touched["birthPlace"] && errors["birthPlace"]}
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

                            <div className="form-field-container">
                                <label
                                    htmlFor="group">{LABEL_FOR_INPUTS["group"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        name="group"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["group"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["group"]}
                                        className=""
                                        id="group"
                                    />
                                </div>
                                <p className="error">
                                    {errors["group"] && touched["group"] && errors["group"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="graduationYear">{LABEL_FOR_INPUTS["graduationYear"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        name="graduationYear"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["graduationYear"]}
                                        className=""
                                        id="graduationYear"
                                    />
                                </div>
                                <p className="error">
                                    {errors["graduationYear"] && touched["graduationYear"] && errors["graduationYear"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="gradePointAverage">{LABEL_FOR_INPUTS["gradePointAverage"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        max={10}
                                        min={1}
                                        step={0.1}
                                        name="gradePointAverage"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["gradePointAverage"]}
                                        className=""
                                        id="gradePointAverage"
                                    />
                                </div>
                                <p className="error">
                                    {errors["gradePointAverage"] && touched["gradePointAverage"] && errors["gradePointAverage"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="aboutCollege">{LABEL_FOR_INPUTS["aboutCollege"]}:</label>
                                <div className="input-container">
                                    <textarea
                                        name="aboutCollege"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["aboutCollege"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["aboutCollege"]}
                                        className=""
                                        id="aboutCollege"
                                    />
                                </div>
                                <p className="error">
                                    {errors["aboutCollege"] && touched["aboutCollege"] && errors["aboutCollege"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="hobbies">{LABEL_FOR_INPUTS["hobbies"]}:</label>
                                <div className="input-container">
                                    <textarea
                                        name="hobbies"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["hobbies"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["hobbies"]}
                                        className=""
                                        id="hobbies"
                                    />
                                </div>
                                <p className="error">
                                    {errors["hobbies"] && touched["hobbies"] && errors["hobbies"]}
                                </p>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="hasGoldMedal"/>
                                <label className="form-check-label" htmlFor="hasGoldMedal">
                                    Имеет золотую медаль
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="wasInMilitary"/>
                                <label className="form-check-label" htmlFor="wasInMilitary">
                                    Служил в ВС РБ
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="isStudentUnionMember"/>
                                <label className="form-check-label" htmlFor="isStudentUnionMember">
                                    Член студенческого актива
                                </label>
                            </div>

                            <p><b>Информация о матери</b></p>

                            <div className="form-field-container">
                                <label htmlFor="motherSurname">{LABEL_FOR_INPUTS["surname"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="surname"
                                        name="motherSurname"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["motherSurname"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["surname"]}
                                        className=""
                                        id="motherSurname"
                                    />
                                </div>
                                <p className="error">
                                    {errors["motherSurname"] && touched["motherSurname"] && errors["motherSurname"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="motherName">{LABEL_FOR_INPUTS["name"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="name"
                                        name="motherName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["motherName"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["name"]}
                                        className=""
                                        id="motherName"
                                    />
                                </div>
                                <p className="error">
                                    {errors["motherName"] && touched["motherName"] && errors["motherName"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="motherPatronymic">{LABEL_FOR_INPUTS["patronymic"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="patronymic"
                                        name="motherPatronymic"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["motherPatronymic"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["patronymic"]}
                                        className=""
                                        id="motherPatronymic"
                                    />
                                </div>
                                <p className="error">
                                    {errors["motherPatronymic"] && touched["motherPatronymic"] && errors["motherPatronymic"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="motherWorkplace">{LABEL_FOR_INPUTS["workplace"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        name="motherWorkplace"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["motherWorkplace"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["workplace"]}
                                        className=""
                                        id="motherWorkplace"
                                    />
                                </div>
                                <p className="error">
                                    {errors["motherWorkplace"] && touched["motherWorkplace"] && errors["motherWorkplace"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="motherPhoneNumber">{LABEL_FOR_INPUTS["phoneNumber"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="phoneNumber"
                                        name="motherPhoneNumber"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["motherPhoneNumber"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["phoneNumber"]}
                                        className=""
                                        id="motherPhoneNumber"
                                    />
                                </div>
                                <p className="error">
                                    {errors["motherPhoneNumber"] && touched["motherPhoneNumber"] && errors["motherPhoneNumber"]}
                                </p>
                            </div>
                           

                            

                            <div className="form-field-container">
                                <label
                                    htmlFor="motherPassportId">{LABEL_FOR_INPUTS["passportId"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="passportId"
                                        name="motherPassportId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["motherPassportId"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["passportId"]}
                                        className=""
                                        id="motherPassportId"
                                    />
                                </div>
                                <p className="error">
                                    {errors["motherPassportId"] && touched["motherPassportId"] && errors["motherPassportId"]}
                                </p>
                            </div>

                            <p><b>Информация об отце</b></p>

                            <div className="form-field-container">
                                <label htmlFor="fatherSurname">{LABEL_FOR_INPUTS["surname"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="surname"
                                        name="fatherSurname"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["fatherSurname"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["surname"]}
                                        className=""
                                        id="fatherSurname"
                                    />
                                </div>
                                <p className="error">
                                    {errors["fatherSurname"] && touched["fatherSurname"] && errors["fatherSurname"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="fatherName">{LABEL_FOR_INPUTS["name"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="name"
                                        name="fatherName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["fatherName"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["name"]}
                                        className=""
                                        id="fatherName"
                                    />
                                </div>
                                <p className="error">
                                    {errors["fatherName"] && touched["fatherName"] && errors["fatherName"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="fatherPatronymic">{LABEL_FOR_INPUTS["patronymic"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="patronymic"
                                        name="fatherPatronymic"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["fatherPatronymic"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["patronymic"]}
                                        className=""
                                        id="fatherPatronymic"
                                    />
                                </div>
                                <p className="error">
                                    {errors["fatherPatronymic"] && touched["fatherPatronymic"] && errors["fatherPatronymic"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label htmlFor="fatherWorkplace">{LABEL_FOR_INPUTS["workplace"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        name="fatherWorkplace"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["fatherWorkplace"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["workplace"]}
                                        className=""
                                        id="fatherWorkplace"
                                    />
                                </div>
                                <p className="error">
                                    {errors["fatherWorkplace"] && touched["fatherWorkplace"] && errors["fatherWorkplace"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="fatherPhoneNumber">{LABEL_FOR_INPUTS["phoneNumber"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="phoneNumber"
                                        name="fatherPhoneNumber"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["fatherPhoneNumber"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["phoneNumber"]}
                                        className=""
                                        id="fatherPhoneNumber"
                                    />
                                </div>
                                <p className="error">
                                    {errors["fatherPhoneNumber"] && touched["fatherPhoneNumber"] && errors["fatherPhoneNumber"]}
                                </p>
                            </div>
                           

                            

                            <div className="form-field-container">
                                <label
                                    htmlFor="fatherPassportId">{LABEL_FOR_INPUTS["passportId"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="passportId"
                                        name="fatherPassportId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["fatherPassportId"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["passportId"]}
                                        className=""
                                        id="fatherPassportId"
                                    />
                                </div>
                                <p className="error">
                                    {errors["fatherPassportId"] && touched["fatherPassportId"] && errors["fatherPassportId"]}
                                </p>
                            </div>

                            <button className="btn btn-primary" type="submit">Оформить анкету студента</button>
                        </SecondForm>
                    )}
                </Formik>
            </div>
        </>
            
    )
}

export default RegisterStudentCaretaker

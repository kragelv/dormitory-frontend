import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { FC, useEffect, useState, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import Table from "../../components/Table/Table";
import { dayOfWeekNames, fullNameToString, toHm, useTitle } from "../../globals";
import { Navigate, useParams } from "react-router-dom";
import { fetchLeisure } from "../../store/action-creators/leisure";
import { UserType } from "../../models/auth/authorities";
import * as Yup from "yup";
import {Formik} from "formik";
import {ICON_FOR_INPUTS, LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT} from "../../constants";
import SecondForm from "../../components/SecondForm/SecondForm";
import './RegisterEmployeePage.css';

interface IRegisterEmployeeForm {
    cardId: string,
    surname: string,
    name: string,
    patronymic: string,
    dateOfBirth: Date,
    residentialAddress: string,
    phoneNumber: string,
    password: string,
    role: string
}

const initialValues: IRegisterEmployeeForm = {
    cardId: '',
    surname: '',
    name: '',
    patronymic: '',
    dateOfBirth: new Date(),
    residentialAddress: '',
    phoneNumber: '',
    password: '',
    role: ''
}

const RegisterEmployeeSchema = Yup.object({
    cardId: Yup.string()
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
    dateOfBirth: Yup.date()
        .required('Дата рождения является обязательным полем.')
        .max(new Date(), 'Дата рождения не может быть позже текущей даты.'),
    residentialAddress: Yup.string()
        .required('Адрес прописки является обязательным полем.')
        .max(255, 'Длина адреса прописки не может превышать 255 символов.'),
    phoneNumber: Yup.string()
        .required('Номер телефона является обязательным полем'),
    password: Yup.string()
        .min(8, 'Пароль не может быть меньше 8 символов.')
        .max(255, 'Пароль не может превышать 255 символов.')        
})

const RegisterEmployee: FC = () => {
    useTitle("Регистрация сотрудника")
    const dispatch = useAppDispatch();
    return (
        <>
            <Header />
            <NavigationBar />
            <div className="sec-container">
            <Formik
                validationSchema={RegisterEmployeeSchema}
                initialValues={initialValues}
                
                onSubmit={(values: {
                    cardId: string,
                    surname: string,
                    name: string,
                    patronymic: string,
                    dateOfBirth: Date,
                    residentialAddress: string,
                    phoneNumber: string,
                    password: string,
                    role: string
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

                            
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="role" id="caretaker" value="ROLE_CARETAKER" required/>
                                <label className="form-check-label" htmlFor="exampleRadios3">
                                    Воспитатель
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="role" id="head" value="ROLE_HEAD" />
                                <label className="form-check-label" htmlFor="exampleRadios3">
                                    Заведующий общежитием
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="role" id="night_duty" value="ROLE_NIGHT_DUTY" />
                                <label className="form-check-label" htmlFor="exampleRadios3">
                                    Ночной дежурный
                                </label>
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
                                <label htmlFor="dateOfBirth">{LABEL_FOR_INPUTS["dateOfBirth"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["dateOfBirth"].toString()}
                                        placeholder={PLACEHOLDER_FOR_INPUT["dateOfBirth"]}
                                        className=""
                                        id="dateOfBirth"
                                    />
                                </div>
                                <p className="error">
                                    {(errors["dateOfBirth"] as ReactNode) && (touched["dateOfBirth"] as ReactNode) && (errors["dateOfBirth"] as ReactNode)}
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
                            <button className="btn btn-primary" type="submit">Регистрация</button>
                        </SecondForm>
                    )}
                </Formik>
            </div>
        </>
            
    )
}

export default RegisterEmployee;

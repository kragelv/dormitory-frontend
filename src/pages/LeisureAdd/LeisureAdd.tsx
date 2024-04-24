import React, {ReactNode} from 'react'
import './LeisureAdd.css'
import {dayOfWeekNames, useTitle} from "../../globals";
import {Field, Formik} from "formik";
import * as Yup from "yup";
import {LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT} from "../../constants";
import SecondForm from '../../components/SecondForm/SecondForm';
import Header from '../../components/Header/Header';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { DayOfWeek } from '../../models/leisure/DayOfWeek';

const LeisureAdd = () => {
    useTitle("Создание кружка")
    const shape = {
        nameOfLeisure: Yup.string()
            .required("Название кружка это обязательное поле")
            .min(6, "Название кружка состоит из минимум 6 знаков"),
        timeOfLeisure: Yup.date()
            .required("Время кружка ялвяется обязательным полем"),
        dayOfLeisure: Yup.string()
            .required("День недели это обязательное поле"),
    }
    return (
        <>
            <Header />
            <NavigationBar />
            <div className="sec-container">
                <Formik
                    validationSchema={Yup.object().shape(shape)}
                    initialValues={
                        {
                            nameOfLeisure: "",
                            timeOfLeisure: new Date(),
                            dayOfLeisure: new Date(),
                        }
                    }
                    onSubmit={(values: { nameOfLeisure: string, timeOfLeisure: Date, dayOfLeisure: Date }) => {
                        console.log(values)
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
                                <label
                                    htmlFor="nameOfLeisure">{LABEL_FOR_INPUTS["nameOfLeisure"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        name="nameOfLeisure"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["nameOfLeisure"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["nameOfLeisure"]}
                                        className=""
                                        id="nameOfLeisure"
                                    />
                                </div>
                                <p className="error">
                                    {errors["nameOfLeisure"] && touched["nameOfLeisure"] && errors["nameOfLeisure"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="timeOfLeisure">{LABEL_FOR_INPUTS["timeOfLeisure"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="time"
                                        name="timeOfLeisure"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["timeOfLeisure"].toString()}
                                        placeholder={PLACEHOLDER_FOR_INPUT["timeOfLeisure"]}
                                        className=""
                                        id="timeOfLeisure"
                                    />
                                </div>
                                <p className="error">
                                    {(errors["timeOfLeisure"] as ReactNode) && (touched["timeOfLeisure"] as ReactNode) && (errors["timeOfLeisure"] as ReactNode)}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="dayOfLeisure">{LABEL_FOR_INPUTS["dayOfLeisure"]}:</label>
                                <div className="input-container">

                                    <Field as="select" id="dayOfLeisure" name="dayOfLeisure" placeholder="Выберите день недели">
                                        {(Object.keys(DayOfWeek) as Array<keyof typeof DayOfWeek>).map(key => (
                                            <option key={key} value={dayOfWeekNames[DayOfWeek[key]]}>{dayOfWeekNames[DayOfWeek[key]]}</option>
                                        ))}
                                    </Field>
                                
                                    <p className="error">
                                        {errors["dayOfLeisure"] as ReactNode && touched["dayOfLeisure"] as ReactNode && errors["dayOfLeisure"] as ReactNode}
                                    </p>
                                </div>
                            </div>

                            <button className="btn btn-primary" type="submit">Создать кружок</button>
                        </SecondForm>

                    )}
                </Formik>
            </div>
        </>
    )
}

export default LeisureAdd

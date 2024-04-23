import React, {ReactNode} from 'react'
import './LeisureAdd.css'
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {useTitle} from "../../globals";
import {Field, Formik} from "formik";
import * as Yup from "yup";
import {login} from "../../store/action-creators/auth";
import {ICON_FOR_INPUTS, LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT} from "../../constants";
import {IonIcon} from "@ionic/react";

const LeisureAdd = () => {
    useTitle("Создание кружка")
    const shape = {
        nameOfLeisure: Yup.string()
            .required("Название кружка это обязательное поле")
            .min(6, "Название кружка состоит из минимум 6 знаков"),
        timeOfLeisure: Yup.string()
            .required("Время это обязательное поле"),
        dayOfLeisure: Yup.string()
            .required("День недели это обязательное поле"),
    }
    return (
        // <div className=" container-nav ">
        //     <Header/>
        //     <div className=" leisure-container">
        //         <NavigationBar/>
        //
        //         <div className="container-email">
        //             <div className="leisure-form">
        //                 <div className="leisure-items">
        //                     <p className="leisure-item"><b>Название:</b> Основы бизнеса</p>
        //                     <p className="leisure-item"><b>День недели:</b> пятница</p>
        //                     <p className="leisure-item"><b>Время:</b> 14:00</p>
        //                 </div>
        //                 <button className="edit">Сохранить</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="container">
            <Formik
                validationSchema={Yup.object().shape(shape)}
                initialValues={
                    {
                        nameOfLeisure: "",
                        timeOfLeisure: new Date(),
                        dayOfLeisure: new Date()
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
                    <form className="screen-1" noValidate onSubmit={handleSubmit}>
                        <div className="password">
                            <label htmlFor="nameOfLeisure">{LABEL_FOR_INPUTS["nameOfLeisure"]}:</label>
                            <div key="nameOfLeisure">
                                <div className="sec-2">
                                    <input
                                        type="nameOfLeisure"
                                        name="nameOfLeisure"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["nameOfLeisure"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["nameOfLeisure"]}
                                        className="form-control inp_text"
                                        id="nameOfLeisure"
                                    />
                                </div>
                                <p className="error">
                                    {errors["nameOfLeisure"] && touched["nameOfLeisure"] && errors["nameOfLeisure"]}
                                </p>
                            </div>
                        </div>

                        <div className="password">
                            <label htmlFor="timeOfLeisure">{LABEL_FOR_INPUTS["timeOfLeisure"]}:</label>
                            <div key="timeOfLeisure">
                                <div className="sec-2">
                                    <input
                                        type="time"
                                        name="timeOfLeisure"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["timeOfLeisure"].toString()}
                                        placeholder={PLACEHOLDER_FOR_INPUT["timeOfLeisure"]}
                                        className="form-control inp_text"
                                        id="timeOfLeisure"
                                    />
                                </div>
                                <p className="error">
                                    {errors["timeOfLeisure"] as ReactNode && touched["timeOfLeisure"] as ReactNode && errors["timeOfLeisure"] as ReactNode}
                                </p>
                            </div>
                        </div>


                        <div className="password">
                            <label htmlFor="dayOfLeisure">{LABEL_FOR_INPUTS["dayOfLeisure"]}:</label>
                            <div key="dayOfLeisure">
                                <div className="sec-2">
                                    <Field as="select" id="dayOfLeisure" name="dayOfLeisure">
                                        <option value="">Выберите день недели</option>
                                        <option value="Понедельник">Понедельник</option>
                                        <option value="Вторник">Вторник</option>
                                        <option value="Среда">Среда</option>
                                        <option value="Четверг">Четверг</option>
                                        <option value="Пятница">Пятница</option>
                                        <option value="Суббота">Суббота</option>
                                        <option value="Воскресенье">Воскресенье</option>
                                    </Field>
                                </div>
                                <p className="error">
                                    {errors["dayOfLeisure"] as ReactNode && touched["dayOfLeisure"] as ReactNode && errors["dayOfLeisure"] as ReactNode}
                                </p>
                            </div>
                        </div>

                        <button className="login" type="submit">Создать</button>
                    </form>

                )}
            </Formik>
        </div>
    )
}

export default LeisureAdd

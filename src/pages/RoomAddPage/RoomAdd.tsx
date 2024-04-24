import React, {ReactNode} from 'react'
import './RoomAdd.css'
import {useTitle} from "../../globals";
import {Field, Formik} from "formik";
import * as Yup from "yup";
import {LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT} from "../../constants";
import Header from '../../components/Header/Header';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import SecondForm from '../../components/SecondForm/SecondForm';

const RoomAdd = () => {
    useTitle("Создание комнаты")
    const shape = {
        roomNumber: Yup.number()
            .required("Номер комнаты является обязательным полем")
            .positive("Некорректный номер комнаты"),
        roomFloor: Yup.number()
            .required("Номер этажа является обязательным полем")
            .positive("Некорректный номер этажа"),
        roomCapacity: Yup.number()
            .required("Вместимость комнаты является обязательным полем")
            .positive("Некорректная вместимость комнаты"),
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
                            roomNumber: 121,
                            roomFloor: 1,
                            roomCapacity: 4,
                        }
                    }
                    onSubmit={(values: { roomNumber: number, roomFloor: number, roomCapacity: number }) => {
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
                                    htmlFor="roomNumber">{LABEL_FOR_INPUTS["roomNumber"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        name="roomNumber"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["roomNumber"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["roomNumber"]}
                                        className=""
                                        id="roomNumber"
                                    />
                                </div>
                                <p className="error">
                                    {errors["roomNumber"] && touched["roomNumber"] && errors["roomNumber"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="roomFloor">{LABEL_FOR_INPUTS["roomFloor"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        name="roomFloor"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["roomFloor"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["roomFloor"]}
                                        className=""
                                        id="roomFloor"
                                    />
                                </div>
                                <p className="error">
                                    {errors["roomFloor"] && touched["roomFloor"] && errors["roomFloor"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="roomCapacity">{LABEL_FOR_INPUTS["roomCapacity"]}:</label>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        name="roomCapacity"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["roomCapacity"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["roomCapacity"]}
                                        className=""
                                        id="roomCapacity"
                                    />
                                </div>
                                <p className="error">
                                    {errors["roomCapacity"] && touched["roomCapacity"] && errors["roomCapacity"]}
                                </p>
                            </div>

                            

                            <button className="btn btn-primary" type="submit">Создать комнату</button>
                        </SecondForm>

                    )}
                </Formik>
            </div>
        </>
        
    )
}

export default RoomAdd

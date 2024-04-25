import React, { ReactNode, useEffect } from 'react';
import './RoomAdd.css';
import { useTitle } from "../../globals";
import { Formik } from "formik";
import * as Yup from "yup";
import { LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT } from "../../constants";
import Header from '../../components/Header/Header';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import SecondForm from '../../components/SecondForm/SecondForm';
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import { useToasters } from "../../contexts/ToasterContexts";
import { createRoom } from "../../store/action-creators/room";
import { useNavigate } from "react-router-dom";

interface IRoomForm {
    number: number;
    floor: number;
    capacity: number;
}

const initialValues: IRoomForm = {} as IRoomForm;

const RoomSchema = Yup.object({
    number: Yup.number()
        .required("Номер комнаты является обязательным полем")
        .positive("Некорректный номер комнаты"),
    floor: Yup.number()
        .required("Номер этажа является обязательным полем")
        .positive("Некорректный номер этажа"),
    capacity: Yup.number()
        .required("Вместимость комнаты является обязательным полем")
        .positive("Некорректная вместимость комнаты"),
});

const RoomAdd = () => {
    useTitle("Создание комнаты");
    const navigate = useNavigate();
    const { showToasterError, showToasterSuccess } = useToasters();
    const isLoading = useAppSelector(state => state.roomFormReducer.isLoading);
    const success = useAppSelector(state => state.roomFormReducer.success);
    const error = useAppSelector(state => state.roomFormReducer.error);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (success) {
            showToasterSuccess("Комната успешно создана");
            navigate("/rooms")
        }
    }, [success, showToasterSuccess]);
    useEffect(() => {
        if (!!error) {
            showToasterError(error);
        }
    }, [error, showToasterError]);
    return (
        <>
            <Header />
            <NavigationBar />
            <div className="sec-container">
                <Formik
                    validationSchema={RoomSchema}
                    initialValues={initialValues}
                    onSubmit={(values: IRoomForm) => {
                        dispatch(createRoom({ ...values }));
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
                                    htmlFor="number">{LABEL_FOR_INPUTS.room.number}:</label>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        name="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["number"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT.room.number}
                                        className=""
                                        id="number"
                                    />
                                </div>
                                <p className="error">
                                    {errors["number"] && touched["number"] && errors["number"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="floor">{LABEL_FOR_INPUTS.room.floor}:</label>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        name="floor"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["floor"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT.room.floor}
                                        className=""
                                        id="floor"
                                    />
                                </div>
                                <p className="error">
                                    {errors["floor"] && touched["floor"] && errors["floor"]}
                                </p>
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="capacity">{LABEL_FOR_INPUTS.room.capacity}:</label>
                                <div className="input-container">
                                    <input
                                        type="number"
                                        name="capacity"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values["capacity"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT.room.capacity}
                                        id="capacity"
                                    />
                                </div>
                                <p className="error">
                                    {errors["capacity"] && touched["capacity"] && errors["capacity"]}
                                </p>
                            </div>
                            <button className="btn btn-primary"
                                type="submit"
                                disabled={isLoading}>
                                {isLoading ?
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                    <span>Создать комнату</span>
                                }
                            </button>
                        </SecondForm>

                    )}
                </Formik>
            </div>
        </>

    );
};

export default RoomAdd;

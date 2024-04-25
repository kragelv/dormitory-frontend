import { ReactNode, useState } from 'react';
import './LeisureAdd.css';
import { dayOfWeekNames, dayOfWeekNamesReverse, useTitle } from "../../globals";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT } from "../../constants";
import SecondForm from '../../components/SecondForm/SecondForm';
import Header from '../../components/Header/Header';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { DayOfWeek } from '../../models/leisure/DayOfWeek';
import { useAppDispatch } from "../../store/hook/redux";
import { createLeisure } from "../../store/action-creators/leisure";
import { useToasters } from "../../contexts/ToasterContexts";

interface ILeisureForm {
    nameOfLeisure: string;
    timeOfLeisure: string;
    dayOfLeisure: DayOfWeek;
}

const LeisureSchema = Yup.object({
    nameOfLeisure: Yup.string()
        .required("Название кружка это обязательное поле")
        .min(6, "Название кружка состоит из минимум 6 знаков"),
    timeOfLeisure: Yup.mixed<DayOfWeek>()
        .required("Время кружка ялвяется обязательным полем"),
    dayOfLeisure: Yup.string()
        .required("День недели это обязательное поле"),
});

const toUTCtime = (time: string): string => {
    const date = new Date(`1970-01-01T${time}`);
    return `${date.getUTCHours()}:${date.getUTCMinutes()}`;
};

const LeisureAdd = () => {
    useTitle("Создание кружка");
    const [isLoading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const { showToasterSuccess, showToasterError } = useToasters();
    return (
        <>
            <Header />
            <NavigationBar />
            <div className="sec-container mt-3">
                <Formik
                    validationSchema={LeisureSchema}
                    initialValues={{
                        dayOfLeisure: DayOfWeek.MONDAY
                    } as ILeisureForm}
                    onSubmit={(values) => {
                        setLoading(true);
                        dispatch(createLeisure({
                            title: values.nameOfLeisure,
                            time: toUTCtime(values.timeOfLeisure),
                            day: values.dayOfLeisure
                        })).unwrap()
                            .then(() => {
                                showToasterSuccess("Кружок успешно создан");
                                window.history.back();
                            })
                            .catch(() => {
                                showToasterError("Не удалось создать кружок");
                            })
                            .finally(() => {
                                setLoading(false);
                            });
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
                        <SecondForm onSubmit={handleSubmit}>
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
                                {errors["nameOfLeisure"] && touched["nameOfLeisure"] &&
                                    <p className="error">
                                        {errors["nameOfLeisure"]}
                                    </p>
                                }
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
                                        value={values["timeOfLeisure"]}
                                        placeholder={PLACEHOLDER_FOR_INPUT["timeOfLeisure"]}
                                        className=""
                                        id="timeOfLeisure"
                                    />
                                </div>
                                {errors["timeOfLeisure"] && touched["timeOfLeisure"] &&
                                    <p className="error">
                                        {errors.timeOfLeisure as ReactNode}
                                    </p>
                                }
                            </div>

                            <div className="form-field-container">
                                <label
                                    htmlFor="dayOfLeisure">{LABEL_FOR_INPUTS["dayOfLeisure"]}:</label>
                                <div className="input-container">
                                    <Field as="select" id="dayOfLeisure" name="dayOfLeisure" placeholder="Выберите день недели">
                                        {(Object.keys(DayOfWeek) as Array<keyof typeof DayOfWeek>).map(key => (
                                            <option key={key} value={DayOfWeek[key]}>{dayOfWeekNames[DayOfWeek[key]]}</option>
                                        ))}
                                    </Field>
                                </div>
                                {errors["dayOfLeisure"] && touched["dayOfLeisure"] &&
                                    <p className="error">
                                        {errors["dayOfLeisure"] as ReactNode}
                                    </p>
                                }
                            </div>
                            <button className="btn btn-primary"
                                type="submit"
                                disabled={isLoading}>
                                {isLoading ?
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                    <span>Создать кружок</span>
                                }
                            </button>
                        </SecondForm>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default LeisureAdd;
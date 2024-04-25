import './Room.css';
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import { useTitle } from "../../globals";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteRoom, fetchRoom, setRoom, updateRoom } from "../../store/action-creators/room";
import { UserType } from "../../models/auth/authorities";
import RoomStudentsTable from "./RoomStudentsTable";
import Authz from "../../components/Authz";
import SecondForm from '../../components/SecondForm/SecondForm';
import * as Yup from "yup";
import { Formik } from "formik";
import { LABEL_FOR_INPUTS, PLACEHOLDER_FOR_INPUT } from "../../constants";
import { useToasters } from "../../contexts/ToasterContexts";
import { navigate } from "ionicons/icons";

interface IRoomForm {
    number: number;
    floor: number;
    capacity: number;
}

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

const Room: FC = () => {
    useTitle("Комната");
    const { showToasterError, showToasterSuccess } = useToasters();
    const updSuccess = useAppSelector(state => state.roomFormReducer.success);
    const updIsLoading = useAppSelector(state => state.roomFormReducer.isLoading);
    const updError = useAppSelector(state => state.roomFormReducer.error);
    const { roomId } = useParams();
    const studentsLength = useAppSelector(state => state.roomStudentsReducer.students.length);
    const room = useAppSelector(state => state.roomReducer.room);
    const isLoading = useAppSelector(state => state.roomReducer.isLoading);
    const error = useAppSelector(state => state.roomReducer.error);
    const userType = useAppSelector(state => state.authReducer.user.type);
    const [reqRoomId, setReqRoomId] = useState("");
    const [totalStudents, setTotalStudents] = useState(0);
    const [isEdit, setEdit] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [updInitialValues, setUpdInitialValues] = useState({} as IRoomForm);
    useEffect(() => {
        if (roomId !== undefined) {
            setReqRoomId(roomId);
        }
    }, [roomId]);
    useEffect(() => {
        if (!!reqRoomId) {
            dispatch(fetchRoom(reqRoomId));
        }
    }, [dispatch, reqRoomId]);
    useEffect(() => {
        if (room !== undefined) {
            setUpdInitialValues({
                ...room
            });
            setTotalStudents(room.current);
        } else {
            setUpdInitialValues({} as IRoomForm);
        }
    }, [room]);
    useEffect(() => {
        setTotalStudents(studentsLength);
    }, [studentsLength]);
    useEffect(() => {
        if (updSuccess) {
            showToasterSuccess("Комната успешно обновлена");
            setEdit(false);
        }
    }, [updSuccess, showToasterSuccess]);
    useEffect(() => {
        if (!!updError) {
            showToasterError(updError);
        }
    }, [updError, showToasterError]);
    if (roomId === undefined)
        return <Navigate to="/rooms" />;
    return (
        <Authz ath={[UserType.TYPE_EMPLOYEE]}>
            <Header />
            <NavigationBar />
            {!isEdit ?
                <div className="container mt-3">
                    <div className="room-container">
                        {isLoading ?
                            <div className="loading-container">
                                <div className="spinner-border text-primary loading" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            : !!error ?
                                <p>{error}</p> :
                                room &&
                                <>
                                    <div className="room-items">
                                        <p className="room-item"><b>Номер:</b> {room.number}</p>
                                        <p className="room-item"><b>Этаж:</b> {room.floor}</p>
                                        <p className="room-item"><b>Вместимость:</b> {room.capacity}</p>
                                    </div>
                                    <div className="room-btn-group">
                                        <button className="btn btn-primary text-white"
                                            onClick={() => { setEdit(true); }}
                                            type="button">Редактировать</button>
                                        <button className="btn btn-danger text-white"
                                            onClick={() => {
                                                dispatch(deleteRoom(roomId))
                                                    .unwrap()
                                                    .then(() => {
                                                        showToasterSuccess("Комната успешно удалена");
                                                        navigate("/rooms");
                                                    })
                                                    .catch(() => {
                                                        showToasterError("Не удалось удалить комнату");
                                                    });
                                            }}
                                            type="button">Удалить</button>
                                    </div>
                                    <p className="room-title">Проживающие ({totalStudents})</p>
                                    <RoomStudentsTable roomId={roomId} />
                                </>
                        }
                    </div>
                </div>
                :
                <div className="sec-container">
                    <Formik
                        validationSchema={RoomSchema}
                        initialValues={updInitialValues}
                        onSubmit={(values) => {
                            dispatch(updateRoom({ id: reqRoomId, room: { ...values } }));
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
                                <div className="room-btn-group">
                                    <button className="btn btn-danger text-white"
                                        onClick={() => { setEdit(false); }}
                                        type="button">Отмена</button>
                                    <button className="btn btn-primary flex-grow-1"
                                        type="submit"
                                        disabled={updIsLoading}>
                                        {updIsLoading ?
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                            <span>Применить</span>
                                        }
                                    </button>
                                </div>
                            </SecondForm>

                        )}
                    </Formik>
                </div>
            }
        </Authz>
    );
};

export default Room;

import './Leisure.css';
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import Table from "../../components/Table/Table";
import { dayOfWeekNames, fullNameToString, toHm, useTitle } from "../../globals";
import { Navigate, useParams } from "react-router-dom";
import { fetchLeisure } from "../../store/action-creators/leisure";
import { UserType } from "../../models/auth/authorities";
import StudentParticipant from "./StudentParticipant";
import StudentsTable from "./StudentsTable";

const Leisure: FC = () => {
    useTitle("Кружок");
    const { leisureId } = useParams();
    const studentsLength = useAppSelector(state => state.leisureStudentsReducer.students.length);
    const leisure = useAppSelector(state => state.leisureReducer.leisure);
    const isLoading = useAppSelector(state => state.leisureReducer.isLoading);
    const error = useAppSelector(state => state.leisureReducer.error);
    const userId = useAppSelector(state => state.authReducer.user.id);
    const userType = useAppSelector(state => state.authReducer.user.type);
    const [reqLeisureId, setReqLeisureId] = useState("");
    const [totalStudents, setTotalStudents] = useState(0);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (leisureId !== undefined) {
            setReqLeisureId(leisureId);
        }
    }, [leisureId]);
    useEffect(() => {
        dispatch(fetchLeisure(reqLeisureId));
    }, [dispatch, reqLeisureId]);
    useEffect(() => {
        if (leisure !== undefined) {
            setTotalStudents(leisure.studentTotalElements);
        }
    }, [leisure]);
    useEffect(() => {
        setTotalStudents(studentsLength);
    }, [studentsLength]);
    if (leisureId === undefined)
        return <Navigate to="/leisures" />;
    return (
        <div className="container-nav">
            <Header />
            <NavigationBar />
            <div className="container mt-3">
                <div className="leisure-container">
                    {isLoading ?
                        <div className="loading-container">
                            <div className="spinner-border text-primary loading" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        : !!error ?
                            <p>{error}</p> :
                            leisure &&
                            <>
                                <div className="leisure-items">
                                    <p className="leisure-item"><b>Название:</b> {leisure.title}</p>
                                    <p className="leisure-item"><b>День недели:</b> {dayOfWeekNames[leisure.day]}</p>
                                    <p className="leisure-item"><b>Время:</b> {toHm(leisure.time)}</p>
                                    <p className="leisure-item"><b>Руководитель:</b> {fullNameToString(leisure.organizer.fullName)}</p>
                                </div>
                                {userId === leisure.organizer.id ?
                                    <>
                                        <button className="edit">Редактировать</button>
                                        <button className="delete">Удалить</button>
                                    </>
                                    : <StudentParticipant leisureId={leisureId} />
                                }
                                {userType === UserType.TYPE_EMPLOYEE &&
                                    <>
                                        <p className="leisure-title">Участники ({totalStudents})</p>
                                        <StudentsTable leisureId={leisureId} />
                                    </>

                                }
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Leisure;

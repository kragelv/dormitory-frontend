import Table from "../../components/Table/Table";
import { fullNameToString } from "../../globals";
import { fetchLeisureStudents } from "../../store/action-creators/leisure";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import './StudentsTable.css';
import { FC, useEffect } from "react";

type TypeLeisureStudentsProps = {
    leisureId: string;
};

const StudentsTable: FC<TypeLeisureStudentsProps> = ({ leisureId }) => {
    const students = useAppSelector(state => state.leisureStudentsReducer.students);
    const isLoading = useAppSelector(state => state.leisureStudentsReducer.isLoading);
    const error = useAppSelector(state => state.leisureStudentsReducer.error);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchLeisureStudents(leisureId));
    }, [leisureId])
    return (
        <>
            {isLoading ?
                <div className="loading-container">
                    <div className="spinner-border text-primary loading" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                : !!error ?
                    <p>{error}</p>
                    : students.length > 0 &&
                    <Table>
                        <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Группа</th>
                                <th>Комната</th>
                                <th>Телефон</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{fullNameToString(student.fullName)}</td>
                                    <td>{student.cardId}</td>
                                    <td>{student.roomNumber ?? "-"}</td>
                                    <td>{student.phoneNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            }
        </>
    );
};

export default StudentsTable;
import './RoomStudentsTable.css';
import Table from "../../components/Table/Table";
import { fullNameToString } from "../../globals";
import { fetchRoomStudents } from "../../store/action-creators/room";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import { FC, useEffect } from "react";

type TypeRoomStudentsProps = {
    roomId: string;
};

const RoomStudentsTable: FC<TypeRoomStudentsProps> = ({ roomId }) => {
    const students = useAppSelector(state => state.roomStudentsReducer.students);
    const isLoading = useAppSelector(state => state.roomStudentsReducer.isLoading);
    const error = useAppSelector(state => state.roomStudentsReducer.error);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchRoomStudents(roomId));
    }, [roomId]);
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
                                <th>Номер пропуска</th>
                                <th>Группа</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{fullNameToString(student.fullName)}</td>
                                    <td>{student.groupNumber}</td>
                                    <td>{student.cardId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            }
        </>
    );
};

export default RoomStudentsTable;
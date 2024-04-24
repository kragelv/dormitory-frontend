import "./StudentParticipant.css";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import { useToasters } from "../../contexts/ToasterContexts";
import { fetchIsParticipant, studentJoin, studentLeave } from "../../store/action-creators/leisure";

type TypeParticipantProps = {
    leisureId: string;
};

function getButtonText(isParticipant: boolean | undefined): string {
    if (isParticipant === undefined)
        return "Ошибка получения статуса";
    return isParticipant ? "Покинуть" : "Присоединиться";
};

const StudentParticipant: FC<TypeParticipantProps> = ({ leisureId }) => {
    const { showToasterError, showToasterSuccess } = useToasters();
    const isParticipant = useAppSelector(state => state.leisureParticipantReducer.isParticipant);
    const isLoading = useAppSelector(state => state.leisureParticipantReducer.isLoading);
    const error = useAppSelector(state => state.leisureParticipantReducer.error);
    const [prevIsParticipant, setPrevIsParticipant] = useState(isParticipant);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchIsParticipant(leisureId));
    }, [dispatch, leisureId])
    useEffect(() => {
        return () => {
            setPrevIsParticipant(isParticipant);
        };
    }, [isParticipant]);
    useEffect(() => {
        if (!isLoading) {
            if (prevIsParticipant === false && isParticipant && !error) {
                showToasterSuccess(isParticipant ? "Вы присоединились к кружку" : "Вы покинули кружок");
            } else if (!!error) {
                showToasterError(error);
            }
        }
    }, [isLoading, error, prevIsParticipant, isParticipant, showToasterSuccess, showToasterError]);
    const handlePariticipant = () => {
        if (isParticipant)
            dispatch(studentLeave(leisureId));
        else
            dispatch(studentJoin(leisureId));
    };
    return (
        <button className={[
            "btn",
            "btn-participant",
            isParticipant === undefined ?
                "btn-secondary" :
                isParticipant ? "btn-danger text-white" : "btn-info"
        ].join(" ")}
            type="button"
            onClick={handlePariticipant}
            disabled={isParticipant === undefined || isLoading}>
            {isLoading ?
                <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                :
                <span>{getButtonText(isParticipant)}</span>
            }
        </button>
    );
};

export default StudentParticipant;
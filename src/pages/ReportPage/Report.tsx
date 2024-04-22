import {FC} from "react";
import {useTitle} from "../../globals";

const Report: FC = () => {
    useTitle("Профиль")
    return (
        <>
            <p>Докладная</p>
            <p>Дата: 15.03.2024</p>

        </>
    )
}

export default Report

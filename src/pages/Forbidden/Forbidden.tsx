import { useTitle } from "../../globals";
import "./Forbidden.css";
import { FC } from "react";

const Forbidden: FC = () => {
    useTitle("Ошибка доступа");
    return (
        <>
            <h1>403</h1>
            <p>У вас нет доступа к этой странице</p>
        </>
    );
};

export default Forbidden;
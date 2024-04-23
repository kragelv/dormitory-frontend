import "./ErrorsPages.css"
import { useTitle } from "../../globals";
import { FC } from "react";

const Forbidden: FC = () => {
    useTitle("Ошибка доступа");
    return (
        <div className="error-page">
            <h1>403</h1>
            <p>У вас нет доступа к этой странице</p>
        </div>
    );
};

export default Forbidden;
import "./ErrorsPages.css"
import { useTitle } from "../../globals";
import { FC } from "react";

const NotFound: FC = () => {
    useTitle("Страница не найдена")
    return (
        <div className="error-page">
            <h1>404</h1>
            <p>Страница не найдена</p>
        </div>
    );
}

export default NotFound;
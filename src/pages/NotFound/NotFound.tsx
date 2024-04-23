import { useTitle } from "../../globals";
import "./NotFound.css"
import { FC } from "react";

const NotFound: FC = () => {
    useTitle("Страница не найдена")
    return (
        <>
            <h1>404</h1>
            <p>Страница не найдена</p>
        </>
    );
}

export default NotFound;
import { useTitle } from "../../globals";
import "./NotFound.css"
import { FC } from "react";

const NotFound: FC = () => {
    useTitle("Страница не найдена")
    return (
        <>
            <div className="container">
                <h1>404</h1>
                <p>Oops! The page you are looking for cannot be found.</p>
            </div>
        </>
    );
}

export default NotFound;

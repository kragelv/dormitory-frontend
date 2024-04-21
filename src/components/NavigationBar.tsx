import { fullNameToString } from "../globals";
import { useAppSelector } from "../hooks/redux";

const NavigationBar = () => {
    const { isAuth, user } = useAppSelector(state => state.authReducer);
    return (
        <nav className="navbar navbar-light bg-primary">
            <div className="container-fluid">
                {isAuth && <p className="text-white">{fullNameToString(user.fullName)}</p>}
            </div>
        </nav>
    );
};

export default NavigationBar;
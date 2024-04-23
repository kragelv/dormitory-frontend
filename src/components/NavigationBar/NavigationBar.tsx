import {fullNameToString} from "../../globals";
import {useAppSelector} from "../../store/hook/redux";
import "./NavigationBar.css"

const NavigationBar = () => {
    const {isAuth, user} = useAppSelector(state => state.authReducer);
    return (
        <nav className="a-navbar navbar-light bg-primary">
            <div className="navbar-fullname-container">
                {isAuth && <div className="navbar-fullname">{fullNameToString(user.fullName)}</div>}
            </div>
        </nav>
    );
};

export default NavigationBar;

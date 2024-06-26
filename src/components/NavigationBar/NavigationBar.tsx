import { fullNameToString } from "../../globals";
import { useAppSelector } from "../../store/hook/redux";
import "./NavigationBar.css";

const NavigationBar = () => {
    const { isAuth, user } = useAppSelector(state => state.authReducer);
    return (
        <nav className="a-navbar navbar-light bg-primary">
            {isAuth &&
                <div className="navbar-fullname-container">
                    <a className="navbar-profile-link" href={`/users/${user.id}`}>
                        <div className="navbar-fullname">{fullNameToString(user.fullName)}</div>
                    </a>
                </div>
            }
        </nav>
    );
};

export default NavigationBar;

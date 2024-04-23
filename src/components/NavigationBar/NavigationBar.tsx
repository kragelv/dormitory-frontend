import {fullNameToString} from "../../globals";
import {useAppSelector} from "../../store/hook/redux";
import "./NavigationBar.css"

const NavigationBar = () => {
    const {isAuth, user} = useAppSelector(state => state.authReducer);
    return (
        <nav className="mask">
            {isAuth && <p className="text-white">{fullNameToString(user.fullName)}</p>}
        </nav>
    );
};

export default NavigationBar;

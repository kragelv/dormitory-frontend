import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook/redux";
import { useTitle } from "../globals";
import { logout } from "../store/action-creators/auth";
import Authz from "../components/Authz";

const Profile: FC = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const id = useAppSelector(state => state.authReducer.user.id);
    const dispatch = useAppDispatch();
    useTitle("Профиль");
    return (
        <Authz>
            <h3>Path: {userId}</h3>
            <h3>Token: {id}</h3>
            {id === userId && <button onClick={() => { dispatch(logout()).then(() => navigate("/")); }}>Выход</button>}
        </Authz>
    );
};

export default Profile;
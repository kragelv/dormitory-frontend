import { FC } from "react";
import { useTitle } from "../../globals";
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./Profile.css";

const Profile: FC = () => {
    useTitle("Профиль");
    return (
        <>
            <Header />
            <NavigationBar />
        </>
    );
};


export default Profile;

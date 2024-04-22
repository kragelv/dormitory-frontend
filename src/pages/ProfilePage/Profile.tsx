import {FC} from "react";
import {useTitle} from "../../globals";
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./Profile.css"

const Profile: FC = () => {
    useTitle("Профиль")
    return (
        <>
            <Header/>
            <div className="container-nav">
                <NavigationBar/>

                <div className="container-email">
                    <div className="leisure-background">
                        <div className="leisure-form">
                            <p><b>Название:</b> название</p>
                            <p><b>День недели:</b> пятница</p>
                            <p><b>Время:</b> 14:00</p>
                            <p><b>Руководитель:</b> Орлова</p>
                        </div>
                        <button className="login">Записаться</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Profile

import { FC, useEffect, useState } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/ErrorsPages/NotFound";
import Login from "./pages/LoginPage/Login";
// import Profile from "./pages/Profile";
import EmailTokenConfirm from "./pages/EmailTokenConfirm";
import { TOKEN_KEY, refresh } from "./store/action-creators/auth";
import { useAppDispatch } from "./store/hook/redux";
import PasswordReset from "./pages/PasswordReset";
import "./App.css";
import Profile from "./pages/ProfilePage/Profile";
import Leisure from "./pages/LeisurePage/Leisure";
import LeisureListPage from "./pages/LeisureListPage/LeisureListPage";
import Report from "./pages/ReportPage/Report";
import RegisterStudent from "./pages/RegisterStudentPage/RegisterStudentPage";
import RegisterEmployee from "./pages/RegisterEmployeePage/RegisterEmployeePage";
import LeisureAdd from "./pages/LeisureAdd/LeisureAdd";
import RoomAdd from "./pages/RoomAddPage/RoomAdd";
import RegisterStudentCaretaker from "./pages/RegisterStudentCaretakerPage/RegisterStudentCaretakerPage";
import RoomListPage from "./pages/RoomListPage/RoomListPage";
import Room from "./pages/RoomPage/Room";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "users/:userId",
        element: <Profile />
    },
    {
        path: "/email-confirm",
        element: <EmailTokenConfirm />
    },
    {
        path: "/password-reset",
        element: <PasswordReset />
    },
    {
        path: "/leisures",
        element: <LeisureListPage />
    },
    {
        path: "/leisure/:leisureId",
        element: <Leisure />
    },
    {
        path: "/leisure/new",
        element: <LeisureAdd />
    },
    {
        path: "/rooms",
        element: <RoomListPage />
    },
    {
        path: "/room/:roomId",
        element: <Room />
    },
    {
        path: "/report",
        element: <Report />
    },
    {
        path: "/register-student",
        element: <RegisterStudent />
    },
    {
        path: "/register-student-caretaker",
        element: <RegisterStudentCaretaker />
    },
    {
        path: "/register-employee",
        element: <RegisterEmployee />
    },
    {
        path: "/leisure-add",
        element: <LeisureAdd />
    },
    {
        path: "/rooms/new",
        element: <RoomAdd />
    },
    {
        path: "*",
        element: <NotFound />
    }
]);


const App: FC = () => {
    const [isAuthLoading, setAuthLoading] = useState(true);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (localStorage.getItem(TOKEN_KEY)) {
            dispatch(refresh()).finally(() => {
                setAuthLoading(false);
            });
        } else {
            setAuthLoading(false);
        }
    }, [dispatch]);
    if (isAuthLoading)
        return (
            <div className="loading-container">
                <div className="spinner-border text-primary loading" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    return <RouterProvider router={router} />;
};

export default App;

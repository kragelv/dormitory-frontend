
import { FC, useEffect, useState } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFoundPage/NotFound";
import Login from "./pages/LoginPage/Login";
// import Profile from "./pages/Profile";
import EmailTokenConfirm from "./pages/EmailTokenConfirm";
import { TOKEN_KEY, refresh } from "./store/action-creators/auth";
import { useAppDispatch, useAppSelector } from "./store/hook/redux";
import PasswordReset from "./pages/PasswordReset";
import "./App.css";
import Profile from "./pages/ProfilePage/Profile";
import Leisure from "./pages/LeisurePage/Leisure";
import LeisureListPage from "./pages/LeisureListPage/LeisureListPage";

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
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/leisures",
        element: <LeisureListPage />
    },
    {
        path: "/leisure/:id",
        element: <Leisure />
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
        return <div>Загрузка...</div>;
    return <RouterProvider router={router} />;
};

export default App;

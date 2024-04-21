
import { FC, useEffect } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EmailTokenConfirm from "./pages/EmailTokenConfirm";
import { TOKEN_KEY, refresh } from "./store/action-creators/auth";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import PasswordReset from "./pages/PasswordReset";

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
        path: "*",
        element: <NotFound />
    }
]);


const App: FC = () => {
    const isLoading = useAppSelector(state => state.authReducer.isLoading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (localStorage.getItem(TOKEN_KEY)) {
            dispatch(refresh());
        }
    }, [dispatch]);

    if (isLoading)
        return <div>Загрузка...</div>;

    return <RouterProvider router={router} />;
};

export default App;

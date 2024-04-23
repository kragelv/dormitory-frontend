import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Navigate, To } from "react-router-dom";
import { useAppSelector } from "../store/hook/redux";

type TypeAuthzProps = {
    redirectTo?: To,
    authOff?: boolean,
    confirmOff?: boolean,
    passwordResetOff?: boolean;
};

type TypeAuthzPropsWithChildren = PropsWithChildren<TypeAuthzProps>;

const defaultProps: Required<TypeAuthzProps> = {
    redirectTo: "/login",
    authOff: false,
    confirmOff: false,
    passwordResetOff: false
};

const Authz: FC<TypeAuthzPropsWithChildren> = (props) => {
    const propsWithDefault = { ...props, ...defaultProps };
    const { redirectTo, authOff, confirmOff, passwordResetOff, children } = propsWithDefault;
    const isAuth = useAppSelector(state => state.authReducer.isAuth);
    const emailConfirmed = useAppSelector(state => state.authReducer.user.emailConfirmed);
    const passwordNeedReset = useAppSelector(state => state.authReducer.user.passwordNeedReset);
    const [isRedirect, setRedirect] = useState(false);
    useEffect(() => {
        setRedirect(!authOff && (!isAuth || (!confirmOff && !emailConfirmed) || (!passwordResetOff && passwordNeedReset)));
    }, [authOff, confirmOff, passwordResetOff, isAuth, emailConfirmed, passwordNeedReset]);
    if (isRedirect) {
        return <Navigate to={redirectTo} />;
    }
    return (
        <>{children}</>
    );
};

export default Authz;
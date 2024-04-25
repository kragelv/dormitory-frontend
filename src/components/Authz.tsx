import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Navigate, To } from "react-router-dom";
import { useAppSelector } from "../store/hook/redux";
import { Role, UserType } from "../models/auth/authorities";
import Forbidden from "../pages/ErrorsPages/Forbidden";

type Authorities = UserType | Role;

type TypeAuthzProps = {
    redirectTo?: To,
    authOff?: boolean,
    confirmOff?: boolean,
    passwordResetOff?: boolean;
    ath?: Authorities[];
};

type TypeAuthzPropsWithChildren = PropsWithChildren<TypeAuthzProps>;

const defaultProps = {
    redirectTo: "/login",
    authOff: false,
    confirmOff: false,
    passwordResetOff: false
};

const Authz: FC<TypeAuthzPropsWithChildren> = (props) => {
    const propsWithDefault = { ...defaultProps, ...props };
    const { redirectTo, authOff, confirmOff, passwordResetOff, children } = propsWithDefault;
    const ath = propsWithDefault.ath ? new Set<Authorities>(propsWithDefault.ath) : undefined;
    const isAuth = useAppSelector(state => state.authReducer.isAuth);
    const isLoading = useAppSelector(state => state.authReducer.isLoading);
    const emailConfirmed = useAppSelector(state => state.authReducer.user.emailConfirmed);
    const passwordNeedReset = useAppSelector(state => state.authReducer.user.passwordNeedReset);
    const type = useAppSelector(state => state.authReducer.user.type);
    const roles = useAppSelector(state => state.authReducer.user.roles);
    const [isRedirect, setRedirect] = useState(false);
    const [canAccess, setCanAccess] = useState(false);
    useEffect(() => {
        setRedirect(!authOff && (!isAuth || (!confirmOff && !emailConfirmed) || (!passwordResetOff && passwordNeedReset)));
    }, [authOff, confirmOff, passwordResetOff, isAuth, emailConfirmed, passwordNeedReset]);
    useEffect(() => {
        setCanAccess(!isRedirect && !authOff && (ath === undefined || ath.has(type) || roles.some(r => ath.has(r))));
    }, [ath, type, roles, isRedirect, authOff]);

    
    if (isLoading) 
        return <></>;
    if (isRedirect) {
        console.log("isRedirect", isRedirect);
        return <Navigate to={redirectTo} />;
    }
    if (!canAccess) {
        console.log("canAccess", canAccess);
        return <Forbidden />;
    }
    return (
        <>{children}</>
    );
};

export default Authz;
import { API_URL } from "../../http";
import { authSlice } from "../reducers/AuthSlice";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Role, UserType } from "../../models/auth/authorities";
import axios from "axios";
import AuthService from "../../services/AuthService";
import { IAccessResponse } from "../../models/auth/response/IAccessResponse";
import { AppDispatch } from "../store";

export const TOKEN_KEY = 'token';

interface IJwtPayload extends JwtPayload {
    sub: string;
    ath: string[];
    emc: boolean;
    pnr: boolean;
};

interface IParsedAth {
    type: UserType;
    roles: Role[];
}

function extractAuthorities(decoded: IJwtPayload): IParsedAth {
    const authorities = decoded.ath;
    const typeResult = authorities.find((item) => item in UserType);
    if (typeResult === undefined) {
        throw new Error('Invalid token');
    }
    const type = typeResult as UserType;
    const roles = authorities.filter((item) => item in Role) as Role[];
    return { type, roles };
}

export const login = (cardId: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.loginPending());
        const response = await AuthService.login(cardId, password);
        const token = response.data.accessToken;
        const decoded = jwtDecode<IJwtPayload>(token);
        const { type, roles } = extractAuthorities(decoded);
        localStorage.setItem(TOKEN_KEY, token);
        dispatch(authSlice.actions.loginSuccess({
            id: decoded.sub,
            type: type,
            roles: roles,
            emailConfirmed: decoded.emc,
            passwordNeedReset: decoded.pnr,
            user: response.data.user
        }));
    } catch (e) {
        dispatch(authSlice.actions.loginError("Проверьте введенные данные"));
    }
};

export const refresh = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.loginPending());
        const response = await axios.post<IAccessResponse>(`${API_URL}/v1/auth/refresh-token`,
            { accessToken: localStorage.getItem(TOKEN_KEY) },
            { withCredentials: true }
        );
        const token = response.data.accessToken;
        const decoded = jwtDecode<IJwtPayload>(token);
        const { type, roles } = extractAuthorities(decoded);
        localStorage.setItem(TOKEN_KEY, response.data.accessToken);
        dispatch(authSlice.actions.refreshSuccess({
            id: decoded.sub,
            type: type,
            roles: roles,
            emailConfirmed: decoded.emc,
            passwordNeedReset: decoded.pnr,
            user: response.data.user
        }));
    } catch (e) {
        dispatch(authSlice.actions.refreshError());
        console.error("Ошибка авторизации");
    }
};

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.logout());
    try {
        await AuthService.logout();
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
        } else {
            console.error('Unknown error occurred:', e);
        }
    } finally {
        localStorage.removeItem(TOKEN_KEY);
    }
};
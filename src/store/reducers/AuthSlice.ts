import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Role, UserType } from "../../models/auth/authorities";
import { IAccessResponseUser } from "../../models/auth/response/IAccessResponse";
import { IFullName } from "../../models/IFullName";

interface IAuthUser {
    id: string;
    cardId: string;
    fullName: IFullName;
    email: string | null;

    type: UserType;
    roles: Role[];
    emailConfirmed: boolean;
    passwordNeedReset: boolean;
}

interface IAuthState {
    isAuth: boolean;
    user: IAuthUser;
    isLoading: boolean;
    error: string;
}

const initialState: IAuthState = {
    isAuth: false,
    user: {} as IAuthUser,
    isLoading: false,
    error: ''
};

export interface IAccessPayload {
    id: string;
    type: UserType;
    roles: Role[];
    emailConfirmed: boolean;
    passwordNeedReset: boolean;
    user: IAccessResponseUser;
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginPending(state) {
            state.isLoading = true;
        },
        loginSuccess(state, action: PayloadAction<IAccessPayload>) {
            const { payload } = action;
            state.user = {
                ...payload.user,
                id: payload.id,
                type: payload.type,
                roles: payload.roles,
                emailConfirmed: payload.emailConfirmed,
                passwordNeedReset: payload.passwordNeedReset
            };
            state.isAuth = true;
            state.isLoading = false;
            state.error = '';
        },
        loginError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.user = initialState.user;
            state.isAuth = initialState.isAuth;
            state.error = action.payload;
        },
        refreshPending(state) {
            state.isLoading = true;
        },
        refreshSuccess(state, action: PayloadAction<IAccessPayload>) {
            const { payload } = action;
            state.user = {
                ...payload.user,
                id: payload.id,
                type: payload.type,
                roles: payload.roles,
                emailConfirmed: payload.emailConfirmed,
                passwordNeedReset: payload.passwordNeedReset
            };
            state.isAuth = true;
            state.isLoading = false;
            state.error = '';
        },
        refreshError(state) {
            state.isLoading = false;
            state.user = initialState.user;
            state.isAuth = initialState.isAuth;
        },
        logout: () => initialState
    }
});

const authReducer = authSlice.reducer;
export default authReducer;
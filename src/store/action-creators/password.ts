import { createAppAsyncThunk } from "../../hooks/redux";
import PasswordService from "../../services/PasswordService";
import { authSlice } from "../reducers/AuthSlice";
import { logout } from "./auth";

export const sendResetToken = createAppAsyncThunk<
    void,
    string,
    { rejectValue: string; }
>(
    "password/send",
    async (email: string, thunkAPI) => {
        try {
            await PasswordService.sendToken(email);
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось отправить письмо. Попробуйте еще раз.");
        }
    }
);

interface IChangePasswordArg {
    token: string,
    newPassword: string;
}

export const changePassword = createAppAsyncThunk<
    void,
    IChangePasswordArg,
    { rejectValue: string; }
>(
    "password/change",
    async ({ token, newPassword }, thunkAPI) => {
        try {
            await PasswordService.changePassword(token, newPassword);
            if (thunkAPI.getState().authReducer.isAuth) {
                thunkAPI.dispatch(authSlice.actions.logout());
            }
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось сбросить пароль. Используйте новую ссылку.");
        }
    }
);
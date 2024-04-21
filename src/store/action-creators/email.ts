import { AxiosError } from "axios";
import { AppDispatch } from "../store";
import { emailSlice } from "../reducers/EmailSlice";
import EmailService from "../../services/EmailService";
import { refresh } from "./auth";
import { createAppAsyncThunk } from "../../hooks/redux";

interface IEmailInfo {
    email: string;
    isAvailable: boolean;
};

export const fetchEmailAvailable = createAppAsyncThunk<
    IEmailInfo,
    string,
    { rejectValue: string; }
>(
    "email/available",
    async (email: string, thunkAPI) => {
        try {
            const response = await EmailService.isAvailable(email);
            return { email, isAvailable: response.data };
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status == 400) {
                    return thunkAPI.rejectWithValue("Проверьте корректность почты");
                }
            }
            return thunkAPI.rejectWithValue("Не удалось проверить доступность почты");
        }
    }
);

export const emailAvailabilityReset = () => async (dispatch: AppDispatch) => {
    dispatch(emailSlice.actions.reset());
};

export const sendEmailConfirmation = createAppAsyncThunk<
    string,
    string,
    { rejectValue: string; }
>(
    "email/send",
    async (email: string, thunkAPI) => {
        try {
            const response = await EmailService.sendConfirmation(email);
            await thunkAPI.dispatch(refresh());
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось отправить подтверждение. Попробуйте еще раз");
        }
    }
);

export const resendEmailConfirmation = createAppAsyncThunk<
    string,
    void,
    { rejectValue: string; }
>(
    "email/resend",
    async (_, thunkAPI) => {
        try {
            const response = await EmailService.resendConfirmation();
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось отправить подтверждение. Попробуйте еще раз");
        }
    }
);

export const confirmEmail = createAppAsyncThunk<
    boolean,
    string,
    { rejectValue: string; }
>(
    "email/confirm",
    async (token: string, thunkAPI) => {
        try {
            await EmailService.confirmEmail(token);
            await thunkAPI.dispatch(refresh());
            return true;
        } catch (e) {
            return thunkAPI.rejectWithValue("Ошибка подтвреждения почты");
        }
    }
);
import { createSlice } from "@reduxjs/toolkit";
import { resendEmailConfirmation, sendEmailConfirmation } from "../action-creators/email";

interface IEmailSendState {
    email?: string;
    isLoading: boolean;
    error: string;
}

const initialState: IEmailSendState = {
    email: undefined,
    isLoading: false,
    error: ''
};

const emailSendSlice = createSlice({
    name: "emailSend",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendEmailConfirmation.pending, (state) => {
                state.email = undefined;
                state.isLoading = true;
            })
            .addCase(sendEmailConfirmation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.email = action.payload;
            })
            .addCase(sendEmailConfirmation.rejected, (state, action) => {
                state.isLoading = false;
                state.email = undefined;
                state.error = action.payload ?? "Произошла ошибка";
            })
            .addCase(resendEmailConfirmation.pending, (state) => {
                state.email = undefined;
                state.isLoading = true;
            })
            .addCase(resendEmailConfirmation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.email = action.payload;
            })
            .addCase(resendEmailConfirmation.rejected, (state, action) => {
                state.isLoading = false;
                state.email = undefined;
                state.error = action.payload ?? "Произошла ошибка";
            });

    }
});

const emailSendReducer = emailSendSlice.reducer;
export default emailSendReducer;
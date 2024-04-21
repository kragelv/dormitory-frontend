import { createSlice } from "@reduxjs/toolkit";
import { confirmEmail } from "../action-creators/email";

interface IEmailConfirmState {
    confirmed: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: IEmailConfirmState = {
    confirmed: false,
    isLoading: false,
    error: ''
};

const emailConfirmSlice = createSlice({
    name: "emailConfirm",
    initialState: initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(confirmEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(confirmEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.confirmed = action.payload;
                state.error = '';
            })
            .addCase(confirmEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? "Ошибка!";
            });
    }
});

const emailConfirmReducer = emailConfirmSlice.reducer;
export default emailConfirmReducer;
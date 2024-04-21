import { createSlice } from "@reduxjs/toolkit";
import { sendResetToken } from "../action-creators/password";

interface IPasswordSendState {
    email: string;
    isLoading: boolean;
    error: string;
}

const initialState: IPasswordSendState = {
    email: '',
    isLoading: false,
    error: ''
};

export const passwordSlice = createSlice({
    name: "passwordSend",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendResetToken.pending, (state, action) => {
                state.email = action.meta.arg;
                state.isLoading = true;
            })
            .addCase(sendResetToken.fulfilled, (state, action) => {
                state.email = action.meta.arg;
                state.isLoading = false;
                state.error = '';
            })
            .addCase(sendResetToken.rejected, (state, action) => {
                state.error = action.meta.arg;
                state.isLoading = false;
            });
    }
})

const passwordSendReducer = passwordSlice.reducer;
export default passwordSendReducer;

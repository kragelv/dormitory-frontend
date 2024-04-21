import { createSlice } from "@reduxjs/toolkit";
import { changePassword } from "../action-creators/password";

interface IPasswordChangeState {
    changed: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: IPasswordChangeState = {
    changed: false,
    isLoading: false,
    error: ''
};

const passwordChangeSlice = createSlice({
    name: "passwordChange",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isLoading = false;
                state.changed = true;
                state.error = '';
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.changed = false;
                state.error = action.payload ?? "Произошла ошибка";
            });
    }
});

const passwordChangeReducer = passwordChangeSlice.reducer;
export default passwordChangeReducer;
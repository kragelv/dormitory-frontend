import { createSlice } from "@reduxjs/toolkit";
import { fetchEmailAvailable } from "../action-creators/email";

interface IEmailState {
    email: string;
    isAvailable?: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: IEmailState = {
    email: '',
    isAvailable: undefined,
    isLoading: false,
    error: ''
};

export const emailSlice = createSlice({
    name: "email",
    initialState: initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmailAvailable.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEmailAvailable.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.isAvailable = action.payload.isAvailable;
                state.email = action.payload.email;
            })
            .addCase(fetchEmailAvailable.rejected, (state, action) => {
                state.isLoading = false;
                state.isAvailable = undefined;
                state.email = '';
                state.error = action.payload ?? "Произошла ошибка";
            });
    }
});

const emailReducer = emailSlice.reducer;
export default emailReducer;
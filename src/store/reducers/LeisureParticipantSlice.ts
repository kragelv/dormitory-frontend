import { createSlice } from "@reduxjs/toolkit";
import { studentJoin, studentLeave } from "../action-creators/leisure";

interface IParticipantState {
    isParticipant: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: IParticipantState = {
    isParticipant: false,
    isLoading: false,
    error: ''
};

export const participantSlice = createSlice({
    name: "participant",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(studentJoin.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(studentJoin.fulfilled, (state) => {
            state.isLoading = false;
            state.isParticipant = true;
            state.error = '';
        })
        .addCase(studentJoin.rejected, (state, action) => {
            state.isLoading = false;
            state.isParticipant = false;
            state.error = action.payload ?? "Не удалось присоединиться к кружку";
        })
        .addCase(studentLeave.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(studentLeave.fulfilled, (state) => {
            state.isLoading = false;
            state.isParticipant = false;
            state.error = '';
        })
        .addCase(studentLeave.rejected, (state, action) => {
            state.isLoading = false;
            state.isParticipant = true;
            state.error = action.payload ?? "Не удалось покинуть кружок";
        })
    }
})

const leisureParticipantReducer = participantSlice.reducer;
export default leisureParticipantReducer;
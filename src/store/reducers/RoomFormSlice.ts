import { createSlice } from "@reduxjs/toolkit";
import { create } from "domain";
import { createRoom, updateRoom } from "../action-creators/room";

interface IRoomAddState {
    success: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: IRoomAddState = {
    success: false,
    isLoading: false,
    error: ''
};

export const roomFormSlice = createSlice({
    name: "roomAdd",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRoom.pending, (state) => {
                state.isLoading = true;
                state.success = false;
            })
            .addCase(createRoom.fulfilled, (state) => {
                state.success = true;
                state.isLoading = false;
                state.error = '';
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.success = false;
                state.isLoading = false;
                state.error = action.payload ?? "Не удалось создать комнату";
            })
            .addCase(updateRoom.pending, (state) => {
                state.isLoading = true;
                state.success = false;
            })
            .addCase(updateRoom.fulfilled, (state) => {
                state.success = true;
                state.isLoading = false;
                state.error = '';
            })
            .addCase(updateRoom.rejected, (state, action) => {
                state.success = false;
                state.isLoading = false;
                state.error = action.payload ?? "Не удалось обновить кружок";
            });
    }
});

const roomFormReducer = roomFormSlice.reducer;
export default roomFormReducer;
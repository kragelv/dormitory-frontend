import { createSlice } from "@reduxjs/toolkit";
import { create } from "domain";
import { createRoom } from "../action-creators/room";

interface IRoomAddState {
    isLoading: boolean;
    error: string;
}

const initialState: IRoomAddState = {
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
            })
            .addCase(createRoom.fulfilled, (state) => {
                state.isLoading = false;
                state.error = '';
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? "Не удалось создать комнату";
            });
    }
});

const roomFormReducer = roomFormSlice.reducer;
export default roomFormReducer;
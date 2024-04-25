import { createSlice } from "@reduxjs/toolkit";
import { IRoomResponse } from "../../models/room/response/IRoomResponse";
import { fetchRoom, updateRoom } from "../action-creators/room";

interface IRoomState {
    room?: IRoomResponse,
    isLoading: boolean,
    error: string;
}

const initialState: IRoomState = {
    room: undefined,
    isLoading: false,
    error: ''
};

export const roomSlice = createSlice({
    name: "room",
    initialState: initialState,
    reducers: {
        setRoom(state, action) {
            state.room = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoom.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.room = action.payload;
                state.error = '';
            })
            .addCase(fetchRoom.rejected, (state, action) => {
                state.isLoading = false;
                state.room = undefined;
                state.error = action.payload ?? "Не удалось загрузить кружок";
            })
    }
});

const roomReducer = roomSlice.reducer;
export default roomReducer;
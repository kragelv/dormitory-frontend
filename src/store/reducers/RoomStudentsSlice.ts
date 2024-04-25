import { createSlice } from "@reduxjs/toolkit";
import { IRoomStudent } from "../../models/room/response/IRoomStudent";
import { fetchRoomStudents } from "../action-creators/room";

interface IRoomStudentsState {
    students: IRoomStudent[];
    isLoading: boolean;
    error: string;
}

const initialState: IRoomStudentsState = {
    students: [],
    isLoading: false,
    error: ''
};

export const roomStudentsSlice = createSlice({
    name: "roomStudents",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomStudents.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRoomStudents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.students = action.payload;
                state.error = '';
            })
            .addCase(fetchRoomStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.students = [];
                state.error = action.payload ?? "Не удалось загрузить участников кружка";
            });
    }
})

const roomStudentsReducer = roomStudentsSlice.reducer;
export default roomStudentsReducer;
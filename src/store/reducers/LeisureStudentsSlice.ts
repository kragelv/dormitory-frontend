import { createSlice } from "@reduxjs/toolkit";
import { ILeisureStudent } from "../../models/leisure/response/ILeisureStudent";
import { fetchLeisureStudents } from "../action-creators/leisure";

interface ILeisureStudentsState {
    students: ILeisureStudent[];
    isLoading: boolean;
    error: string;
}

const initialState: ILeisureStudentsState = {
    students: [],
    isLoading: false,
    error: ''
};

export const leisureStudentsSlice = createSlice({
    name: "leisureStudents",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeisureStudents.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLeisureStudents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.students = action.payload;
                state.error = '';
            })
            .addCase(fetchLeisureStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.students = [];
                state.error = action.payload ?? "Не удалось загрузить участников кружка";
            });
    }
})

const leisureStudentsReducer = leisureStudentsSlice.reducer;
export default leisureStudentsReducer;
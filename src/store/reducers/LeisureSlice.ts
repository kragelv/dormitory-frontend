import { createSlice } from "@reduxjs/toolkit";
import { ILeisureResponse } from "../../models/leisure/response/ILeisureResponse";
import { fetchLeisure } from "../action-creators/leisure";

interface ILeisureState {
    leisure?: ILeisureResponse,
    isLoading: boolean,
    error: string;
}

const initialState: ILeisureState = {
    leisure: undefined,
    isLoading: false,
    error: ''
};

export const leisureSlice = createSlice({
    name: "leisure",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeisure.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLeisure.fulfilled, (state, action) => {
                state.isLoading = false;
                state.leisure = action.payload;
                state.error = '';
            })
            .addCase(fetchLeisure.rejected, (state, action) => {
                state.isLoading = false;
                state.leisure = undefined;
                state.error = action.payload ?? "Не удалось загрузить кружок";
            });
    }
});

const leisureReducer = leisureSlice.reducer;
export default leisureReducer;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPageParams } from "../../models/IPageParams";
import { Page } from "../../models/Page";
import { IRoomResponse } from "../../models/room/response/IRoomResponse";
import { fetchRoomPage } from "../action-creators/room";

interface ILeisurePageState {
    page: number,
    params: IPageParams,
    roomPage: Page<IRoomResponse>;
    isLoading: boolean;
    error: string;
}

const initialState: ILeisurePageState = {
    page: 1,
    params: {} as ILeisurePageState['params'],
    roomPage: {
        totalPages: 0,
        totalElements: 0,
        content: []
    },
    isLoading: false,
    error: ''
};

export const roomPageSlice = createSlice({
    name: "room",
    initialState: initialState,
    reducers: {
        roomPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
            state.params.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRoomPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roomPage = action.payload;
                state.error = '';
            })
            .addCase(fetchRoomPage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? "Не удалось загрузить страницу";
            });
    }
});

const roomPageReducer = roomPageSlice.reducer;
export default roomPageReducer;

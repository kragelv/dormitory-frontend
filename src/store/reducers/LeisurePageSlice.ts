import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILeisureResponse } from "../../models/leisure/response/ILeisureResponse";
import { ILeisureStudent } from "../../models/leisure/response/ILeisureStudent";
import { ILesiurePageParams } from "../../models/leisure/request/ILeisurePageParams";
import { fetchLeisure, fetchLeisurePage } from "../action-creators/leisure";
import { Page } from "../../models/Page";

interface IFilterPayload {
    filter: ILeisureFilter,
    organizer?: string,
    student?: string;
}

export enum ILeisureFilter {
    ALL = 'ALL',
    MY = 'MY'
}

interface ILeisurePageState {
    filter: ILeisureFilter,
    page: number,
    params: ILesiurePageParams,
    leisurePage: Page<ILeisureResponse>;
    isLoading: boolean;
    error: string;
}

const initialState: ILeisurePageState = {
    filter: ILeisureFilter.ALL,
    page: 1,
    params: {} as ILeisurePageState['params'],
    leisurePage: {
        totalPages: 0,
        totalElements: 0,
        content: []
    },
    isLoading: false,
    error: ''
};

export const leisurePageSlice = createSlice({
    name: "leisure",
    initialState: initialState,
    reducers: {
        leisurePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
            state.params.page = action.payload;
        },
        filter: (state, action: PayloadAction<IFilterPayload>) => {
            state.filter = action.payload.filter;
            state.params.student = action.payload.student;
            state.params.organizer = action.payload.organizer;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeisurePage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLeisurePage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.leisurePage = action.payload;
                state.error = '';
            })
            .addCase(fetchLeisurePage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? "Не удалось загрузить страницу";
            });
    },
});

const leisurePageReducer = leisurePageSlice.reducer;
export default leisurePageReducer;
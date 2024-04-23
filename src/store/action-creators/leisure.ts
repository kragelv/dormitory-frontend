import { Page } from "../../models/Page";
import { ILesiurePageParams } from "../../models/leisure/request/ILeisurePageParams";
import { ILeisureRequest } from "../../models/leisure/request/ILeisureRequest";
import { ILeisureResponse } from "../../models/leisure/response/ILeisureResponse";
import LeisureService from "../../services/LeisureService";
import { createAppAsyncThunk } from "../hook/redux";
import { ILeisureFilter, leisureSlice } from "../reducers/LeisureSlice";
import { AppDispatch } from "../store";

export const setLeisurePage = (page: number) => async (dispatch: AppDispatch) => {
    dispatch(leisureSlice.actions.leisurePage(page));
};

export const setFilter = (filter: ILeisureFilter, organizer?: string, student?: string) => async (dispatch: AppDispatch) => {
    dispatch(leisureSlice.actions.filter({ filter, organizer, student }));
};

export const fetchLeisurePage = createAppAsyncThunk<
    Page<ILeisureResponse>,
    ILesiurePageParams,
    { rejectValue: string; }
>(
    "leisure/fetchLeisurePage",
    async (params: ILesiurePageParams, thunkAPI) => {
        try {
            const response = await LeisureService.getPage(params);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить страницу");
        }
    }
);

export const fetchLeisure = createAppAsyncThunk<
    ILeisureResponse,
    string,
    { rejectValue: string; }
>(
    "leisure/fetchLeisure",
    async (id: string, thunkAPI) => {
        try {
            const response = await LeisureService.getById(id);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить кружок");
        }
    }
);

export const updateLeisure = createAppAsyncThunk<
    string,
    ILeisureRequest,
    { rejectValue: string; }
>(
    "leisure/updateLeisure",
    async (leisure: ILeisureRequest, thunkAPI) => {
        try {
            const response = await LeisureService.create(leisure);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось создать кружок");
        }
    }
);

export const deleteLeisure = createAppAsyncThunk<
    void,
    string,
    { rejectValue: string; }
>(
    "leisure/deleteLeisure",
    async (id: string, thunkAPI) => {
        try {
            await LeisureService.deleteById(id);
        }
        catch (e) {
            return thunkAPI.rejectWithValue("Не удалось удалить кружок");
        }
    }
);
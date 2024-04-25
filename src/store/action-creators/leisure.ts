import { Page } from "../../models/Page";
import { ILesiurePageParams } from "../../models/leisure/request/ILeisurePageParams";
import { ILeisureRequest } from "../../models/leisure/request/ILeisureRequest";
import { ILeisureResponse } from "../../models/leisure/response/ILeisureResponse";
import LeisureService from "../../services/LeisureService";
import { createAppAsyncThunk } from "../hook/redux";
import { ILeisureFilter, leisurePageSlice } from "../reducers/LeisurePageSlice";
import { AppDispatch } from "../store";
import { ILeisureStudent } from "../../models/leisure/response/ILeisureStudent";

export const setLeisurePage = (page: number) => async (dispatch: AppDispatch) => {
    dispatch(leisurePageSlice.actions.leisurePage(page));
};

export const setFilter = (filter: ILeisureFilter, organizer?: string, student?: string) => async (dispatch: AppDispatch) => {
    dispatch(leisurePageSlice.actions.filter({ filter, organizer, student }));
};

export const fetchLeisurePage = createAppAsyncThunk<
    Page<ILeisureResponse>,
    ILesiurePageParams,
    { rejectValue: string; }
>(
    "leisure/fetchLeisurePage",
    async (params: ILesiurePageParams, thunkAPI) => {
        try {
            const response = await LeisureService.getPage({ ...params, limit: 5 });
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

export const createLeisure = createAppAsyncThunk<
    string,
    ILeisureRequest,
    { rejectValue: string; }
>(
    "leisure/createLeisure",
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

export const fetchLeisureStudents = createAppAsyncThunk<
    ILeisureStudent[],
    string,
    { rejectValue: string; }
>(
    "leisure/fetchLeisureStudents",
    async (leisureId: string, thunkAPI) => {
        try {
            const response = await LeisureService.getStudentsByLeisureId(leisureId);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить участников кружка");
        }
    }
);

export const studentJoin = createAppAsyncThunk<
    void,
    string,
    { rejectValue: string; }
>(
    "leisure/studentJoin",
    async (leisureId: string, thunkAPI) => {
        try {
            await LeisureService.studentJoin(leisureId);
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось присоединиться к кружку");
        }
    }
);

export const studentLeave = createAppAsyncThunk<
    void,
    string,
    { rejectValue: string; }
>(
    "leisure/studentLeave",
    async (leisureId: string, thunkAPI) => {
        try {
            await LeisureService.studentLeave(leisureId);
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось покинуть кружок");
        }
    }
);

export const fetchIsParticipant = createAppAsyncThunk<
    boolean,
    string,
    { rejectValue: string; }
>(
    "leisure/fetchIsParticipant",
    async (leisureId: string, thunkAPI) => {
        try {
            const response = await LeisureService.isParticipant(leisureId);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось проверить участие в кружке");
        }
    }
)
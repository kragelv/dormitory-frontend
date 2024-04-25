import { IPageParams } from "../../models/IPageParams";
import { Page } from "../../models/Page";
import { IRoomRequest } from "../../models/room/request/IRoomRequest";
import { IRoomResponse } from "../../models/room/response/IRoomResponse";
import { IRoomStudent } from "../../models/room/response/IRoomStudent";
import RoomService from "../../services/RoomService";
import { createAppAsyncThunk } from "../hook/redux";
import { roomPageSlice } from "../reducers/RoomPageSlice";
import { roomSlice } from "../reducers/RoomSlice";
import { AppDispatch } from "../store";

export const setRoom = (room: IRoomResponse) => async (dispatch: AppDispatch) => {
    dispatch(roomSlice.actions.setRoom(room));
}

export const setRoomPage = (page: number) => async (dispatch: AppDispatch) => {
    dispatch(roomPageSlice.actions.roomPage(page));
};

export const fetchRoomPage = createAppAsyncThunk<
    Page<IRoomResponse>,
    IPageParams,
    { rejectValue: string; }
>(
    "room/fetchRoomPage",
    async (params: IPageParams, thunkAPI) => {
        try {
            const response = await RoomService.getPage({ ...params, limit: 5 });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить страницу");
        }
    }
);

export const fetchRoom = createAppAsyncThunk<
    IRoomResponse,
    string,
    { rejectValue: string; }
>(
    "room/fetchRoom",
    async (id: string, thunkAPI) => {
        try {
            const response = await RoomService.getById(id);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить комнату");
        }
    }
);

export const createRoom = createAppAsyncThunk<
    string,
    IRoomRequest,
    { rejectValue: string; }
>(
    "room/createRoom",
    async (room: IRoomRequest, thunkAPI) => {
        try {
            const response = await RoomService.create(room);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось создать комнату");
        }
    }
);


export const updateRoom = createAppAsyncThunk<
    IRoomResponse,
    { id: string, room: IRoomRequest; },
    { rejectValue: string; }
>(
    "room/updateRoom",
    async ({ id, room }, thunkAPI) => {
        try {
            const response = await RoomService.update(id, room);
            thunkAPI.dispatch(setRoom(response.data));
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось обновить комнату");
        }
    }
);

export const deleteRoom = createAppAsyncThunk<
    void,
    string,
    { rejectValue: string; }
>(
    "room/deleteRoom",
    async (id: string, thunkAPI) => {
        try {
            await RoomService.deleteById(id);
        }
        catch (e) {
            return thunkAPI.rejectWithValue("Не удалось удалить комнату");
        }
    }
);

export const fetchRoomStudents = createAppAsyncThunk<
    IRoomStudent[],
    string,
    { rejectValue: string; }
>(
    "room/fetchRoomStudents",
    async (roomId: string, thunkAPI) => {
        try {
            const response = await RoomService.getStudentsByRoomId(roomId);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить проживающих");
        }
    }
);
import { AxiosResponse } from "axios";
import $api from "../http";
import { IPageParams } from "../models/IPageParams";
import { Page } from "../models/Page";
import { IRoomResponse } from "../models/room/response/IRoomResponse";
import { IRoomRequest } from "../models/room/request/IRoomRequest";
import { IRoomStudent } from "../models/room/response/IRoomStudent";

export default class RoomService {
    static async getPage(params: IPageParams): Promise<AxiosResponse<Page<IRoomResponse>>> {
        return await $api.get<Page<IRoomResponse>>('/v1/rooms', { params: params });
    }

    static async getById(id: string): Promise<AxiosResponse<IRoomResponse>> {
        return await $api.get<IRoomResponse>(`/v1/rooms/${id}`);
    }

    static async getByNumber(number: number): Promise<AxiosResponse<IRoomResponse>> {
        return await $api.get<IRoomResponse>(`/v1/rooms/number/${number}`);
    }

    static async create(room: IRoomRequest): Promise<AxiosResponse<string>> {
        return await $api.post<string>('/v1/rooms', room);
    }

    static async update(id: string, room: IRoomRequest): Promise<AxiosResponse<IRoomResponse>> {
        return await $api.put<IRoomResponse>(`/v1/rooms/${id}`, room);
    }
   
    static async deleteById(id: string): Promise<void> {
        return await $api.delete(`/v1/rooms/${id}`);
    }

    static async getStudentsByRoomId(id: string): Promise<AxiosResponse<IRoomStudent[]>> {
        return await $api.get<IRoomStudent[]>(`/v1/rooms/${id}/students`);
    }

}
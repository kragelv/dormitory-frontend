import { AxiosResponse } from "axios";
import { ILesiurePageParams } from "../models/leisure/request/ILeisurePageParams";
import { ILeisureResponse } from "../models/leisure/response/ILeisureResponse";
import $api from "../http";
import { ILeisureStudent } from "../models/leisure/response/ILeisureStudent";
import { ILeisureRequest } from "../models/leisure/request/ILeisureRequest";
import { Page } from "../models/Page";


export default class LeisureService {
    static async getPage(params: ILesiurePageParams): Promise<AxiosResponse<Page<ILeisureResponse>>> {
        return await $api.get<Page<ILeisureResponse>>('/v1/leisures', { params: params });
    }

    static async getById(id: string): Promise<AxiosResponse<ILeisureResponse>> {
        return await $api.get<ILeisureResponse>(`/v1/leisures/${id}`);
    }

    static async create(leisure: ILeisureRequest): Promise<AxiosResponse<string>> {
        return await $api.post<string>('/v1/leisures', leisure);
    }

    static async deleteById(id: string) : Promise<AxiosResponse<void>> {
        return await $api.delete<void>(`/v1/leisures/${id}`);
    }

    static async getStudentsByLeisureId(id: string): Promise<AxiosResponse<ILeisureStudent[]>> {
        return await $api.get<ILeisureStudent[]>(`/v1/leisures/${id}/students`)
    }

    static async studentJoin(leisureId: string) : Promise<AxiosResponse<void>> {
        return await $api.post<void>(`/v1/leisures/${leisureId}/join`)
    }

    static async studentLeave(leisureId: string) : Promise<AxiosResponse<void>> {
        return await $api.post<void>(`/v1/leisures/${leisureId}/leave`)
    }
}
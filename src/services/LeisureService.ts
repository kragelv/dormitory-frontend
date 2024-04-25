import { AxiosResponse } from "axios";
import { ILesiurePageParams } from "../models/leisure/request/ILeisurePageParams";
import { ILeisureResponse } from "../models/leisure/response/ILeisureResponse";
import $api from "../http";
import { ILeisureStudent } from "../models/leisure/response/ILeisureStudent";
import { ILeisureRequest } from "../models/leisure/request/ILeisureRequest";
import { Page } from "../models/Page";

type IRealLeisureResponse = Omit<ILeisureResponse, 'time'> & { time: string; };

const convertUtcTimeStringToTime = (time: string): number => {
    const date = new Date(`1970-01-01T${time}Z`);
    const t = date.getTime();
    if (isNaN(t)) {
        throw new Error(`Invalid date`);
    }
    return t;
};


export default class LeisureService {
    static async getPage(params: ILesiurePageParams): Promise<AxiosResponse<Page<ILeisureResponse>>> {
        let response = await $api.get<Page<IRealLeisureResponse>>('/v1/leisures', { params: params });
        const mappedResponse = {
            ...response,
            data: {
                ...response.data,
                content: response.data.content.map(l => ({ ...l, time: convertUtcTimeStringToTime(l.time) }))
            }
        };
        return mappedResponse;
    }

    static async getById(id: string): Promise<AxiosResponse<ILeisureResponse>> {
        const response = await $api.get<IRealLeisureResponse>(`/v1/leisures/${id}`)
        const { data } = response;
        const mappedResponse = {
            ...response,
            data: {
                ...data,
                time: convertUtcTimeStringToTime(data.time)
            }
        }
        return mappedResponse;
    }

    static async create(leisure: ILeisureRequest): Promise<AxiosResponse<string>> {
        return await $api.post<string>('/v1/leisures', leisure);
    }

    static async deleteById(id: string): Promise<AxiosResponse<void>> {
        return await $api.delete<void>(`/v1/leisures/${id}`);
    }

    static async getStudentsByLeisureId(id: string): Promise<AxiosResponse<ILeisureStudent[]>> {
        return await $api.get<ILeisureStudent[]>(`/v1/leisures/${id}/students`);
    }

    static async isParticipant(leisureId: string): Promise<AxiosResponse<boolean>> {
        return await $api.get<boolean>(`/v1/leisures/${leisureId}/is-participant`);
    }

    static async studentJoin(leisureId: string): Promise<AxiosResponse<void>> {
        return await $api.post<void>(`/v1/leisures/${leisureId}/join`);
    }

    static async studentLeave(leisureId: string): Promise<AxiosResponse<void>> {
        return await $api.post<void>(`/v1/leisures/${leisureId}/leave`);
    }
}
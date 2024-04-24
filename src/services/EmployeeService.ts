import { AxiosResponse } from "axios";
import { IEmployeeResponse } from "../models/employee/response/IEmployeeResponse";
import $api from "../http";
import { IEmployeeRequest } from "../models/employee/request/IEmployeeRequest";
import { Page } from "../models/Page";

export default class LeisureService {
    static async create(employee: IEmployeeRequest): Promise<AxiosResponse<string>> {
        return await $api.post<string>('/v1/auth/register-employee', employee);
    }
}
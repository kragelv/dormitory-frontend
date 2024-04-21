import { AxiosResponse } from "axios";
import { IAccessResponse } from "../models/auth/response/IAccessResponse";
import $api from "../http";

export default class AuthService {
    static async login(cardId: string, password: string) : Promise<AxiosResponse<IAccessResponse>> {
        return $api.post<IAccessResponse>("/v1/auth/login", { cardId: cardId, password: password });     
    }

    static async logout() : Promise<void> {
        return $api.post("/v1/auth/logout");     
    }
}
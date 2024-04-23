import { AxiosResponse } from "axios";
import $api from "../http";

export default class PasswordService {
    static async sendToken(email: string): Promise<void> {
        return await $api.post('/v1/password/send', { email: email });
    }

    static async changePassword(token: string, newPassword: string): Promise<void> {
        return await $api.post('/v1/password/change', { token: token, password: newPassword });
    }
}
import { AxiosResponse } from "axios";
import $api from "../http";

export default class EmailService {
    static async isAvailable(email: string): Promise<AxiosResponse<boolean>> {
        return await $api.get<boolean>('/v1/email/available', { params: { email: email } });
    }

    static async sendConfirmation(email: string): Promise<AxiosResponse<string>> {
        return await $api.post('/v1/email/send', { email: email });
    }

    static async resendConfirmation(): Promise<AxiosResponse<string>> {
        return await $api.post('/v1/email/resend');
    }

    static async confirmEmail(token: string): Promise<void> {
        return await $api.post('/v1/email/confirm', { token: token });
    }
}
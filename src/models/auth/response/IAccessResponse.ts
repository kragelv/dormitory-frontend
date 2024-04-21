import { IFullName } from "../../IFullName";

export interface IAccessResponseUser {
    id: string;
    cardId: string;
    email: string | null;
    fullName: IFullName;
}

export interface IAccessResponse {
    accessToken: string;
    user: IAccessResponseUser;
}

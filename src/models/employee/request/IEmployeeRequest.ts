import { IFullName } from "../../IFullName";

export interface IEmployeeRequest {
    cardId: string;
    birthdate: Date;
    residentialAddress: string;
    phoneNumber: string;
}
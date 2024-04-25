import { IFullName } from "../../IFullName";

export interface ILeisureStudent {
    id: string;
    groupNumber: string;
    fullName: IFullName;
    phoneNumber: string;
    roomNumber?: number;
}
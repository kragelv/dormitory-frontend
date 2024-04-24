import { IFullName } from "../../IFullName";

export interface ILeisureStudent {
    id: string;
    cardId: string;
    fullName: IFullName;
    phoneNumber: string;
    roomNumber?: number;
}
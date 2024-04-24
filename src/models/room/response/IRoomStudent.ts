import { IFullName } from "../../IFullName";

export interface IRoomStudent {
    contractId: string;
    id: string;
    cardId: string;
    fullName: IFullName;
    groupNumber: string;
}
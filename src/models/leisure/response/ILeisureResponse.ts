import { IFullName } from "../../IFullName";

interface IEmployee {
    id: string;
    fullName: IFullName;
}

export interface ILeisureResponse {
    id: string;
    title: string;
    day: string;
    time: string;
    organizer: IEmployee;
    studentTotalElements: number;
}
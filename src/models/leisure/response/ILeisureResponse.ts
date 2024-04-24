import { IFullName } from "../../IFullName";
import { DayOfWeek } from "../DayOfWeek";

interface IEmployee {
    id: string;
    fullName: IFullName;
}

export interface ILeisureResponse {
    id: string;
    title: string;
    day: DayOfWeek;
    time: number;
    organizer: IEmployee;
    studentTotalElements: number;
}
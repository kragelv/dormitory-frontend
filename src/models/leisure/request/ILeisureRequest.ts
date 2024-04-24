import { DayOfWeek } from "../DayOfWeek";

export interface ILeisureRequest {
    title: string;
    day: DayOfWeek;
    time: string;
}
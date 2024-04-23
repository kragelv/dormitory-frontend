import { IPageParams } from "../../IPageParams";

export interface ILesiurePageParams extends IPageParams {
    organizer?: string;
    student?: string;
}
import { useEffect } from "react";
import { IFullName } from "./models/IFullName";

export const DEFAULT_LIMIT = 10;
export const SITE_NAME: string = "Общежитие";
export const TITLE_DELIM: string = " | ";

export const useTitle = (title?: string) => {
    useEffect(() => {
        document.title = title === undefined ? SITE_NAME : SITE_NAME + TITLE_DELIM + title;
    }, [title]);
};

export const fullNameToString = (fullName: IFullName): string => {
    return [fullName.surname, fullName.name, fullName.patronymic]
    .filter(value => value !== undefined && value.trim() !== "")
    .join(" ");
}
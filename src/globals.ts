import { useEffect } from "react";
import { IFullName } from "./models/IFullName";
import { DayOfWeek } from "./models/leisure/DayOfWeek";

export const DEFAULT_LIMIT = 10;
export const SITE_NAME: string = "Общежитие";
export const TITLE_DELIM: string = " | ";

export const dayOfWeekNames: { [key in DayOfWeek]: string } = {
    MONDAY: 'Понедельник',
    TUESDAY: 'Вторник',
    WEDNESDAY: 'Среда',
    THURSDAY: 'Четверг',
    FRIDAY: 'Пятница',
    SATURDAY: 'Суббота',
    SUNDAY: 'Воскресенье',
};

export const toHm = (time: number): string => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
};

export const useTitle = (title?: string) => {
    useEffect(() => {
        document.title = title === undefined ? SITE_NAME : SITE_NAME + TITLE_DELIM + title;
    }, [title]);
};

export const fullNameToString = (fullName: IFullName): string => {
    return [fullName.surname, fullName.name, fullName.patronymic]
        .filter(value => value !== undefined && value.trim() !== "")
        .join(" ");
};
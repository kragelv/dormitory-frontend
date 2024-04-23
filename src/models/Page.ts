export type Page<T> = {
    totalElements: number;
    totalPages: number;
    content: T[];
}
import "./Pagination.css";
import { FC } from "react";
import { Link } from "react-router-dom";

type TypePaginationProps = {
    currentPage: number;
    pagesCount: number;
    patternTo?: string;
};

const FIRST_PAGE = 1;
const MAX_BUTTONS = 9;
const SIDE_BTN_COUNT = 2;
export const PAGE_PATTERN = '*page*';
const DEFAULT_PATTERN_TO = '*page*';

function pageLink(pattern: string, page: number): string {
    return pattern.replaceAll(PAGE_PATTERN, page.toString());
}

const Pagination: FC<TypePaginationProps> = ({ currentPage, pagesCount, patternTo }) => {
    const _patternTo = patternTo ?? DEFAULT_PATTERN_TO;
    const halfMax = Math.floor(MAX_BUTTONS / 2);
    let result: number[] = [];
    if (pagesCount <= 0)
        return null;
    if (pagesCount <= MAX_BUTTONS) {
        for (let i = FIRST_PAGE; i <= pagesCount; i++) {
            result.push(i);
        }
    } else {
        if (currentPage <= halfMax + 1) {
            for (let i = FIRST_PAGE; i < MAX_BUTTONS - SIDE_BTN_COUNT; i++) {
                result.push(i);
            }
            result.push(pagesCount);
        } else if (currentPage >= pagesCount - halfMax) {
            result.push(FIRST_PAGE);
            for (let i = pagesCount - halfMax - SIDE_BTN_COUNT + 1; i <= pagesCount; i++) {
                result.push(i);
            }
        } else {
            result.push(FIRST_PAGE);
            for (let i = currentPage - SIDE_BTN_COUNT; i <= currentPage + SIDE_BTN_COUNT; i++) {
                result.push(i);
            }
            result.push(pagesCount);
        }
    }
    return (
        <nav aria-label="pagination">
            <ul className="pagination">
                <li key={`prev`} className={[
                    "page-item",
                    currentPage === FIRST_PAGE ? "disabled" : ""
                ].join(" ")}>
                    <Link className="page-link" to={pageLink(_patternTo, currentPage - 1)}>&lt;</Link>
                </li>
                {result.map((page) => {
                    const link = pageLink(_patternTo, page);
                    return (
                        <li key={link} className={[
                            "page-item",
                            currentPage === page ? "active" : ""
                        ].join(" ")}>
                            <Link className="page-link" to={link}>{page}</Link>
                        </li>
                    );
                }
                )}
                <li key={`next`} className={[
                    "page-item",
                    currentPage === pagesCount ? "disabled" : ""
                ].join(" ")}>
                    <Link className="page-link" to={pageLink(_patternTo, currentPage + 1)}>&gt;</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
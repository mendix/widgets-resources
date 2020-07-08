import { createElement, ReactElement } from "react";

export interface PaginationProps {
    canNextPage: boolean;
    canPreviousPage: boolean;
    gotoPage: (page: number) => void;
    nextPage: () => void;
    numberOfItems?: number;
    page: number;
    pageSize: number;
    previousPage: () => void;
}

export function Pagination({
    gotoPage,
    previousPage,
    page,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageSize,
    numberOfItems
}: PaginationProps): ReactElement {
    const numberOfPages = numberOfItems !== undefined ? Math.ceil(numberOfItems / pageSize) : undefined;
    const lastPage = numberOfPages !== undefined ? numberOfPages - 1 : 0;
    const hasLastPage = numberOfPages !== undefined;
    const initialItem = page * pageSize + 1;
    const lastItem = canNextPage || !numberOfItems ? (page + 1) * pageSize : numberOfItems;
    return (
        <div className="pagination">
            <button className="btn" onClick={() => gotoPage(0)} disabled={page === 0}>
                <span className="glyphicon glyphicon-step-backward" />
            </button>
            <button className="btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
                <span className="glyphicon glyphicon-backward" />
            </button>
            <div className="paging-status">
                {initialItem} to {lastItem}{" "}
                {hasLastPage ? `of ${numberOfItems ?? (numberOfPages ?? 1) * pageSize}` : ""}
            </div>
            <button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="glyphicon glyphicon-forward" />
            </button>
            {hasLastPage && (
                <button className="btn" onClick={() => gotoPage(lastPage)} disabled={page === lastPage}>
                    <span className="glyphicon glyphicon-step-forward" />
                </button>
            )}
        </div>
    );
}

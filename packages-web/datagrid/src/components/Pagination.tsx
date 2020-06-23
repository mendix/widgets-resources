import { createElement, ReactElement } from "react";

export interface PaginationProps {
    gotoPage: (page: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    page: number;
    numberOfPages?: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
}

export function Pagination({
    gotoPage,
    previousPage,
    page,
    nextPage,
    numberOfPages,
    canNextPage,
    canPreviousPage
}: PaginationProps): ReactElement {
    const lastPage = (numberOfPages ?? 0) - 1;
    const hasLastPage = lastPage > -1;
    return (
        <div className="pagination">
            <button className="btn" onClick={() => gotoPage(0)} disabled={page === 0}>
                <span className="glyphicon glyphicon-step-backward" />
            </button>
            <button className="btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
                <span className="glyphicon glyphicon-backward" />
            </button>
            <div className="paging-status">
                Page {page + 1} {hasLastPage ? `of ${numberOfPages}` : ""}
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

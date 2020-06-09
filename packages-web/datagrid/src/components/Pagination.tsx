import { createElement, ReactElement, Dispatch, SetStateAction } from "react";

export interface PaginationProps {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    hasMoreItems: boolean;
}

export interface ClientSidePaginationProps {
    gotoPage: (page: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    page: number;
    pageOptions: number[];
    canPreviousPage: boolean;
    canNextPage: boolean;
}

export function Pagination({ page, setPage, hasMoreItems }: PaginationProps): ReactElement {
    return (
        <div className="pagination">
            <button className="btn" onClick={() => setPage(0)} disabled={page === 0}>
                <span className="glyphicon glyphicon-step-backward" />
            </button>
            <button className="btn" onClick={() => setPage(prev => prev - 1)} disabled={page === 0}>
                <span className="glyphicon glyphicon-backward" />
            </button>
            <div className="paging-status">Page {page + 1}</div>
            <button className="btn" onClick={() => setPage(prev => prev + 1)} disabled={!hasMoreItems}>
                <span className="glyphicon glyphicon-forward" />
            </button>
        </div>
    );
}

export function ClientSidePagination({
    gotoPage,
    previousPage,
    page,
    nextPage,
    pageOptions,
    canNextPage,
    canPreviousPage
}: ClientSidePaginationProps): ReactElement {
    const lastPage = pageOptions?.length - 1;
    return (
        <div className="pagination">
            <button className="btn" onClick={() => gotoPage(0)} disabled={page === 0}>
                <span className="glyphicon glyphicon-step-backward" />
            </button>
            <button className="btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
                <span className="glyphicon glyphicon-backward" />
            </button>
            <div className="paging-status">
                Page {page + 1} of {pageOptions.length}
            </div>
            <button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="glyphicon glyphicon-forward" />
            </button>
            <button className="btn" onClick={() => gotoPage(lastPage)} disabled={page === lastPage}>
                <span className="glyphicon glyphicon-step-forward" />
            </button>
        </div>
    );
}

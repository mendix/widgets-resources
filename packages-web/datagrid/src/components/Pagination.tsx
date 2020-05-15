import { createElement, ReactElement, Dispatch, SetStateAction } from "react";

interface PaginationProps {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    hasMoreItems: boolean;
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

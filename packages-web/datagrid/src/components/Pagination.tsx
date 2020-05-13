import { createElement, ReactElement } from "react";

interface PaginationProps {
    gotoPage: (page: number) => void;
    canPreviousPage: boolean;
    previousPage: () => void;
    canNextPage: boolean;
    nextPage: () => void;
    pageCount: number;
    pageIndex: number;
    pageOptions: number[];
}

export function Pagination({
    gotoPage,
    canPreviousPage,
    previousPage,
    canNextPage,
    nextPage,
    pageCount,
    pageIndex,
    pageOptions
}: PaginationProps): ReactElement {
    return (
        <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
            </button>{" "}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {">>"}
            </button>{" "}
            <span>
                Page{" "}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
            </span>
            <span>
                | Go to:{" "}
                <select
                    value={pageIndex}
                    onChange={e => {
                        gotoPage(Number(e.target.value));
                    }}
                >
                    {pageOptions.map((pageSize: any) => (
                        <option key={pageSize} value={pageSize}>
                            Page {pageSize + 1}
                        </option>
                    ))}
                </select>
            </span>
        </div>
    );
}

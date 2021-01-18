import { createElement, Dispatch, ReactElement, SetStateAction } from "react";

export interface PaginationProps {
    canNextPage: boolean;
    canPreviousPage: boolean;
    gotoPage: (page: number) => void;
    nextPage: () => void;
    numberOfItems?: number;
    page: number;
    pageSize: number;
    previousPage: () => void;
    setPaginationIndex?: Dispatch<SetStateAction<number>>;
}

export function Pagination(props: PaginationProps): ReactElement | null {
    const numberOfPages =
        props.numberOfItems !== undefined ? Math.ceil(props.numberOfItems / props.pageSize) : undefined;
    const lastPage = numberOfPages !== undefined ? numberOfPages - 1 : 0;
    const hasLastPage = numberOfPages !== undefined;
    const initialItem = props.page * props.pageSize + 1;
    const lastItem =
        props.canNextPage || !props.numberOfItems ? (props.page + 1) * props.pageSize : props.numberOfItems;
    const setPageIndex = (page: number): void => {
        if (props.setPaginationIndex) {
            props.setPaginationIndex(page);
        }
    };

    if (props.numberOfItems === 0) {
        return null;
    }

    return (
        <div className="pagination-bar">
            <button
                className="btn pagination-button"
                onClick={() => {
                    props.gotoPage(0);
                    setPageIndex(0);
                }}
                disabled={props.page === 0}
            >
                <span className="glyphicon glyphicon-step-backward" />
            </button>
            <button
                className="btn pagination-button"
                onClick={() => {
                    props.previousPage();
                    setPageIndex(props.page - 1);
                }}
                disabled={!props.canPreviousPage}
            >
                <span className="glyphicon glyphicon-backward" />
            </button>
            <div className="paging-status">
                {initialItem} to {lastItem}{" "}
                {hasLastPage ? `of ${props.numberOfItems ?? (numberOfPages ?? 1) * props.pageSize}` : ""}
            </div>
            <button
                className="btn pagination-button"
                onClick={() => {
                    props.nextPage();
                    setPageIndex(props.page + 1);
                }}
                disabled={!props.canNextPage}
            >
                <span className="glyphicon glyphicon-forward" />
            </button>
            {hasLastPage && (
                <button
                    className="btn pagination-button"
                    onClick={() => {
                        props.gotoPage(lastPage);
                        setPageIndex(lastPage);
                    }}
                    disabled={props.page === lastPage}
                >
                    <span className="glyphicon glyphicon-step-forward" />
                </button>
            )}
        </div>
    );
}

import { createElement, ReactElement, useMemo, Fragment } from "react";
import { DatagridContainerProps } from "../typings/DatagridProps";
import { useBlockLayout, usePagination, useResizeColumns, useSortBy, useTable } from "react-table";
import { Pagination } from "./components/Pagination";
import { ColumnSelector } from "./components/ColumnSelector";

export default function Datagrid(props: DatagridContainerProps): ReactElement {
    const columns = useMemo(
        () =>
            props.columns.map((column, index) => ({
                Header: column.header.value,
                accessor: `col_${index}`
            })) || [],
        [props.columns]
    ) as any;

    const data = useMemo(
        () =>
            props.datasource.items?.map(item =>
                props.columns
                    .map((column, index) => ({
                        [`col_${index}`]: column.attribute ? column.attribute(item).value : "",
                        [`content_col_${index}`]: column.content ? column.content(item) : null
                    }))
                    .reduce((acc, current) => ({ ...acc, ...current }), {})
            ) || [],
        [props.datasource, props.columns]
    );

    const defaultColumn = {
        Cell: ({
            value,
            data,
            row: { index },
            column: { id }
        }: {
            value: any;
            data: any[];
            row: { index: number };
            column: { id: string };
        }) => {
            const content = data[index][`content_${id}`];
            return content ? content : value;
        }
    };

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        getTableBodyProps,
        allColumns,
        page, // used instead of rows when we have pagination
        pageOptions,
        pageCount,
        state: { pageIndex },
        gotoPage,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            disableResizing: !props.columnsResizable,
            disableSortBy: !props.columnsSortable,
            initialState: { pageSize: props.pageSize }
        } as any,
        useSortBy,
        usePagination,
        useBlockLayout,
        useResizeColumns
    ) as any;

    const rowSelector = props.pagingEnabled ? page : rows;

    return (
        <Fragment>
            <div className="table" {...getTableProps()}>
                <div className="header">
                    <span>Header</span>
                    {props.columnsHidable && <ColumnSelector allColumns={allColumns} />}
                </div>
                <div className="thead" role="rowgroup">
                    {headerGroups.map((headerGroup: any, index: number) => (
                        <div className="tr" {...headerGroup.getHeaderGroupProps()} key={`row_${index}`}>
                            {headerGroup.headers.map((column: any, index: number) => (
                                <div
                                    className="th"
                                    {...column.getHeaderProps()}
                                    {...(props.columnsSortable ? column.getSortByToggleProps() : {})}
                                    key={`column_${index}`}
                                >
                                    {column.render("Header")}
                                    <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                                    {props.columnsResizable && (
                                        <div
                                            {...column.getResizerProps()}
                                            className={`resizer ${column.isResizing ? "isResizing" : ""}`}
                                        />
                                    )}
                                    {props.columnsHidable && (
                                        <input
                                            type="checkbox"
                                            onClick={() => column.toggleHidden()}
                                            checked={column.isVisible}
                                            {...column.getToggleHiddenProps()}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="tbody" {...getTableBodyProps()}>
                    {rowSelector.map((row: any, index: number) => {
                        prepareRow(row);
                        return (
                            <div className="tr" {...row.getRowProps()} key={`row_${index}`}>
                                {row.cells.map((cell: any, index: number) => (
                                    <div className="td" {...cell.getCellProps()} key={`column_${index}`}>
                                        {cell.render("Cell")}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
                <div className="footer">
                    {props.pagingEnabled && (
                        <Pagination
                            gotoPage={gotoPage}
                            canPreviousPage={canPreviousPage}
                            previousPage={previousPage}
                            canNextPage={canNextPage}
                            nextPage={nextPage}
                            pageCount={pageCount}
                            pageIndex={pageIndex}
                            pageOptions={pageOptions}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
}

import { createElement, CSSProperties, ReactElement, ReactNode, useMemo, useState } from "react";
import { ColumnSelector } from "./ColumnSelector";
import { Pagination } from "./Pagination";
import { Header } from "./Header";
import { InfiniteBody } from "./InfiniteBody";
import {
    ColumnInterface,
    ColumnWithStrictAccessor,
    FilterValue,
    IdType,
    Row,
    useColumnOrder,
    useFilters,
    useFlexLayout,
    usePagination,
    useResizeColumns,
    useSortBy,
    useTable
} from "react-table";
import { ColumnsPreviewType, ColumnsType } from "../../typings/DatagridProps";

export type TableColumn = Omit<ColumnsType | ColumnsPreviewType, "content" | "attribute">;

export interface TableProps<T> {
    className: string;
    data: T[];
    columns: TableColumn[];
    headerWidgets?: ReactNode;
    footerWidgets?: ReactNode;
    columnsFilterable: boolean;
    columnsSortable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
    numberOfItems?: number;
    paging: boolean;
    page: number;
    pageSize: number;
    pagingPosition: string;
    setPage?: (computePage: (prevPage: number) => number) => void;
    styles?: CSSProperties;
    hasMoreItems: boolean;
    cellRenderer: (renderWrapper: (children: ReactNode) => ReactElement, value: T, columnIndex: number) => ReactElement;
    valueForFilterSort: (value: T, columnIndex: number) => string | undefined;
    filterRenderer: (renderWrapper: (children: ReactNode) => ReactElement, columnIndex: number) => ReactElement;
}

export function Table<T>(props: TableProps<T>): ReactElement {
    const isSortingOrFiltering = props.columnsFilterable || props.columnsSortable;
    const isInfinite = !props.paging && !isSortingOrFiltering;
    const [dragOver, setDragOver] = useState("");
    const [columnSelectorWidth, setColumnSelectorWidth] = useState(0);

    const filterTypes = useMemo(
        () => ({
            text: (rows: Array<Row<object>>, id: IdType<object>, filterValue: FilterValue) => {
                return rows.filter(row => {
                    const value = props.valueForFilterSort(row.values[id], Number(id));
                    return value !== undefined
                        ? value.toLowerCase().startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            }
        }),
        [props.columns]
    );
    const tableColumns: Array<ColumnWithStrictAccessor<{ item: T }>> = useMemo(
        () =>
            props.columns.map((column, index) => ({
                id: index.toString(),
                accessor: "item",
                Header: typeof column.header === "object" ? column.header.value : column.header,
                filter: "text",
                hidden: column.hidable === "hidden",
                canHide: column.hidable !== "no",
                canDrag: column.draggable,
                customFilter:
                    column.filterable === "custom"
                        ? props.filterRenderer((children: ReactNode) => <div className="filter">{children}</div>, index)
                        : null,
                disableSortBy: !column.sortable,
                disableResizing: !column.resizable,
                disableFilters: column.filterable === "no",
                sortType: (rowA: Row<{ item: T }>, rowB: Row<{ item: T }>, columnId: IdType<object>): number => {
                    const valueA = props.valueForFilterSort(rowA.values[columnId], Number(columnId)) || "";
                    const valueB = props.valueForFilterSort(rowB.values[columnId], Number(columnId)) || "";
                    // Values should always be sorted in ASC mode https://github.com/tannerlinsley/react-table/pull/2504
                    return valueA.localeCompare(valueB);
                },
                Cell: ({ cell, value }) =>
                    props.cellRenderer(
                        (children: ReactNode) => (
                            <div
                                {...cell.getCellProps()}
                                {...(!props.columnsResizable ? { style: { flex: "1 1 0px" } } : {})}
                                className="td"
                            >
                                {children}
                            </div>
                        ),
                        value,
                        index
                    )
            })),
        [props.columns]
    );

    const defaultColumn: ColumnInterface<{ item: T }> = useMemo(
        () => ({
            Filter: ({ column: { filterValue, setFilter } }): ReactElement => (
                <div className="filter">
                    <input
                        className="form-control"
                        value={filterValue || ""}
                        onChange={e => {
                            setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                        }}
                    />
                </div>
            ),
            ...(props.columnsResizable
                ? {
                      width: 150, // width is used for both the flex-basis and flex-grow
                      maxWidth: 200, // maxWidth is only used as a limit for resizing
                      minWidth: 15 // minWidth is only used as a limit for resizing
                  }
                : {})
        }),
        [props.columns]
    );

    const {
        getTableProps,
        headerGroups,
        rows,
        page: rowsPagination,
        prepareRow,
        getTableBodyProps,
        allColumns,
        setColumnOrder,
        visibleColumns,
        state: { pageIndex },
        gotoPage,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage
    } = useTable<{ item: T }>(
        {
            columns: tableColumns,
            data: useMemo(() => props.data.map(item => ({ item })), [props.data]),
            defaultColumn,
            filterTypes,
            disableResizing: !props.columnsResizable,
            disableSortBy: !props.columnsSortable,
            disableFilters: !props.columnsFilterable,
            initialState: { pageSize: props.pageSize },
            disableMultiSort: true
        },
        useFilters,
        useSortBy,
        usePagination,
        useColumnOrder,
        useFlexLayout,
        useResizeColumns
    );

    const pagination = props.paging ? (
        !isInfinite && !isSortingOrFiltering ? (
            <Pagination
                canNextPage={props.hasMoreItems}
                canPreviousPage={props.page !== 0}
                gotoPage={(page: number) => props.setPage && props.setPage(() => page)}
                nextPage={() => props.setPage && props.setPage(prev => prev + 1)}
                numberOfItems={props.numberOfItems}
                page={props.page}
                pageSize={props.pageSize}
                previousPage={() => props.setPage && props.setPage(prev => prev - 1)}
            />
        ) : (
            <Pagination
                canNextPage={canNextPage}
                canPreviousPage={canPreviousPage}
                gotoPage={gotoPage}
                nextPage={nextPage}
                numberOfItems={props.data.length}
                page={pageIndex}
                pageSize={props.pageSize}
                previousPage={previousPage}
            />
        )
    ) : null;

    return (
        <div className={props.className} style={props.styles}>
            <div {...getTableProps()} className="table">
                <div role="rowgroup" className="thead">
                    {props.headerWidgets}
                    {props.pagingPosition === "top" && pagination}
                    {headerGroups.map((headerGroup, index: number) => (
                        <div {...headerGroup.getHeaderGroupProps({})} key={`headers_row_${index}`} className="tr">
                            {headerGroup.headers.map((column, index) => (
                                <Header
                                    column={column}
                                    key={`headers_column_${index}`}
                                    draggable={props.columnsDraggable}
                                    dragOver={dragOver}
                                    filterable={props.columnsFilterable}
                                    resizable={props.columnsResizable}
                                    setColumnOrder={setColumnOrder}
                                    setDragOver={setDragOver}
                                    sortable={props.columnsSortable}
                                    visibleColumns={visibleColumns}
                                />
                            ))}
                            {props.columnsHidable && (
                                <ColumnSelector
                                    allColumns={allColumns}
                                    width={columnSelectorWidth}
                                    setWidth={setColumnSelectorWidth}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <InfiniteBody
                    isInfinite={isInfinite}
                    hasMoreItems={props.hasMoreItems}
                    setPage={props.setPage}
                    {...getTableBodyProps()}
                >
                    {(isSortingOrFiltering && props.paging ? rowsPagination : rows).map((row, index) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} key={`row_${index}`} className="tr">
                                {row.cells.map(cell => cell.render("Cell"))}
                                {props.columnsHidable && (
                                    <div className="td column-selector" style={{ width: columnSelectorWidth }} />
                                )}
                            </div>
                        );
                    })}
                </InfiniteBody>
                <div className="tfoot">
                    {props.pagingPosition === "bottom" && pagination}
                    {props.footerWidgets}
                </div>
            </div>
        </div>
    );
}

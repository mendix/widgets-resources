import { createElement, Dispatch, ReactElement, ReactNode, SetStateAction, useMemo } from "react";
import { ObjectItem } from "mendix";
import { ColumnSelector } from "./ColumnSelector";
import { ClientSidePagination, Pagination } from "./Pagination";
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

export interface TableProps {
    className: string;
    data: ObjectItem[];
    columns: Array<ColumnsType | ColumnsPreviewType>;
    headerWidgets?: ReactNode;
    footerWidgets?: ReactNode;
    columnsFilterable: boolean;
    columnsSortable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
    paging: boolean;
    page: number;
    pageSize: number;
    pagingPosition: string;
    setPage?: Dispatch<SetStateAction<number>>;
    hasMoreItems: boolean;
}

interface TableRowData {
    item: ObjectItem;
}

export function Table({
    // todo: remove decomposition
    className,
    columns,
    data,
    headerWidgets,
    footerWidgets,
    columnsFilterable,
    columnsSortable,
    columnsResizable,
    columnsDraggable,
    columnsHidable,
    paging,
    pageSize,
    pagingPosition,
    hasMoreItems,
    page,
    setPage
}: TableProps): ReactElement {
    const isSortingOrFiltering = columnsFilterable || columnsSortable;
    const isInfinite = !paging && !isSortingOrFiltering;

    const filterTypes = {
        text: (rows: Array<Row<object>>, id: IdType<object>, filterValue: FilterValue) => {
            return rows.filter(row => {
                const rowValue = row.values[id];
                return rowValue !== undefined
                    ? String(rowValue)
                          .toLowerCase()
                          .startsWith(String(filterValue).toLowerCase())
                    : true;
            });
        }
    };
    const tableColumns: Array<ColumnWithStrictAccessor<TableRowData>> = useMemo(
        () =>
            columns.map((column, index) => ({
                id: index.toString(),
                accessor: "item",
                Header: typeof column.header === "object" ? column.header.value : column.header,
                filter: "text",
                isVisible: column.hidable !== "hidden",
                canHide: column.hidable !== "no",
                canDrag: column.draggable,
                disableSortBy: !column.sortable,
                disableResizing: !column.resizable,
                disableFilters: !column.filterable,
                Cell: ({ value }) => {
                    if (column.hasWidgets && column.content) {
                        return "renderer" in column.content ? (
                            <column.content.renderer>
                                <div />
                                {/* TODO: Not just a div */}
                            </column.content.renderer>
                        ) : (
                            <div>{column.content(value)}</div>
                        );
                    }
                    return column.attribute instanceof Function
                        ? column.attribute(value).displayValue
                        : column.attribute;
                }
            })),
        [columns]
    );

    const defaultColumn: ColumnInterface<TableRowData> = useMemo(
        () => ({
            Filter: ({ column: { filterValue, setFilter, filter } }): ReactElement => (
                <input
                    className="form-control"
                    value={filterValue || ""}
                    onChange={e => {
                        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                    }}
                    placeholder={`Search ${filter ? filter : ""}...`}
                />
            ),
            ...(columnsResizable
                ? {
                      width: 150, // width is used for both the flex-basis and flex-grow
                      maxWidth: 200, // maxWidth is only used as a limit for resizing
                      minWidth: 15 // minWidth is only used as a limit for resizing
                  }
                : {})
        }),
        [columns]
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
        pageOptions,
        state: { pageIndex },
        gotoPage,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage
    } = useTable<TableRowData>(
        {
            columns: tableColumns,
            data: useMemo(() => data.map(item => ({ item })), [data]),
            defaultColumn,
            filterTypes,
            disableResizing: !columnsResizable,
            disableSortBy: !columnsSortable,
            disableFilters: !columnsFilterable,
            initialState: { pageSize },
            disableMultiSort: true
        },
        useFilters,
        useSortBy,
        usePagination, // Used for client side pagination
        useColumnOrder,
        useFlexLayout,
        useResizeColumns
    );

    return (
        <div className={className}>
            <div className="thead">
                {headerWidgets}
                {columnsHidable && <ColumnSelector allColumns={allColumns} />}
            </div>
            <div {...getTableProps()} className="table">
                <div role="rowgroup" className="thead">
                    {!isInfinite && !isSortingOrFiltering && paging && pagingPosition === "top" && setPage && (
                        <div className="tr">
                            <div className="td">
                                <Pagination page={page} setPage={setPage} hasMoreItems={hasMoreItems} />
                            </div>
                        </div>
                    )}
                    {isSortingOrFiltering && paging && pagingPosition === "top" && (
                        <div className="tr">
                            <div className="td">
                                <ClientSidePagination
                                    canNextPage={canNextPage}
                                    canPreviousPage={canPreviousPage}
                                    gotoPage={gotoPage}
                                    nextPage={nextPage}
                                    page={pageIndex}
                                    pageOptions={pageOptions}
                                    previousPage={previousPage}
                                />
                            </div>
                        </div>
                    )}
                    {headerGroups.map((headerGroup, index: number) => (
                        <div {...headerGroup.getHeaderGroupProps({})} key={`headers_row_${index}`} className="tr">
                            {headerGroup.headers.map((column, index) => (
                                <Header
                                    column={column}
                                    key={`headers_column_${index}`}
                                    sortable={columnsSortable}
                                    resizable={columnsResizable}
                                    filterable={columnsFilterable}
                                    draggable={columnsDraggable}
                                    visibleColumns={visibleColumns}
                                    setColumnOrder={setColumnOrder}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <InfiniteBody
                    isInfinite={isInfinite}
                    hasMoreItems={hasMoreItems}
                    setPage={setPage}
                    {...getTableBodyProps()}
                >
                    {(isSortingOrFiltering && paging ? rowsPagination : rows).map((row, index) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} key={`row_${index}`} className="tr">
                                {row.cells.map((cell, index) => (
                                    <div
                                        {...cell.getCellProps()}
                                        {...(!columnsResizable ? { style: { flex: "1 1 0px" } } : {})}
                                        key={`column_${index}`}
                                        className="td"
                                    >
                                        {cell.render("Cell")}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </InfiniteBody>
                <div className="tfoot">
                    {!isInfinite && !isSortingOrFiltering && paging && pagingPosition === "bottom" && setPage && (
                        <div className="tr">
                            <div className="td">
                                <Pagination page={page} setPage={setPage} hasMoreItems={hasMoreItems} />
                            </div>
                        </div>
                    )}
                    {isSortingOrFiltering && paging && pagingPosition === "bottom" && (
                        <div className="tr">
                            <div className="td">
                                <ClientSidePagination
                                    canNextPage={canNextPage}
                                    canPreviousPage={canPreviousPage}
                                    gotoPage={gotoPage}
                                    nextPage={nextPage}
                                    page={pageIndex}
                                    pageOptions={pageOptions}
                                    previousPage={previousPage}
                                />
                            </div>
                        </div>
                    )}
                    {footerWidgets}
                </div>
            </div>
        </div>
    );
}

import { createElement, CSSProperties, ReactElement, ReactNode, useMemo } from "react";
import { ObjectItem } from "mendix";
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
    numberOfPages?: number;
    paging: boolean;
    page: number;
    pageSize: number;
    pagingPosition: string;
    setPage?: (computePage: (prevPage: number) => number) => void;
    styles?: CSSProperties;
    hasMoreItems: boolean;
}

interface TableRowData {
    item: ObjectItem;
}

export function Table(props: TableProps): ReactElement {
    const isSortingOrFiltering = props.columnsFilterable || props.columnsSortable;
    const isInfinite = !props.paging && !isSortingOrFiltering;

    const filterTypes = useMemo(
        () => ({
            text: (rows: Array<Row<object>>, id: IdType<object>, filterValue: FilterValue) => {
                return rows.filter(row => {
                    const objectItem = row.values[id] as ObjectItem;
                    const column = props.columns[Number(id)];
                    const value =
                        column.attribute instanceof Function ? column.attribute(objectItem).displayValue : column;
                    return value !== undefined
                        ? String(value)
                              .toLowerCase()
                              .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            }
        }),
        [props.columns]
    );
    const tableColumns: Array<ColumnWithStrictAccessor<TableRowData>> = useMemo(
        () =>
            props.columns.map((column, index) => ({
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
        [props.columns]
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
                page={props.page}
                numberOfPages={props.numberOfPages}
                previousPage={() => props.setPage && props.setPage(prev => prev - 1)}
            />
        ) : (
            <Pagination
                canNextPage={canNextPage}
                canPreviousPage={canPreviousPage}
                gotoPage={gotoPage}
                nextPage={nextPage}
                page={pageIndex}
                numberOfPages={pageOptions.length}
                previousPage={previousPage}
            />
        )
    ) : null;

    return (
        <div className={props.className} style={props.styles}>
            <div className="thead">
                {props.headerWidgets}
                {props.columnsHidable && <ColumnSelector allColumns={allColumns} />}
            </div>
            <div {...getTableProps()} className="table">
                <div role="rowgroup" className="thead">
                    {props.pagingPosition === "top" && pagination}
                    {headerGroups.map((headerGroup, index: number) => (
                        <div {...headerGroup.getHeaderGroupProps({})} key={`headers_row_${index}`} className="tr">
                            {headerGroup.headers.map((column, index) => (
                                <Header
                                    column={column}
                                    key={`headers_column_${index}`}
                                    sortable={props.columnsSortable}
                                    resizable={props.columnsResizable}
                                    filterable={props.columnsFilterable}
                                    draggable={props.columnsDraggable}
                                    visibleColumns={visibleColumns}
                                    setColumnOrder={setColumnOrder}
                                />
                            ))}
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
                                {row.cells.map((cell, index) => (
                                    <div
                                        {...cell.getCellProps()}
                                        {...(!props.columnsResizable ? { style: { flex: "1 1 0px" } } : {})}
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
                    {props.pagingPosition === "bottom" && pagination}
                    {props.footerWidgets}
                </div>
            </div>
        </div>
    );
}

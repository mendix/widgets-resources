import { createElement, CSSProperties, Fragment, ReactElement, ReactNode, useMemo, useState } from "react";
import { ColumnSelector } from "./ColumnSelector";
import { Pagination } from "./Pagination";
import { Header } from "./Header";
import { InfiniteBody } from "./InfiniteBody";
import {
    ColumnInterface,
    ColumnWithStrictAccessor,
    Filters,
    FilterValue,
    IdType,
    Row,
    SortingRule,
    useColumnOrder,
    useFilters,
    usePagination,
    useSortBy,
    useTable
} from "react-table";
import { ColumnsPreviewType, ColumnsType, FilterMethodEnum } from "../../typings/DatagridProps";

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
    valueForFilter: (value: T, columnIndex: number) => string | undefined;
    valueForSort: (value: T, columnIndex: number) => string | BigJs.Big | boolean | Date | undefined;
    filterRenderer: (renderWrapper: (children: ReactNode) => ReactElement, columnIndex: number) => ReactElement;
    filterMethod: FilterMethodEnum;
}

export function Table<T>(props: TableProps<T>): ReactElement {
    const isSortingOrFiltering = props.columnsFilterable || props.columnsSortable;
    const isInfinite = !props.paging && !isSortingOrFiltering;
    const [dragOver, setDragOver] = useState("");
    const [columnOrder, setColumnOrder] = useState<Array<IdType<object>>>([]);
    const [hiddenColumns, setHiddenColumns] = useState<Array<IdType<object>>>(
        (props.columns
            .map((c, i) => (c.hidable === "hidden" ? i.toString() : undefined))
            .filter(Boolean) as string[]) ?? []
    );
    const [paginationIndex, setPaginationIndex] = useState<number>(0);
    const [sortBy, setSortBy] = useState<Array<SortingRule<object>>>([]);
    const [filters, setFilters] = useState<Filters<object>>([]);

    const filterTypes = useMemo(
        () => ({
            text: (rows: Array<Row<object>>, id: IdType<object>, filterValue: FilterValue) => {
                return rows.filter(row => {
                    const value = props.valueForFilter(row.values[id], Number(id));
                    if (!filterValue) {
                        return true;
                    }

                    if (!value) {
                        return false;
                    }

                    switch (props.filterMethod) {
                        case "contains":
                            return value.toLowerCase().includes(String(filterValue).toLowerCase());
                        case "endsWith":
                            return value.toLowerCase().endsWith(String(filterValue).toLowerCase());
                        case "startsWith":
                            return value.toLowerCase().startsWith(String(filterValue).toLowerCase());
                        default:
                            return false;
                    }
                });
            }
        }),
        [props.columns, props.filterMethod, props.valueForFilter]
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
                canResize: column.resizable,
                customFilter:
                    column.filterable === "custom"
                        ? props.filterRenderer((children: ReactNode) => <div className="filter">{children}</div>, index)
                        : null,
                disableSortBy: !column.sortable,
                disableResizing: !column.resizable,
                disableFilters: column.filterable === "no",
                sortType: (rowA: Row<{ item: T }>, rowB: Row<{ item: T }>, columnId: IdType<object>): number => {
                    const valueA = props.valueForSort(rowA.values[columnId], Number(columnId)) || "";
                    const valueB = props.valueForSort(rowB.values[columnId], Number(columnId)) || "";
                    // Values should always be sorted in ASC mode https://github.com/tannerlinsley/react-table/pull/2504
                    if (typeof valueA === "string" && typeof valueB === "string") {
                        return valueA.localeCompare(valueB);
                    } else if (typeof valueA === "boolean" && typeof valueB === "boolean") {
                        // True first
                        return valueA === valueB ? 0 : valueA ? -1 : 1;
                    } else if (valueA instanceof Date && valueB instanceof Date) {
                        return (valueA as Date).getTime() - (valueB as Date).getTime();
                    }
                    return Number(valueA) - Number(valueB);
                },
                Cell: ({ cell, value }) =>
                    props.cellRenderer(
                        (children: ReactNode) => (
                            <div {...cell.getCellProps()} className="td">
                                {children}
                            </div>
                        ),
                        value,
                        index
                    ),
                width: column.width,
                weight: column.size ?? 1
            })),
        [props.columns, props.cellRenderer, props.filterRenderer, props.valueForFilter, props.valueForSort]
    );

    const defaultColumn: ColumnInterface<{ item: T }> = useMemo(
        () => ({
            Filter: ({ column: { filterValue, setFilter, id } }): ReactElement => (
                <div className="filter">
                    <input
                        className="form-control"
                        value={filterValue || ""}
                        onChange={e => {
                            const value = e.target.value || undefined; // Set undefined to remove the filter entirely
                            setFilter(value);
                            setFilters(prev => {
                                if (value) {
                                    const previousFilter = prev.find(c => c.id === id);
                                    if (previousFilter) {
                                        previousFilter.value = value;
                                    } else {
                                        prev.push({ id, value });
                                    }
                                } else {
                                    prev.splice(
                                        prev.findIndex(c => c.id === id),
                                        1
                                    );
                                }
                                return [...prev];
                            });
                        }}
                    />
                </div>
            )
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
        setColumnOrder: setOrder,
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
            disableSortBy: !props.columnsSortable,
            disableFilters: !props.columnsFilterable,
            initialState: {
                pageSize: props.pageSize,
                columnOrder,
                hiddenColumns,
                pageIndex: paginationIndex,
                sortBy,
                filters
            },
            disableMultiSort: true,
            autoResetSortBy: false
        },
        useFilters,
        useSortBy,
        usePagination,
        useColumnOrder
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
                numberOfItems={rows.length}
                page={pageIndex}
                pageSize={props.pageSize}
                previousPage={previousPage}
                setPaginationIndex={setPaginationIndex}
            />
        )
    ) : null;

    const cssGridStyles = useMemo(() => {
        const columnSizes = visibleColumns
            .map(c => {
                switch (c.width) {
                    case "autoFit":
                        return "fit-content(100%)";
                    case "manual":
                        return `${c.weight}fr`;
                    default:
                        return "1fr";
                }
            })
            .join(" ");
        return {
            gridTemplateColumns: columnSizes + (props.columnsHidable ? " fit-content(50px)" : "")
        };
    }, [visibleColumns, props.columnsHidable]);

    return (
        <div className={props.className} style={props.styles}>
            <div {...getTableProps()} className="table">
                <div className="table-header">
                    {props.headerWidgets}
                    {props.pagingPosition === "top" && pagination}
                </div>
                <InfiniteBody
                    isInfinite={isInfinite}
                    hasMoreItems={props.hasMoreItems}
                    setPage={props.setPage}
                    style={cssGridStyles}
                    {...getTableBodyProps()}
                >
                    {headerGroups.map((headerGroup, index: number) => (
                        <Fragment key={`headers_row_${index}`}>
                            {headerGroup.headers.map((column, index) => (
                                <Header
                                    column={column}
                                    key={`headers_column_${index}`}
                                    draggable={props.columnsDraggable}
                                    dragOver={dragOver}
                                    filterable={props.columnsFilterable}
                                    resizable={props.columnsResizable}
                                    setColumnOrder={(newOrder: Array<IdType<object>>) => {
                                        setOrder(newOrder);
                                        setColumnOrder(newOrder);
                                    }}
                                    setDragOver={setDragOver}
                                    setSortBy={setSortBy}
                                    sortable={props.columnsSortable}
                                    visibleColumns={visibleColumns}
                                />
                            ))}
                            {props.columnsHidable && (
                                <ColumnSelector allColumns={allColumns} setHiddenColumns={setHiddenColumns} />
                            )}
                        </Fragment>
                    ))}
                    {(isSortingOrFiltering && props.paging ? rowsPagination : rows).map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                            <Fragment key={`row_${rowIndex}`}>
                                {row.cells.map((cell, cellIndex) => cell.render("Cell", { key: cellIndex }))}
                                {props.columnsHidable && <div className="td column-selector" />}
                            </Fragment>
                        );
                    })}
                </InfiniteBody>
                <div className="table-footer">
                    {props.pagingPosition === "bottom" && pagination}
                    {props.footerWidgets}
                </div>
            </div>
        </div>
    );
}

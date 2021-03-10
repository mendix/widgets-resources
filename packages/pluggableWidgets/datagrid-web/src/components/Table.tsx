import { createElement, CSSProperties, Fragment, ReactElement, ReactNode, useMemo, useState } from "react";
import { ColumnSelector } from "./ColumnSelector";
import { Pagination } from "./Pagination";
import { Header } from "./Header";
import { InfiniteBody } from "./InfiniteBody";
import {
    ColumnWithStrictAccessor,
    IdType,
    Row,
    SortingRule,
    useColumnOrder,
    useFilters,
    usePagination,
    useSortBy,
    useTable
} from "react-table";
import { ColumnsPreviewType, ColumnsType } from "../../typings/DatagridProps";
import classNames from "classnames";
import { EditableValue } from "mendix";
import { useSettings } from "../utils/settings";

export type TableColumn = Omit<
    ColumnsType | ColumnsPreviewType,
    "content" | "attribute" | "dynamicText" | "showContentAs"
>;

export interface TableProps<T> {
    cellRenderer: (
        renderWrapper: (children: ReactNode, className?: string, onClick?: () => void) => ReactElement,
        value: T,
        columnIndex: number
    ) => ReactElement;
    className: string;
    columns: TableColumn[];
    columnsFilterable: boolean;
    columnsSortable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
    data: T[];
    emptyPlaceholderRenderer?: (renderWrapper: (children: ReactNode) => ReactElement) => ReactElement;
    filterRenderer: (renderWrapper: (children: ReactNode) => ReactElement, columnIndex: number) => ReactElement;
    hasMoreItems: boolean;
    numberOfItems?: number;
    paging: boolean;
    page: number;
    pageSize: number;
    pagingPosition: string;
    preview?: boolean;
    onSettingsChange?: () => void;
    rowClass?: (value: T) => string;
    setPage?: (computePage: (prevPage: number) => number) => void;
    settings?: EditableValue<string>;
    styles?: CSSProperties;
    valueForSort: (value: T, columnIndex: number) => string | BigJs.Big | boolean | Date | undefined;
}

export interface ColumnWidth {
    [key: string]: number | undefined;
}

export function Table<T>(props: TableProps<T>): ReactElement {
    const isSortingOrFiltering = props.columnsFilterable || props.columnsSortable;
    const isInfinite = !props.paging && !isSortingOrFiltering;
    const [isDragging, setIsDragging] = useState(false);
    const [dragOver, setDragOver] = useState("");
    const [columnOrder, setColumnOrder] = useState<Array<IdType<object>>>([]);
    const [hiddenColumns, setHiddenColumns] = useState<Array<IdType<object>>>(
        (props.columns
            .map((c, i) => (c.hidable === "hidden" ? i.toString() : undefined))
            .filter(Boolean) as string[]) ?? []
    );
    const [paginationIndex, setPaginationIndex] = useState<number>(0);
    const [sortBy, setSortBy] = useState<Array<SortingRule<object>>>([]);
    const [columnsWidth, setColumnsWidth] = useState<ColumnWidth>(
        Object.fromEntries(props.columns.map((_c, index) => [index.toString(), undefined]))
    );

    useSettings(
        props.settings,
        props.onSettingsChange,
        props.columns,
        columnOrder,
        setColumnOrder,
        hiddenColumns,
        setHiddenColumns,
        sortBy,
        setSortBy,
        columnsWidth,
        setColumnsWidth
    );

    const tableColumns: Array<ColumnWithStrictAccessor<{ item: T }>> = useMemo(
        () =>
            props.columns.map((column, index) => ({
                id: index.toString(),
                accessor: "item",
                alignment: column.alignment,
                Header:
                    typeof column.header === "object"
                        ? column.header.value
                        : props.preview && (column.header?.trim().length ?? 0) > 0
                        ? column.header
                        : "[Empty caption]",
                hidden: column.hidable === "hidden",
                canHide: column.hidable !== "no",
                canDrag: column.draggable,
                canResize: column.resizable,
                customFilter: props.columnsFilterable
                    ? props.filterRenderer(
                          (children: ReactNode) => (
                              <div className="filter" style={{ pointerEvents: isDragging ? "none" : undefined }}>
                                  {children}
                              </div>
                          ),
                          index
                      )
                    : null,
                disableSortBy: !column.sortable,
                disableResizing: !column.resizable,
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
                Cell: ({ cell, value, rowIndex }) =>
                    props.cellRenderer(
                        (children, className, onClick) => {
                            return (
                                <div
                                    {...cell.getCellProps()}
                                    className={classNames("td", { "td-borders": rowIndex === 0 }, className, {
                                        clickable: !!onClick
                                    })}
                                    onClick={onClick}
                                    onKeyDown={
                                        onClick
                                            ? e => {
                                                  if (e.key === "Enter" || e.key === " ") {
                                                      e.preventDefault();
                                                      onClick();
                                                  }
                                              }
                                            : undefined
                                    }
                                    role={onClick ? "button" : undefined}
                                    tabIndex={onClick ? 0 : undefined}
                                >
                                    {children}
                                </div>
                            );
                        },
                        value,
                        index
                    ),
                width: column.width,
                weight: column.size ?? 1
            })),
        [
            props.columns,
            props.cellRenderer,
            props.filterRenderer,
            props.valueForSort,
            props.columnsFilterable,
            isDragging
        ]
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
            disableSortBy: !props.columnsSortable,
            initialState: {
                pageSize: props.pageSize,
                columnOrder,
                hiddenColumns,
                pageIndex: paginationIndex,
                sortBy
            },
            disableMultiSort: true,
            autoResetSortBy: false,
            useControlledState: state =>
                useMemo(
                    () => ({
                        ...state,
                        columnOrder,
                        hiddenColumns,
                        sortBy
                    }),
                    [state, columnOrder, hiddenColumns, sortBy]
                )
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
                const columnResizedSize = columnsWidth[c.id];
                if (columnResizedSize) {
                    return `${columnResizedSize}px`;
                }
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
    }, [columnsWidth, visibleColumns, props.columnsHidable]);

    return (
        <div className={props.className} style={props.styles}>
            <div {...getTableProps()} className="table">
                <div className="table-header">{props.pagingPosition === "top" && pagination}</div>
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
                                    className={`align-column-${column.alignment}`}
                                    column={column}
                                    key={`headers_column_${index}`}
                                    draggable={props.columnsDraggable}
                                    dragOver={dragOver}
                                    filterable={props.columnsFilterable}
                                    isDragging={isDragging}
                                    resizable={props.columnsResizable}
                                    setColumnOrder={(newOrder: Array<IdType<object>>) => {
                                        setOrder(newOrder);
                                        setColumnOrder(newOrder);
                                    }}
                                    setColumnWidth={(width: number) =>
                                        setColumnsWidth(prev => {
                                            prev[column.id] = width;
                                            return { ...prev };
                                        })
                                    }
                                    setDragOver={setDragOver}
                                    setIsDragging={setIsDragging}
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
                            <div
                                className={classNames("tr", props.rowClass?.(row.original.item))}
                                key={`row_${rowIndex}`}
                            >
                                {row.cells.map((cell, cellIndex) => cell.render("Cell", { key: cellIndex, rowIndex }))}
                                {props.columnsHidable && (
                                    <div
                                        className={classNames("td column-selector", { "td-borders": rowIndex === 0 })}
                                    />
                                )}
                            </div>
                        );
                    })}
                    {(props.data.length === 0 || props.preview) &&
                        props.emptyPlaceholderRenderer &&
                        props.emptyPlaceholderRenderer(children => (
                            <div
                                className={classNames("td", "td-borders")}
                                style={{
                                    gridColumn: `span ${props.columns.length + (props.columnsHidable ? 1 : 0)}`
                                }}
                            >
                                <div className="empty-placeholder">{children}</div>
                            </div>
                        ))}
                </InfiniteBody>
                <div className="table-footer">{props.pagingPosition === "bottom" && pagination}</div>
            </div>
        </div>
    );
}

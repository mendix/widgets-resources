import { createElement, Dispatch, ReactElement, ReactNode, SetStateAction, useEffect, useMemo } from "react";
import { ColumnSelector } from "./ColumnSelector";
import { ClientSidePagination, Pagination } from "./Pagination";
import {
    CellProperties,
    ExtendedColumnInstance,
    ExtendedTableInstance,
    FilterProperties
} from "../../typings/ReactTable";
import { Header } from "./Header";
import { InfiniteBody } from "./InfiniteBody";
import {
    FilterValue,
    IdType,
    Row,
    useColumnOrder,
    useFilters,
    useFlexLayout,
    usePagination,
    UsePaginationState,
    useResizeColumns,
    useSortBy,
    useTable
} from "react-table";
import { useColumns } from "../utils/hooks";

export interface TableProps {
    className: string;
    data: any;
    columnsProp: any;
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

export function Table({
    className,
    columnsProp,
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
    const isSortingOrFiltering = useMemo(() => columnsFilterable || columnsSortable, [
        columnsFilterable,
        columnsSortable
    ]);
    const isInfinite = useMemo(() => !paging && !isSortingOrFiltering, [paging, isSortingOrFiltering]);
    const [columns, columnsConfig] = useColumns(columnsProp);

    const ColumnFilter = ({ column: { filterValue, setFilter, filter } }: FilterProperties): ReactElement => {
        return (
            <input
                value={filterValue || ""}
                onChange={e => {
                    setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                }}
                placeholder={`Search ${filter ? filter : ""}...`}
            />
        );
    };

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
    const defaultColumn = useMemo(
        () => ({
            Cell: ({ value, data, row: { index }, column: { id } }: CellProperties) => {
                const content = data[index][`content_${id}`];
                return columnsConfig[id].hasWidgets ? content : value;
            },
            Filter: ColumnFilter,
            ...(columnsResizable
                ? {
                      width: 150, // width is used for both the flex-basis and flex-grow
                      maxWidth: 200, // maxWidth is only used as a limit for resizing
                      minWidth: 15 // minWidth is only used as a limit for resizing
                  }
                : {})
        }),
        [columnsConfig]
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
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            disableResizing: !columnsResizable,
            disableSortBy: !columnsSortable,
            disableFilters: !columnsFilterable,
            initialState: { pageSize }
        } as any,
        useFilters,
        useSortBy,
        usePagination, // Used for client side pagination
        useColumnOrder,
        useFlexLayout,
        useResizeColumns
    ) as ExtendedTableInstance & { state: UsePaginationState<any> };

    useEffect(() => {
        allColumns.forEach(h => {
            const columnConfig = columnsConfig[h.id];
            if (columnConfig.hidable === "hidden" && h.isVisible) {
                h.toggleHidden();
            }
        });
    }, [columnsConfig]);

    return (
        <div className={className}>
            <div className="header">
                {headerWidgets}
                {columnsHidable && <ColumnSelector allColumns={allColumns} columnsConfig={columnsConfig} />}
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
                            {headerGroup.headers.map((column: ExtendedColumnInstance, index: number) => (
                                <Header
                                    column={column}
                                    key={`headers_column_${index}`}
                                    sortable={columnsSortable}
                                    resizable={columnsResizable}
                                    filterable={columnsFilterable}
                                    draggable={columnsDraggable}
                                    visibleColumns={visibleColumns}
                                    columnsConfig={columnsConfig[column.id]}
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

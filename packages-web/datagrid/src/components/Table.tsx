import {
    ComponentType,
    createElement,
    CSSProperties,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    useMemo,
    useState
} from "react";
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
    cellRenderer: (Wrapper: ComponentType, value: T, columnIndex: number) => ReactElement;
    valueForFilter: (value: T, columnIndex: number) => string | undefined;
}

export function Table<T>(props: TableProps<T>): ReactElement {
    const isSortingOrFiltering = props.columnsFilterable || props.columnsSortable;
    const isInfinite = !props.paging && !isSortingOrFiltering;
    const [dragOver, setDragOver] = useState("");

    const filterTypes = useMemo(
        () => ({
            text: (rows: Array<Row<object>>, id: IdType<object>, filterValue: FilterValue) => {
                return rows.filter(row => {
                    const value = props.valueForFilter(row.values[id], Number(id));
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
                isVisible: column.hidable !== "hidden",
                canHide: column.hidable !== "no",
                canDrag: column.draggable,
                disableSortBy: !column.sortable,
                disableResizing: !column.resizable,
                disableFilters: !column.filterable,
                Cell: ({ cell, value }) =>
                    props.cellRenderer(
                        (nestedProps: PropsWithChildren<{}>) => (
                            <div
                                {...cell.getCellProps()}
                                {...(!props.columnsResizable ? { style: { flex: "1 1 0px" } } : {})}
                                className="td"
                            >
                                {nestedProps.children}
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
                numberOfPages={
                    props.numberOfItems !== undefined ? Math.ceil(props.numberOfItems / props.pageSize) : undefined
                }
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
                numberOfPages={pageOptions.length}
                page={pageIndex}
                pageSize={props.pageSize}
                previousPage={previousPage}
            />
        )
    ) : null;

    return (
        <div className={props.className} style={props.styles}>
            <div className="thead">{props.headerWidgets}</div>
            <div {...getTableProps()} className="table">
                <div role="rowgroup" className="thead">
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
                            {props.columnsHidable && <ColumnSelector allColumns={allColumns} />}
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
                                {props.columnsHidable && <div className="td column-selector" />}
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

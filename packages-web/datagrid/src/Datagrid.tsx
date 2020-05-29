import { createElement, ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { DatagridContainerProps } from "../typings/DatagridProps";
import {
    FilterValue,
    IdType,
    Row,
    TableHeaderProps,
    useColumnOrder,
    useFilters,
    useFlexLayout,
    useResizeColumns,
    useSortBy,
    useTable
} from "react-table";
import { Pagination } from "./components/Pagination";
import { ColumnSelector } from "./components/ColumnSelector";
import classNames from "classnames";
import { useColumns, useData, useDraggable } from "./utils/hooks";
import { CellProperties, ExtendedColumnInstance, ExtendedTableInstance, FilterProperties } from "../typings/ReactTable";

export default function Datagrid(props: DatagridContainerProps): ReactElement {
    const [page, setPage] = useState(0);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [bodySize, setBodySize] = useState(0);
    const isInfinite = useMemo(() => !props.pagingEnabled, [props.pagingEnabled]);
    const [columns, columnsConfig] = useColumns(props.columns);
    const [data] = useData(props.datasource, props.columns, props.pagingEnabled, props.pageSize, page, setHasMoreItems);

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

    const defaultColumn = useMemo(
        () => ({
            Cell: ({ value, data, row: { index }, column: { id } }: CellProperties) => {
                const content = data[index][`content_${id}`];
                return columnsConfig[id].hasWidgets ? content : value;
            },
            Filter: ColumnFilter,
            ...(props.columnsResizable
                ? {
                      width: 150, // width is used for both the flex-basis and flex-grow
                      maxWidth: 200, // maxWidth is only used as a limit for resizing
                      minWidth: 15 // minWidth is only used as a limit for resizing
                  }
                : {})
        }),
        [columnsConfig]
    );

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

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        getTableBodyProps,
        allColumns,
        setColumnOrder,
        visibleColumns
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            disableResizing: !props.columnsResizable,
            disableSortBy: !props.columnsSortable,
            disableFilters: !props.columnsFilterable,
            initialState: { pageSize: props.pageSize }
        } as any,
        useFilters,
        useSortBy,
        useColumnOrder,
        useFlexLayout,
        useResizeColumns
    ) as ExtendedTableInstance;

    const trackScrolling = useCallback(
        e => {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if (bottom) {
                if (hasMoreItems) {
                    setPage(prev => prev + 1);
                }
            }
        },
        [hasMoreItems]
    );

    function calculateBodyHeight(ref: HTMLTableSectionElement): void {
        if (ref && isInfinite && bodySize <= 0 && hasMoreItems) {
            setBodySize(ref.clientHeight - 30);
        }
    }

    /* DRAG EVENTS */
    const [dragOver, setDragOver] = useState("");
    const [draggableProps] = useDraggable(props.columnsDraggable, visibleColumns, setColumnOrder, setDragOver);
    /* END DRAG EVENTS */

    useEffect(() => {
        allColumns.forEach(h => {
            const columnConfig = columnsConfig[h.id];
            if (columnConfig.hidable === "hidden" && h.isVisible) {
                h.toggleHidden();
            }
        });
    }, [columnsConfig]);

    return (
        <div className={props.class}>
            <div className="header">
                {props.headerWidgets}
                {props.columnsHidable && <ColumnSelector allColumns={allColumns} columnsConfig={columnsConfig} />}
            </div>
            <div {...getTableProps()} className="table">
                <div role="rowgroup" className="thead">
                    {!isInfinite && props.pagingPosition === "top" && (
                        <div className="tr">
                            <div className="td">
                                <Pagination page={page} setPage={setPage} hasMoreItems={hasMoreItems} />
                            </div>
                        </div>
                    )}
                    {headerGroups.map((headerGroup, index: number) => (
                        <div {...headerGroup.getHeaderGroupProps({})} key={`headers_row_${index}`} className="tr">
                            {headerGroup.headers.map((column: ExtendedColumnInstance, index: number) => {
                                const sortClass = column.isSorted ? (column.isSortedDesc ? "desc" : "asc") : "";
                                const { onClick, ...rest } = column.getHeaderProps(
                                    props.columnsSortable && column.canSort ? column.getSortByToggleProps() : undefined
                                ) as TableHeaderProps & { onClick: () => void };
                                const { filterable, sortable, resizable, draggable } = columnsConfig[column.id];
                                return (
                                    <div
                                        className="th"
                                        {...rest}
                                        {...(!props.columnsResizable || !resizable
                                            ? { style: { flex: "1 1 0px" } }
                                            : {})}
                                        key={`headers_column_${index}`}
                                    >
                                        <div
                                            id={column.id}
                                            className={classNames(
                                                "column-container",
                                                draggable && column.id === dragOver ? "dragging" : ""
                                            )}
                                            {...(draggable ? draggableProps : {})}
                                        >
                                            <div
                                                id={column.id}
                                                className={classNames(
                                                    "column-header",
                                                    props.columnsSortable && sortable ? "clickable" : ""
                                                )}
                                                onClick={onClick}
                                            >
                                                {column.render("Header")}
                                            </div>
                                            {props.columnsFilterable && filterable && (
                                                <div className="filter">{column.render("Filter")}</div>
                                            )}
                                        </div>
                                        {sortClass && <div className={sortClass} />}
                                        {props.columnsResizable && resizable && (
                                            <div
                                                {...column.getResizerProps()}
                                                className={`column-resizer ${column.isResizing ? "isResizing" : ""}`}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div
                    {...getTableBodyProps()}
                    className={classNames("tbody", isInfinite ? "infinite-loading" : "")}
                    ref={calculateBodyHeight}
                    onScroll={isInfinite ? trackScrolling : undefined}
                    style={isInfinite && bodySize > 0 ? { maxHeight: bodySize } : {}}
                >
                    {rows.map((row, index) => {
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
                </div>
                <div className="tfoot">
                    {!isInfinite && props.pagingPosition === "bottom" && (
                        <div className="tr">
                            <div className="td">
                                <Pagination page={page} setPage={setPage} hasMoreItems={hasMoreItems} />
                            </div>
                        </div>
                    )}
                    <div className="tr">
                        <div className="td">
                            {isInfinite && <strong>Showing items till {(page + 1) * props.pageSize}</strong>}
                        </div>
                    </div>
                    {props.footerWidgets}
                </div>
            </div>
        </div>
    );
}

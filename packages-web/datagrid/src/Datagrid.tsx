import { createElement, ReactElement, useCallback, useMemo, useState } from "react";
import { DatagridContainerProps } from "../typings/DatagridProps";
import { TableHeaderProps, useColumnOrder, useFlexLayout, useResizeColumns, useSortBy, useTable } from "react-table";
import { Pagination } from "./components/Pagination";
import { ColumnSelector } from "./components/ColumnSelector";
import classNames from "classnames";
import { useColumns, useData, useDraggable } from "./utils/hooks";
import { ExtendedColumnInstance, ExtendedTableInstance } from "../typings/ReactTable";

export default function Datagrid(props: DatagridContainerProps): ReactElement {
    const [page, setPage] = useState(0);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [bodySize, setBodySize] = useState(0);
    const isInfinite = useMemo(() => !props.pagingEnabled, [props.pagingEnabled]);
    const [columns] = useColumns(props.columns);
    const [data] = useData(props.datasource, props.columns, props.pagingEnabled, props.pageSize, page, setHasMoreItems);

    // const defaultColumn = {
    //     Cell: ({ value, data, row: { index }, column: { id } }: CellProperties) => {
    //         const content = data[index][`content_${id}`];
    //         return Children.count(content.props.children) > 0 ? content : value;
    //     }
    // };

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
            disableResizing: !props.columnsResizable,
            disableSortBy: !props.columnsSortable,
            initialState: { pageSize: props.pageSize }
        } as any,
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

    return (
        <div className={props.class}>
            <div className="header">
                {props.headerWidgets}
                {props.columnsHidable && <ColumnSelector allColumns={allColumns} />}
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
                        <div {...headerGroup.getHeaderGroupProps()} key={`headers_row_${index}`} className="tr">
                            {headerGroup.headers.map((column: ExtendedColumnInstance, index: number) => {
                                const extraClass = column.isSorted ? (column.isSortedDesc ? "desc" : "asc") : "";
                                const { onClick, ...rest } = column.getHeaderProps(
                                    props.columnsSortable ? column.getSortByToggleProps() : undefined
                                ) as TableHeaderProps & { onClick: () => void };
                                return (
                                    <div
                                        className={classNames(
                                            "th",
                                            extraClass,
                                            props.columnsSortable ? "clickable" : "",
                                            column.id === dragOver ? "dragging" : ""
                                        )}
                                        {...rest}
                                        {...(!props.columnsResizable ? { style: { flex: "1 1 0px" } } : {})}
                                        key={`headers_column_${index}`}
                                    >
                                        <div
                                            id={column.id}
                                            className="column-header"
                                            onClick={onClick}
                                            {...draggableProps}
                                        >
                                            {column.render("Header")}
                                        </div>
                                        {props.columnsResizable && (
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

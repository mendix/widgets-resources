import { Children, createElement, ReactElement, useCallback, useMemo, useState } from "react";
import { DatagridContainerProps } from "../typings/DatagridProps";
import { TableInstance, useColumnOrder, useFlexLayout, useResizeColumns, useSortBy, useTable } from "react-table";
import { Pagination } from "./components/Pagination";
import { ColumnSelector } from "./components/ColumnSelector";
import classNames from "classnames";

export default function Datagrid(props: DatagridContainerProps): ReactElement {
    const [page, setPage] = useState(0);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [items, setItems] = useState<any[]>([]);
    const columns = useMemo(
        () =>
            props.columns.map((column, index) => ({
                Header: column.header.value,
                accessor: `col_${index}`
            })) || [],
        [props.columns]
    ) as any[];
    const [bodySize, setBodySize] = useState(0);
    const isInfinite = useMemo(() => !props.pagingEnabled, [props.pagingEnabled]);

    const datasourceData = useMemo(
        () =>
            props.datasource.items?.map(item =>
                props.columns
                    .map((column, index) => ({
                        [`col_${index}`]: column.attribute ? column.attribute(item).value : "",
                        [`content_col_${index}`]: column.content ? column.content(item) : null
                    }))
                    .reduce((acc, current) => ({ ...acc, ...current }), {})
            ) || [],
        [props.datasource]
    );

    const data = useMemo(() => {
        if (!props.pagingEnabled) {
            setItems(items => Array.from(new Set([...(items || []), ...datasourceData])));
        }
        props.datasource.setLimit(props.pageSize);
        props.datasource.setOffset(page * props.pageSize);
        setHasMoreItems(props.datasource.hasMoreItems || false);
        console.warn("Loading items from", page * props.pageSize);

        return props.pagingEnabled ? datasourceData : Array.from(new Set([...items, ...datasourceData]));
    }, [props.datasource, props.columns, props.pageSize, page, datasourceData]);

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
            return Children.count(content.props.children) > 0 ? content : value;
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
            disableResizing: !props.columnsResizable,
            disableSortBy: !props.columnsSortable,
            initialState: { pageSize: props.pageSize }
        } as any,
        useSortBy,
        useColumnOrder,
        useFlexLayout,
        useResizeColumns
    ) as TableInstance<object> & {
        setColumnOrder: (order: any[]) => void;
    };

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
    const handleDragStart = (e: any): void => {
        const { id } = e.target;
        e.dataTransfer.setData("colDestination", id);
    };

    const handleDragOver = (e: any): void => {
        e.preventDefault();
    };

    const handleDragEnter = (e: any): void => {
        const { id } = e.target;
        setDragOver(id);
    };

    const handleOnDrop = (e: any): void => {
        const { id: colOrigin } = e.target;
        const colDestination = e.dataTransfer.getData("colDestination");

        const colOriginIndex = visibleColumns.findIndex((col: any) => col.id === colOrigin);
        const colDestinationIndex = visibleColumns.findIndex((col: any) => col.id === colDestination);

        const newOrder = [...visibleColumns];
        newOrder[colOriginIndex] = colDestination;
        newOrder[colDestinationIndex] = colOrigin;
        setColumnOrder(newOrder);
        setDragOver("");
    };

    const draggableProps = props.columnsDraggable
        ? {
              draggable: true,
              onDragStart: handleDragStart,
              onDragOver: handleDragOver,
              onDrop: handleOnDrop,
              onDragEnter: handleDragEnter
          }
        : {};
    /* END DRAG EVENTS */

    return (
        <div className={props.class}>
            <div className="header">
                <span>Header</span>
                {props.columnsHidable && <ColumnSelector allColumns={allColumns} />}
            </div>
            <div {...getTableProps()} className="table">
                <div role="rowgroup" className="thead">
                    {headerGroups.map((headerGroup: any, index: number) => (
                        <div {...headerGroup.getHeaderGroupProps()} key={`headers_row_${index}`} className="tr">
                            {headerGroup.headers.map((column: any, index: number) => {
                                const extraClass = column.isSorted ? (column.isSortedDesc ? "desc" : "asc") : "";
                                const { onClick, ...rest } = column.getHeaderProps(
                                    props.columnsSortable ? column.getSortByToggleProps() : undefined
                                );
                                return (
                                    <div
                                        className={classNames(
                                            "th",
                                            extraClass,
                                            props.columnsSortable ? "clickable" : "",
                                            column.id === dragOver ? "dragging" : ""
                                        )}
                                        {...rest}
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
                    style={isInfinite && bodySize > 0 ? { maxHeight: bodySize } : { backgroundColor: "red" }}
                >
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} key={`row_${index}`} className="tr">
                                {row.cells.map((cell, index) => (
                                    <div {...cell.getCellProps()} key={`column_${index}`} className="td">
                                        {cell.render("Cell")}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
                <div className="tfoot">
                    <div className="tr">
                        <div className="td">
                            {!isInfinite && <Pagination page={page} setPage={setPage} hasMoreItems={hasMoreItems} />}
                            {isInfinite && <strong>Showing items till {(page + 1) * props.pageSize}</strong>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

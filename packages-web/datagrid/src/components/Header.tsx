import { createElement, ReactElement, useState } from "react";
import { ColumnInstance, TableHeaderProps } from "react-table";
import classNames from "classnames";
import { ExtendedColumnInstance } from "../../typings/ReactTable";
import { useDraggable } from "../utils/hooks";

export interface HeaderProps {
    column: ExtendedColumnInstance;
    sortable: boolean;
    resizable: boolean;
    filterable: boolean;
    draggable: boolean;
    visibleColumns: Array<ColumnInstance<object>>;
    columnsConfig: any;
    setColumnOrder: (order: any[]) => void;
}

export function Header({
    column,
    sortable,
    resizable,
    filterable,
    draggable,
    visibleColumns,
    columnsConfig,
    setColumnOrder
}: HeaderProps): ReactElement {
    /* DRAG EVENTS */
    const [dragOver, setDragOver] = useState("");
    const [draggableProps] = useDraggable(draggable, visibleColumns, setColumnOrder, setDragOver);
    /* END DRAG EVENTS */

    const { onClick, style, ...rest } = column.getHeaderProps(
        sortable && column.canSort ? column.getSortByToggleProps() : undefined
    ) as TableHeaderProps & { onClick: () => void };
    const {
        filterable: isColumnFilterable,
        sortable: isColumnSortable,
        resizable: isColumnResizable,
        draggable: isColumnDraggable
    } = columnsConfig;
    const sortClass =
        sortable && isColumnSortable ? (column.isSorted ? (column.isSortedDesc ? "desc" : "asc") : "sortable") : "";
    return (
        <div
            className="th"
            {...rest}
            style={{
                ...style,
                ...(!resizable ? { flex: "1 1 0px" } : {}),
                ...(!sortable || !isColumnSortable ? { cursor: "unset" } : {})
            }}
        >
            <div
                id={column.id}
                className={classNames(
                    "column-container",
                    isColumnDraggable && column.id === dragOver ? "dragging" : ""
                )}
                {...(isColumnDraggable ? draggableProps : {})}
            >
                <div
                    id={column.id}
                    className={classNames("column-header", sortable && isColumnSortable ? "clickable" : "")}
                    onClick={isColumnSortable ? onClick : undefined}
                >
                    {column.render("Header")}
                </div>
                {filterable && isColumnFilterable && <div className="filter">{column.render("Filter")}</div>}
            </div>
            {sortClass && <div className={sortClass} />}
            {resizable && isColumnResizable && (
                <div
                    {...column.getResizerProps()}
                    className={`column-resizer ${column.isResizing ? "isResizing" : ""}`}
                />
            )}
        </div>
    );
}

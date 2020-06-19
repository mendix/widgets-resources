import { createElement, Dispatch, ReactElement, SetStateAction, useState } from "react";
import { ColumnInstance, HeaderGroup, TableHeaderProps } from "react-table";
import classNames from "classnames";

export interface HeaderProps<D extends object> {
    column: HeaderGroup<D>;
    sortable: boolean;
    resizable: boolean;
    filterable: boolean;
    draggable: boolean;
    visibleColumns: Array<ColumnInstance<D>>;
    setColumnOrder: (order: any[]) => void;
}

export function Header<D extends object>({
    column,
    sortable,
    resizable,
    filterable,
    draggable,
    visibleColumns,
    setColumnOrder
}: HeaderProps<D>): ReactElement {
    const [dragOver, setDragOver] = useState("");
    const [draggableProps] = useDraggable(draggable, visibleColumns, setColumnOrder, setDragOver);

    const { onClick, style, ...rest } = column.getHeaderProps(
        sortable && column.canSort ? column.getSortByToggleProps() : undefined
    ) as TableHeaderProps & { onClick: () => void };

    const sortClass =
        sortable && column.canSort ? (column.isSorted ? (column.isSortedDesc ? "desc" : "asc") : "sortable") : "";
    return (
        <div
            className="th"
            {...rest}
            style={{
                ...style,
                ...(!resizable ? { flex: "1 1 0px" } : {}),
                ...(!sortable || !column.canSort ? { cursor: "unset" } : {})
            }}
        >
            <div
                id={column.id}
                className={classNames("column-container", column.canDrag && column.id === dragOver ? "dragging" : "")}
                {...(column.canDrag ? draggableProps : {})}
            >
                <div
                    id={column.id}
                    className={classNames("column-header", sortable && column.canSort ? "clickable" : "")}
                    onClick={column.canSort ? onClick : undefined}
                >
                    {column.render("Header")}
                </div>
                {filterable && column.canFilter && <div className="filter">{column.render("Filter")}</div>}
            </div>
            {sortClass && <div className={sortClass} />}
            {resizable && column.canResize && (
                <div
                    {...column.getResizerProps()}
                    className={`column-resizer ${column.isResizing ? "isResizing" : ""}`}
                />
            )}
        </div>
    );
}

function useDraggable<D extends object>(
    columnsDraggable: boolean,
    visibleColumns: Array<ColumnInstance<D>>,
    setColumnOrder: (order: any[]) => void,
    setDragOver: Dispatch<SetStateAction<string>>
) {
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
        setDragOver("");
        const { id: colOrigin } = e.target;
        const colDestination = e.dataTransfer.getData("colDestination");

        const colOriginIndex = visibleColumns.findIndex((col: any) => col.id === colOrigin);
        const colDestinationIndex = visibleColumns.findIndex((col: any) => col.id === colDestination);

        if (colOriginIndex !== colDestinationIndex) {
            const newOrder = [...visibleColumns];
            newOrder[colOriginIndex] = colDestination;
            newOrder[colDestinationIndex] = colOrigin;
            setColumnOrder(newOrder);
        }
    };

    return [
        columnsDraggable
            ? {
                  draggable: true,
                  onDragStart: handleDragStart,
                  onDragOver: handleDragOver,
                  onDrop: handleOnDrop,
                  onDragEnter: handleDragEnter
              }
            : {}
    ];
}

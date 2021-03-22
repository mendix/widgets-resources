import {
    createElement,
    Dispatch,
    ReactElement,
    SetStateAction,
    DragEvent,
    DragEventHandler,
    useCallback,
    MouseEvent,
    KeyboardEvent
} from "react";
import { ColumnInstance, HeaderGroup, IdType, SortingRule, TableHeaderProps } from "react-table";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltDown, faLongArrowAltUp, faArrowsAltV } from "@fortawesome/free-solid-svg-icons";
import { ColumnResizer } from "./ColumnResizer";

export interface HeaderProps<D extends object> {
    className?: string;
    column: HeaderGroup<D>;
    sortable: boolean;
    resizable: boolean;
    filterable: boolean;
    draggable: boolean;
    dragOver: string;
    hidable: boolean;
    isDragging?: boolean;
    preview?: boolean;
    setColumnOrder: (updater: Array<IdType<D>>) => void;
    setColumnWidth: (width: number) => void;
    setDragOver: Dispatch<SetStateAction<string>>;
    setIsDragging: Dispatch<SetStateAction<boolean>>;
    setSortBy: Dispatch<SetStateAction<Array<SortingRule<object>>>>;
    visibleColumns: Array<ColumnInstance<D>>;
}

export function Header<D extends object>(props: HeaderProps<D>): ReactElement {
    const canSort = props.sortable && props.column.canSort;
    const canDrag = props.draggable && (props.column.canDrag ?? false);
    const draggableProps = useDraggable(
        canDrag,
        props.visibleColumns,
        props.setColumnOrder,
        props.setDragOver,
        props.setIsDragging
    );

    const { onClick, style, ...rest } = props.column.getHeaderProps(
        canSort ? props.column.getSortByToggleProps() : undefined
    ) as TableHeaderProps & { onClick: (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void };

    const sortIcon = canSort
        ? props.column.isSorted
            ? props.column.isSortedDesc
                ? faLongArrowAltDown
                : faLongArrowAltUp
            : faArrowsAltV
        : undefined;

    const caption = props.column.render("Header") as string;

    return (
        <div
            className={classNames("th", {
                "hidden-column-preview": props.preview && props.hidable && props.column.hidden
            })}
            {...rest}
            style={{
                ...style,
                ...(!props.sortable || !props.column.canSort ? { cursor: "unset" } : undefined)
            }}
            title={caption}
        >
            <div
                id={props.column.id}
                className={classNames(
                    "column-container",
                    canDrag && props.column.id === props.dragOver ? "dragging" : ""
                )}
                {...draggableProps}
            >
                <div
                    id={props.column.id}
                    className={classNames("column-header", canSort ? "clickable" : "", props.className)}
                    style={{ pointerEvents: props.isDragging ? "none" : undefined }}
                    onClick={
                        canSort
                            ? e => {
                                  /**
                                   * Always analyse previous values to predict the next
                                   * 1 - !props.column.isSorted turns to asc
                                   * 2 - isSortedDesc === false && props.column.isSorted turns to desc
                                   * 3 - isSortedDesc === true && props.column.isSorted turns to unsorted
                                   * If multisort is allowed in the future this should be changed to append instead of just return a new array
                                   */
                                  if (!props.column.isSorted) {
                                      props.setSortBy([{ id: props.column.id, desc: false }]);
                                  } else if (props.column.isSorted && !props.column.isSortedDesc) {
                                      props.setSortBy([{ id: props.column.id, desc: true }]);
                                  } else {
                                      props.setSortBy([]);
                                  }
                                  onClick(e);
                              }
                            : undefined
                    }
                    onKeyDown={
                        canSort
                            ? e => {
                                  if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      onClick(e);
                                  }
                              }
                            : undefined
                    }
                    role={canSort ? "button" : undefined}
                    tabIndex={canSort ? 0 : undefined}
                >
                    <span>{caption.length > 0 ? caption : "\u00a0"}</span>
                    {sortIcon && <FontAwesomeIcon icon={sortIcon} />}
                </div>
                {props.filterable && props.column.customFilter ? props.column.customFilter : null}
            </div>
            {props.resizable && props.column.canResize && <ColumnResizer setColumnWidth={props.setColumnWidth} />}
        </div>
    );
}

function useDraggable<D extends object>(
    columnsDraggable: boolean,
    visibleColumns: Array<ColumnInstance<D>>,
    setColumnOrder: (updater: ((columnOrder: Array<IdType<D>>) => Array<IdType<D>>) | Array<IdType<D>>) => void,
    setDragOver: Dispatch<SetStateAction<string>>,
    setIsDragging: Dispatch<SetStateAction<boolean>>
): {
    draggable?: boolean;
    onDragStart?: DragEventHandler;
    onDragOver?: DragEventHandler;
    onDrop?: DragEventHandler;
    onDragEnter?: DragEventHandler;
    onDragEnd?: DragEventHandler;
} {
    const handleDragStart = useCallback((e: DragEvent<HTMLDivElement>): void => {
        setIsDragging(true);
        const { id } = e.target as HTMLDivElement;
        e.dataTransfer.setData("colDestination", id);
    }, []);

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
    }, []);

    const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>): void => {
        const { id } = e.target as HTMLDivElement;
        const colDestination = e.dataTransfer.getData("colDestination");
        if (id !== colDestination) {
            setDragOver(id);
        }
    }, []);

    const handleDragEnd = useCallback((): void => {
        setIsDragging(false);
        setDragOver("");
    }, []);

    const handleOnDrop = useCallback(
        (e: DragEvent<HTMLDivElement>): void => {
            handleDragEnd();
            const { id: colOrigin } = e.target as HTMLDivElement;
            const colDestination = e.dataTransfer.getData("colDestination");

            const toIndex = visibleColumns.findIndex((col: ColumnInstance<D>) => col.id === colOrigin);
            const fromIndex = visibleColumns.findIndex((col: ColumnInstance<D>) => col.id === colDestination);

            if (toIndex !== fromIndex) {
                const newOrder = [...visibleColumns.map(column => column.id)];
                newOrder.splice(fromIndex, 1);
                newOrder.splice(toIndex, 0, colDestination);
                setColumnOrder(newOrder);
            }
        },
        [visibleColumns]
    );

    return columnsDraggable
        ? {
              draggable: true,
              onDragStart: handleDragStart,
              onDragOver: handleDragOver,
              onDrop: handleOnDrop,
              onDragEnter: handleDragEnter,
              onDragEnd: handleDragEnd
          }
        : {};
}

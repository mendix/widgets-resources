import {
    createElement,
    Dispatch,
    ReactElement,
    SetStateAction,
    DragEvent,
    DragEventHandler,
    useCallback,
    MouseEvent
} from "react";
import { ColumnInstance, HeaderGroup, IdType, SortingRule, TableHeaderProps } from "react-table";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltDown, faLongArrowAltUp, faArrowsAltV } from "@fortawesome/free-solid-svg-icons";
import { ColumnSize } from "./Table";

export interface HeaderProps<D extends object> {
    column: HeaderGroup<D>;
    sortable: boolean;
    resizable: boolean;
    filterable: boolean;
    draggable: boolean;
    dragOver: string;
    visibleColumns: Array<ColumnInstance<D>>;
    setColumnOrder: (updater: Array<IdType<D>>) => void;
    setColumnSizes: Dispatch<SetStateAction<ColumnSize>>;
    setDragOver: Dispatch<SetStateAction<string>>;
    setSortBy: Dispatch<SetStateAction<Array<SortingRule<object>>>>;
    weight?: number;
}

export function Header<D extends object>(props: HeaderProps<D>): ReactElement {
    const canSort = props.sortable && props.column.canSort;
    const canDrag = props.draggable && (props.column.canDrag ?? false);
    const draggableProps = useDraggable(canDrag, props.visibleColumns, props.setColumnOrder, props.setDragOver);

    const { onClick, style, ...rest } = props.column.getHeaderProps(
        canSort ? props.column.getSortByToggleProps() : undefined
    ) as TableHeaderProps & { onClick: (e: MouseEvent<HTMLDivElement>) => void };

    const sortIcon = canSort
        ? props.column.isSorted
            ? props.column.isSortedDesc
                ? faLongArrowAltDown
                : faLongArrowAltUp
            : faArrowsAltV
        : undefined;

    const weight = props.weight ?? 1;

    return (
        <div
            ref={ref => {
                if (
                    (!props.resizable || !props.column.canResize) &&
                    (weight === 0 || weight <= 0) &&
                    ref &&
                    ref.clientWidth
                ) {
                    props.setColumnSizes((prev: ColumnSize) => {
                        const id = props.column.id as string;
                        if (prev[id] !== ref.clientWidth) {
                            prev[id] = ref.clientWidth;
                            return { ...prev };
                        }
                        return prev;
                    });
                }
            }}
            className="th"
            {...rest}
            style={{
                ...style,
                ...(!props.resizable ? { flex: `${props.weight == null ? 1 : props.weight} 1 auto` } : {}),
                ...(!props.sortable || !props.column.canSort ? { cursor: "unset" } : {}),
                ...(!props.resizable && props.weight === 0 ? { width: "unset" } : {})
            }}
            title={props.column.render("Header") as string}
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
                    className={classNames("column-header", canSort ? "clickable" : "")}
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
                >
                    {props.column.render("Header")}
                    {sortIcon && <FontAwesomeIcon icon={sortIcon} />}
                </div>
                {props.filterable &&
                    props.column.canFilter &&
                    (props.column.customFilter ? props.column.customFilter : props.column.render("Filter"))}
            </div>
            {props.resizable && props.column.canResize && (
                <div
                    {...props.column.getResizerProps()}
                    className={`column-resizer ${props.column.isResizing ? "isResizing" : ""}`}
                />
            )}
        </div>
    );
}

function useDraggable<D extends object>(
    columnsDraggable: boolean,
    visibleColumns: Array<ColumnInstance<D>>,
    setColumnOrder: (updater: ((columnOrder: Array<IdType<D>>) => Array<IdType<D>>) | Array<IdType<D>>) => void,
    setDragOver: Dispatch<SetStateAction<string>>
): {
    draggable?: boolean;
    onDragStart?: DragEventHandler;
    onDragOver?: DragEventHandler;
    onDrop?: DragEventHandler;
    onDragEnter?: DragEventHandler;
} {
    const handleDragStart = useCallback((e: DragEvent<HTMLDivElement>): void => {
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

    const handleOnDrop = useCallback(
        (e: DragEvent<HTMLDivElement>): void => {
            setDragOver("");
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
              onDragEnter: handleDragEnter
          }
        : {};
}

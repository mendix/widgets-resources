import {
    createElement,
    Dispatch,
    ReactElement,
    SetStateAction,
    DragEvent,
    DragEventHandler,
    KeyboardEvent,
    useCallback,
    HTMLAttributes
} from "react";
import classNames from "classnames";
import { FaLongArrowAltDown } from "./icons/FaLongArrowAltDown";
import { FaLongArrowAltUp } from "./icons/FaLongArrowAltUp";
import { FaArrowsAltV } from "./icons/FaArrowsAltV";
import { ColumnProperty } from "./Table";
import { ColumnResizerProps } from "./ColumnResizer";
import { SortingRule } from "../utils/settings";

export interface HeaderProps {
    className?: string;
    column: ColumnProperty;
    sortable: boolean;
    resizable: boolean;
    filterable: boolean;
    draggable: boolean;
    dragOver: string;
    hidable: boolean;
    isDragging?: boolean;
    preview?: boolean;
    resizer: ReactElement<ColumnResizerProps>;
    setColumnOrder: (updater: string[]) => void;
    setDragOver: Dispatch<SetStateAction<string>>;
    setIsDragging: Dispatch<SetStateAction<boolean>>;
    setSortBy: Dispatch<SetStateAction<SortingRule[]>>;
    sortBy: SortingRule[];
    visibleColumns: ColumnProperty[];
}

export function Header(props: HeaderProps): ReactElement {
    const canSort = props.sortable && props.column.canSort;
    const canDrag = props.draggable && (props.column.canDrag ?? false);
    const draggableProps = useDraggable(
        canDrag,
        props.visibleColumns,
        props.setColumnOrder,
        props.setDragOver,
        props.setIsDragging
    );

    const [sortProperties] = props.sortBy;
    const isSorted = sortProperties && sortProperties.id === props.column.id;
    const isSortedDesc = isSorted && sortProperties.desc;

    const sortIcon = canSort ? (
        isSorted ? (
            isSortedDesc ? (
                <FaLongArrowAltDown />
            ) : (
                <FaLongArrowAltUp />
            )
        ) : (
            <FaArrowsAltV />
        )
    ) : null;

    const caption = props.column.header.trim();

    const onSortBy = (): void => {
        /**
         * Always analyse previous values to predict the next
         * 1 - !isSorted turns to asc
         * 2 - isSortedDesc === false && isSorted turns to desc
         * 3 - isSortedDesc === true && isSorted turns to unsorted
         * If multisort is allowed in the future this should be changed to append instead of just return a new array
         */
        if (!isSorted) {
            props.setSortBy([{ id: props.column.id, desc: false }]);
        } else if (isSorted && !isSortedDesc) {
            props.setSortBy([{ id: props.column.id, desc: true }]);
        } else {
            props.setSortBy([]);
        }
    };

    const sortProps: HTMLAttributes<HTMLDivElement> = {
        onClick: onSortBy,
        onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSortBy();
            }
        },
        role: "button",
        tabIndex: 0
    };

    return (
        <div
            aria-label={caption}
            aria-sort={canSort ? (isSorted ? (isSortedDesc ? "descending" : "ascending") : "none") : undefined}
            className={classNames("th", {
                "hidden-column-preview": props.preview && props.hidable && props.column.hidden
            })}
            role="columnheader"
            style={!props.sortable || !props.column.canSort ? { cursor: "unset" } : undefined}
            title={caption}
        >
            <div
                className={classNames(
                    "column-container",
                    canDrag && props.column.id === props.dragOver ? "dragging" : ""
                )}
                id={props.column.id}
                {...draggableProps}
            >
                <div
                    className={classNames("column-header", canSort ? "clickable" : "", props.className)}
                    id={props.column.id}
                    style={{ pointerEvents: props.isDragging ? "none" : undefined }}
                    {...(canSort ? sortProps : undefined)}
                >
                    <span>{caption.length > 0 ? caption : "\u00a0"}</span>
                    {sortIcon}
                </div>
                {props.filterable && props.column.customFilter ? props.column.customFilter : null}
            </div>
            {props.resizable && props.column.canResize && props.resizer}
        </div>
    );
}

function useDraggable(
    columnsDraggable: boolean,
    visibleColumns: ColumnProperty[],
    setColumnOrder: (updater: ((columnOrder: string[]) => string[]) | string[]) => void,
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
    const handleDragStart = useCallback(
        (e: DragEvent<HTMLDivElement>): void => {
            setIsDragging(true);
            const { id } = e.target as HTMLDivElement;
            e.dataTransfer.setData("colDestination", id);
        },
        [setIsDragging]
    );

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
    }, []);

    const handleDragEnter = useCallback(
        (e: DragEvent<HTMLDivElement>): void => {
            const { id } = e.target as HTMLDivElement;
            const colDestination = e.dataTransfer.getData("colDestination");
            if (id !== colDestination) {
                setDragOver(id);
            }
        },
        [setDragOver]
    );

    const handleDragEnd = useCallback((): void => {
        setIsDragging(false);
        setDragOver("");
    }, [setDragOver, setIsDragging]);

    const handleOnDrop = useCallback(
        (e: DragEvent<HTMLDivElement>): void => {
            handleDragEnd();
            const { id: colOrigin } = e.target as HTMLDivElement;
            const colDestination = e.dataTransfer.getData("colDestination");

            const toIndex = visibleColumns.findIndex(col => col.id === colOrigin);
            const fromIndex = visibleColumns.findIndex(col => col.id === colDestination);

            if (toIndex !== fromIndex) {
                const newOrder = [...visibleColumns.map(column => column.id)];
                newOrder.splice(fromIndex, 1);
                newOrder.splice(toIndex, 0, colDestination);
                setColumnOrder(newOrder);
            }
        },
        [handleDragEnd, setColumnOrder, visibleColumns]
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

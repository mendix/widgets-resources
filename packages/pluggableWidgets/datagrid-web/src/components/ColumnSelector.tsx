import { createElement, Dispatch, ReactElement, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { ColumnInstance } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

export interface ColumnSelectorProps<D extends object> {
    allColumns: Array<ColumnInstance<D>>;
    width: number;
    setWidth: Dispatch<SetStateAction<number>>;
}

export function ColumnSelector<D extends object>({
    allColumns,
    width,
    setWidth
}: ColumnSelectorProps<D>): ReactElement {
    const [show, setShow] = useState(false);
    const listRef = useRef<HTMLUListElement>(null);
    useOnClickOutside(listRef, () => setShow(false));
    useEffect(() => {
        allColumns.filter(column => column.hidden).forEach(column => column.toggleHidden(true));
    }, [allColumns]);
    const visibleColumns = allColumns.filter(column => column.isVisible).length;
    return (
        <div className="th column-selector">
            <button
                className="btn btn-default"
                onClick={() => {
                    setShow(show => !show);
                }}
                ref={ref => {
                    if (ref && ref.clientWidth && width !== ref.clientWidth) {
                        setWidth(ref.clientWidth);
                    }
                }}
            >
                <FontAwesomeIcon icon={faEye} />
            </button>
            {show && (
                <ul className="column-selectors" ref={listRef}>
                    {allColumns.map((column, index) => {
                        return column.canHide ? (
                            <li key={index}>
                                <input
                                    id={`checkbox_toggle_${index}`}
                                    type="checkbox"
                                    checked={column.isVisible}
                                    onClick={() => column.toggleHidden()}
                                    disabled={column.isVisible && visibleColumns === 1}
                                    {...column.getToggleHiddenProps()}
                                />
                                <label htmlFor={`checkbox_toggle_${index}`}>{column.render("Header")}</label>
                            </li>
                        ) : null;
                    })}
                </ul>
            )}
        </div>
    );
}

function useOnClickOutside(ref: RefObject<HTMLUListElement>, handler: () => void): void {
    useEffect(() => {
        const listener = (event: MouseEvent & { target: Node | null }): void => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

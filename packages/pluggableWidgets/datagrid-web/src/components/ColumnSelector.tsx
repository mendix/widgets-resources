import { createElement, Dispatch, ReactElement, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { ColumnInstance, IdType } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

export interface ColumnSelectorProps<D extends object> {
    allColumns: Array<ColumnInstance<D>>;
    setHiddenColumns: Dispatch<SetStateAction<Array<IdType<object>>>>;
}

export function ColumnSelector<D extends object>({
    allColumns,
    setHiddenColumns
}: ColumnSelectorProps<D>): ReactElement {
    const [show, setShow] = useState(false);
    const listRef = useRef<HTMLUListElement>(null);
    useOnClickOutside(listRef, () => setShow(false));
    const visibleColumns = allColumns.filter(column => column.isVisible).length;
    return (
        <td className="th column-selector" width="1px">
            <button
                className="btn btn-default"
                onClick={() => {
                    setShow(show => !show);
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
                                    onClick={() => {
                                        setHiddenColumns(prev => {
                                            if (!column.isVisible) {
                                                prev.splice(
                                                    prev.findIndex(v => v === column.id),
                                                    1
                                                );
                                                return [...prev];
                                            } else {
                                                return [...prev, column.id];
                                            }
                                        });
                                        column.toggleHidden();
                                    }}
                                    disabled={column.isVisible && visibleColumns === 1}
                                    {...column.getToggleHiddenProps()}
                                />
                                <label htmlFor={`checkbox_toggle_${index}`}>{column.render("Header")}</label>
                            </li>
                        ) : null;
                    })}
                </ul>
            )}
        </td>
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

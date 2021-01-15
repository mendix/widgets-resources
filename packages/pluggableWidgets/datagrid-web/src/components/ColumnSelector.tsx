import { createElement, Dispatch, ReactElement, SetStateAction, useRef, useState } from "react";
import { ColumnInstance, IdType } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useOnClickOutside } from "@widgets-resources/piw-utils";

export interface ColumnSelectorProps<D extends object> {
    allColumns: Array<ColumnInstance<D>>;
    setHiddenColumns: Dispatch<SetStateAction<Array<IdType<object>>>>;
}

export function ColumnSelector<D extends object>(props: ColumnSelectorProps<D>): ReactElement {
    const [show, setShow] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(componentRef, () => setShow(false));
    const visibleColumns = props.allColumns.filter(column => column.isVisible).length;
    return (
        <div className="th column-selector">
            <div className="column-selector-content" ref={componentRef}>
                <button
                    className="btn btn-default column-selector-button"
                    onClick={() => {
                        setShow(show => !show);
                    }}
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
                {show && (
                    <ul className="column-selectors">
                        {props.allColumns.map((column, index) => {
                            return column.canHide ? (
                                <li key={index}>
                                    <input
                                        id={`checkbox_toggle_${index}`}
                                        type="checkbox"
                                        checked={column.isVisible}
                                        onClick={() => {
                                            props.setHiddenColumns(prev => {
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
            </div>
        </div>
    );
}

import { createElement, Dispatch, ReactElement, SetStateAction, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useOnClickOutside } from "@mendix/piw-utils-internal";
import { ColumnProperty } from "./Table";

export interface ColumnSelectorProps {
    columns: ColumnProperty[];
    hiddenColumns: string[];
    setHiddenColumns: Dispatch<SetStateAction<string[]>>;
}

export function ColumnSelector(props: ColumnSelectorProps): ReactElement {
    const [show, setShow] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(componentRef, () => setShow(false));
    return (
        <div className="th column-selector">
            <div ref={componentRef} className="column-selector-content">
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
                        {props.columns.map((column: ColumnProperty, index: number) => {
                            const isVisible = !props.hiddenColumns.includes(column.id);
                            return column.canHide ? (
                                <li key={index}>
                                    <input
                                        checked={isVisible}
                                        disabled={isVisible && props.columns.length - props.hiddenColumns.length === 1}
                                        id={`checkbox_toggle_${index}`}
                                        onClick={() => {
                                            props.setHiddenColumns(prev => {
                                                if (!isVisible) {
                                                    prev.splice(
                                                        prev.findIndex(v => v === column.id),
                                                        1
                                                    );
                                                    return [...prev];
                                                } else {
                                                    return [...prev, column.id];
                                                }
                                            });
                                        }}
                                        type="checkbox"
                                    />
                                    <label htmlFor={`checkbox_toggle_${index}`}>{column.header}</label>
                                </li>
                            ) : null;
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

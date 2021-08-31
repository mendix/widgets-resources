import { createElement, Dispatch, ReactElement, SetStateAction, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useOnClickOutside, usePositionObserver } from "@mendix/piw-utils-internal";
import { ColumnProperty } from "./Table";
import { createPortal } from "react-dom";

export interface ColumnSelectorProps {
    columns: ColumnProperty[];
    hiddenColumns: string[];
    setHiddenColumns: Dispatch<SetStateAction<string[]>>;
}

export function ColumnSelector(props: ColumnSelectorProps): ReactElement {
    const [show, setShow] = useState(false);
    const optionsRef = useRef<HTMLUListElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const position = usePositionObserver(buttonRef.current, show);

    useOnClickOutside([buttonRef, optionsRef], () => setShow(false));


    const optionsComponent = createPortal(
        <ul
            ref={optionsRef}
            className="column-selectors"
            style={{
                position: "fixed",
                top: position?.bottom,
                right: position?.right ? document.body.clientWidth - position.right : undefined
            }}
        >
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
        </ul>,
        document.body
    );

    return (
        <div className="th column-selector">
            <div className="column-selector-content">
                <button
                    ref={buttonRef}
                    className="btn btn-default column-selector-button"
                    onClick={() => {
                        setShow(show => !show);
                    }}
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
            </div>
            {show && optionsComponent}
        </div>
    );
}

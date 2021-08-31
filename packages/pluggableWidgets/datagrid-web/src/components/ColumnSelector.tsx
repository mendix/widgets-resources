import { createElement, Dispatch, ReactElement, SetStateAction, useCallback, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useOnClickOutside, usePositionObserver } from "@mendix/piw-utils-internal";
import { ColumnProperty } from "./Table";
import { createPortal } from "react-dom";

export interface ColumnSelectorProps {
    columns: ColumnProperty[];
    hiddenColumns: string[];
    name?: string;
    setHiddenColumns: Dispatch<SetStateAction<string[]>>;
}

export function ColumnSelector(props: ColumnSelectorProps): ReactElement {
    const [show, setShow] = useState(false);
    const optionsRef = useRef<HTMLUListElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const position = usePositionObserver(buttonRef.current, show);

    useOnClickOutside([buttonRef, optionsRef], () => setShow(false));

    const onClick = useCallback(
        (isVisible: boolean, id: string) =>
            props.setHiddenColumns(prev => {
                if (!isVisible) {
                    prev.splice(
                        prev.findIndex(v => v === id),
                        1
                    );
                    return [...prev];
                } else {
                    return [...prev, id];
                }
            }),
        [props.setHiddenColumns]
    );

    const firstHidableColumnIndex = useMemo(() => props.columns.findIndex(c => c.canHide), [props.columns]);
    const lastHidableColumnIndex = useMemo(() => {
        const index = props.columns
            .slice()
            .reverse()
            .findIndex(c => c.canHide);
        const count = props.columns.length - 1;

        return index > -1 ? count - index : count;
    }, [props.columns]);

    const optionsComponent = createPortal(
        <ul
            ref={optionsRef}
            id={`${props.name}-column-selectors`}
            className="column-selectors"
            data-focusindex={0}
            role="menu"
            style={{
                position: "fixed",
                top: position?.bottom,
                right: position?.right ? document.body.clientWidth - position.right : undefined
            }}
        >
            {props.columns.map((column: ColumnProperty, index: number) => {
                const isVisible = !props.hiddenColumns.includes(column.id);
                return column.canHide ? (
                    <li
                        key={index}
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClick(isVisible, column.id);
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                e.stopPropagation();
                                onClick(isVisible, column.id);
                            } else if (
                                (e.key === "Tab" &&
                                    (index === lastHidableColumnIndex ||
                                        (e.shiftKey && index === firstHidableColumnIndex))) ||
                                e.key === "Escape"
                            ) {
                                e.preventDefault();
                                setShow(false);
                                buttonRef.current?.focus();
                            }
                        }}
                        role="menuitem"
                        tabIndex={0}
                    >
                        <input
                            checked={isVisible}
                            disabled={isVisible && props.columns.length - props.hiddenColumns.length === 1}
                            id={`${props.name}_checkbox_toggle_${index}`}
                            type="checkbox"
                            tabIndex={-1}
                        />
                        <label htmlFor={`${props.name}_checkbox_toggle_${index}`} style={{ pointerEvents: "none" }}>
                            {column.header}
                        </label>
                    </li>
                ) : null;
            })}
        </ul>,
        document.body
    );

    const containerClick = useCallback(() => {
        setShow(show => !show);
        setTimeout(() => {
            (optionsRef.current?.querySelector("li") as HTMLElement)?.focus();
        }, 10);
    }, []);

    return (
        <div className="th column-selector">
            <div className="column-selector-content">
                <button
                    ref={buttonRef}
                    className="btn btn-default column-selector-button"
                    onClick={containerClick}
                    onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            containerClick();
                        }
                    }}
                    aria-haspopup
                    aria-expanded={show}
                    aria-controls={`${props.name}-column-selectors`}
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
            </div>
            {show && optionsComponent}
        </div>
    );
}

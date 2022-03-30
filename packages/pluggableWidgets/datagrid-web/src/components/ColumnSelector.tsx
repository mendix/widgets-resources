import { createElement, Dispatch, ReactElement, SetStateAction, useCallback, useMemo, useRef, useState } from "react";
import { FaEye } from "./icons/FaEye";
import { useOnClickOutside, usePositionObserver } from "@mendix/piw-utils-internal/components/web";
import { ColumnProperty } from "./Table";
import { createPortal } from "react-dom";

export interface ColumnSelectorProps {
    columns: ColumnProperty[];
    hiddenColumns: string[];
    id?: string;
    setHiddenColumns: Dispatch<SetStateAction<string[]>>;
    label?: string;
}

export function ColumnSelector(props: ColumnSelectorProps): ReactElement {
    const [show, setShow] = useState(false);
    const optionsRef = useRef<HTMLUListElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const position = usePositionObserver(buttonRef.current, show);
    const visibleCount = props.columns.length - props.hiddenColumns.length;
    const isOnlyOneColumnVisible = visibleCount === 1;

    useOnClickOutside([buttonRef, optionsRef], () => setShow(false));

    const label = props.label ?? "Column selector";

    const onClick = useCallback(
        (isVisible: boolean, id: string) => {
            const isLastVisibleColumn = isVisible && isOnlyOneColumnVisible;
            if (!isLastVisibleColumn) {
                props.setHiddenColumns(prev => {
                    if (!isVisible) {
                        return prev.filter(v => v !== id);
                    } else {
                        return [...prev, id];
                    }
                });
            }
        },
        [props.setHiddenColumns, isOnlyOneColumnVisible]
    );

    const firstHidableColumnIndex = useMemo(() => props.columns.findIndex(c => c.canHide), [props.columns]);
    const lastHidableColumnIndex = useMemo(() => props.columns.map(c => c.canHide).lastIndexOf(true), [props.columns]);

    const optionsComponent = createPortal(
        <ul
            ref={optionsRef}
            id={`${props.id}-column-selectors`}
            className="column-selectors"
            data-focusindex={0}
            role="menu"
            style={{
                position: "fixed",
                top: position?.bottom,
                right: position?.right !== undefined ? document.body.clientWidth - position.right : undefined
            }}
        >
            {props.columns.map((column: ColumnProperty, index: number) => {
                const isVisible = !props.hiddenColumns.includes(column.id);
                const isLastVisibleColumn = isVisible && isOnlyOneColumnVisible;
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
                            disabled={isLastVisibleColumn}
                            id={`${props.id}_checkbox_toggle_${index}`}
                            style={{ pointerEvents: "none" }}
                            type="checkbox"
                            tabIndex={-1}
                        />
                        <label htmlFor={`${props.id}_checkbox_toggle_${index}`} style={{ pointerEvents: "none" }}>
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
        <div aria-label={label} className="th column-selector" role="columnheader" title={label}>
            <div className="column-selector-content">
                <button
                    aria-label={label}
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
                    aria-controls={`${props.id}-column-selectors`}
                >
                    <FaEye />
                </button>
            </div>
            {show && optionsComponent}
        </div>
    );
}

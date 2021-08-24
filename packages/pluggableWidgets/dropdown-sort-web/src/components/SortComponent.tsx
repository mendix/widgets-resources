import { createElement, Fragment, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { SortDirection, useOnClickOutside, usePositionObserver } from "@mendix/piw-utils-internal";
import classNames from "classnames";
import { createPortal } from "react-dom";

export interface SortOption {
    caption: string;
    value: string;
}

interface SortComponentProps {
    ariaLabel?: string;
    defaultDirection?: SortDirection;
    defaultOption?: SortOption;
    emptyOptionCaption?: string;
    name?: string;
    options: SortOption[];
    tabIndex?: number;
    updateSort?: (value: SortOption, direction: SortDirection) => void;
}

export function SortComponent(props: SortComponentProps): ReactElement {
    const [valueInput, setValueInput] = useState(props.defaultOption?.caption ?? props.emptyOptionCaption ?? "");
    const [selectedSort, setSelectedSort] = useState<SortOption>(
        props.defaultOption ?? {
            caption: props.emptyOptionCaption ?? "",
            value: ""
        }
    );
    const [show, setShow] = useState(false);
    const [dropdownWidth, setDropdownWidth] = useState(0);
    const [direction, setDirection] = useState(props.defaultDirection ?? "asc");

    const componentRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);

    const [position, PositionObserver] = usePositionObserver(componentRef.current);

    const onClick = useCallback((option: SortOption) => {
        setValueInput(option.caption);
        setSelectedSort(option);
        setShow(false);
    }, []);

    useOnClickOutside([componentRef, optionsRef], () => setShow(false));

    useEffect(() => {
        if (selectedSort) {
            props.updateSort?.(selectedSort, direction);
        }
    }, [direction, selectedSort]);

    const showPlaceholder = !selectedSort || valueInput === props.emptyOptionCaption;

    const optionsComponent = createPortal(
        <Fragment>
            <ul
                ref={optionsRef}
                id={`${props.name}-dropdown-list`}
                className="dropdown-list"
                role="menu"
                data-focusindex={0}
                style={{ position: "fixed", width: dropdownWidth, top: position?.bottom, left: position?.left }}
            >
                {props.options.map((option, index) => (
                    <li
                        className={classNames({
                            "filter-selected": selectedSort?.value === option.value
                        })}
                        key={index}
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClick(option);
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                e.stopPropagation();
                                onClick(option);
                            }
                        }}
                        role="menuitem"
                        tabIndex={0}
                    >
                        <div className="filter-label">{option.caption}</div>
                    </li>
                ))}
            </ul>
            {PositionObserver}
        </Fragment>,
        document.body
    );

    const containerClick = useCallback(() => {
        setShow(true);
        setTimeout(() => {
            (optionsRef.current?.querySelector("li.filter-selected") as HTMLElement)?.focus();
        }, 10);
    }, []);

    return (
        <div className="dropdown-container" data-focusindex={props.tabIndex ?? 0} ref={componentRef}>
            <div className="dropdown-triggerer-wrapper">
                <input
                    value={showPlaceholder ? "" : valueInput}
                    placeholder={showPlaceholder ? props.emptyOptionCaption : undefined}
                    className="form-control dropdown-triggerer"
                    onClick={() => containerClick()}
                    onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            containerClick();
                        }
                    }}
                    aria-haspopup
                    ref={inputRef => {
                        if (inputRef && inputRef.clientWidth) {
                            setDropdownWidth(inputRef.clientWidth);
                        }
                    }}
                    aria-expanded={show}
                    aria-controls={`${props.name}-dropdown-list`}
                    aria-label={props.ariaLabel}
                />
                <button
                    className={classNames("btn btn-default btn-sort", {
                        "icon-asc": direction === "asc",
                        "icon-desc": direction === "desc"
                    })}
                    onClick={() => setDirection(prev => (prev === "asc" ? "desc" : "asc"))}
                />
            </div>
            {show && optionsComponent}
        </div>
    );
}

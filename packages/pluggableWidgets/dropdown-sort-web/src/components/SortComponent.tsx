import { createElement, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { SortDirection, useOnClickOutside } from "@mendix/piw-utils-internal";
import classNames from "classnames";

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

    const onClick = useCallback((option: SortOption) => {
        setValueInput(option.caption);
        setSelectedSort(option);
        setShow(false);
    }, []);

    useOnClickOutside(componentRef, () => setShow(false));

    useEffect(() => {
        if (selectedSort) {
            props.updateSort?.(selectedSort, direction);
        }
    }, [direction, selectedSort]);

    const showPlaceholder = !selectedSort || valueInput === props.emptyOptionCaption;

    return (
        <div className="dropdown-container" data-focusindex={props.tabIndex ?? 0} ref={componentRef}>
            <div className="dropdown-triggerer-wrapper">
                <input
                    value={showPlaceholder ? "" : valueInput}
                    placeholder={showPlaceholder ? props.emptyOptionCaption : undefined}
                    className="form-control dropdown-triggerer"
                    onClick={() => setShow(true)}
                    onFocus={() => setShow(true)}
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
            {show && (
                <ul
                    id={`${props.name}-dropdown-list`}
                    className="dropdown-list"
                    style={{ width: dropdownWidth }}
                    role="menu"
                    data-focusindex={0}
                >
                    {props.options.map((option, index) => (
                        <li
                            className={classNames({
                                "filter-selected": selectedSort?.value === option.value
                            })}
                            key={index}
                            onClick={() => onClick(option)}
                            onKeyDown={e => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
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
            )}
        </div>
    );
}

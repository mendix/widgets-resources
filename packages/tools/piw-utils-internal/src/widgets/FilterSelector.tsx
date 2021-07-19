import { createElement, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "../utils";

interface FilterSelectorProps<T> {
    ariaLabel?: string;
    name?: string;
    defaultFilter: T;
    onChange: (value: T) => void;
    options: Array<{ value: T; label: string }>;
}

export function FilterSelector<T>(props: FilterSelectorProps<T>): ReactElement {
    const [value, setValue] = useState(props.defaultFilter);
    const [show, setShow] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(componentRef, () => setShow(false));

    const onClick = useCallback(
        (value: T) => {
            setValue(value);
            props.onChange(value);
            setShow(false);
        },
        [props.onChange]
    );

    useEffect(() => {
        setValue(props.defaultFilter);
        props.onChange(props.defaultFilter);
    }, [props.defaultFilter, props.onChange]);

    return (
        <div className="filter-selector">
            <div className="filter-selector-content" ref={componentRef}>
                <button
                    aria-controls={`${props.name}-filter-selectors`}
                    aria-expanded={show}
                    aria-haspopup
                    aria-label={props.ariaLabel}
                    className={classNames("btn btn-default filter-selector-button button-icon", value)}
                    onClick={() => setShow(show => !show)}
                >
                    &nbsp;
                </button>
                {show && (
                    <ul
                        id={`${props.name}-filter-selectors`}
                        className="filter-selectors"
                        role="menu"
                        data-focusindex={0}
                    >
                        {props.options.map((option, index) => (
                            <li
                                className={classNames({ "filter-selected": value === option.value })}
                                key={index}
                                onClick={() => onClick(option.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        onClick(option.value);
                                    }
                                }}
                                role="menuitem"
                                tabIndex={0}
                            >
                                <div className={classNames("filter-icon", option.value)} aria-hidden />
                                <div className="filter-label">{option.label}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

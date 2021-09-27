import { createElement, CSSProperties, Fragment, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useOnClickOutside, usePositionObserver } from "@mendix/piw-utils-internal/components/web";
import classNames from "classnames";
import deepEqual from "deep-equal";
import { createPortal } from "react-dom";

export interface FilterOption {
    caption: string;
    value: string;
}

interface FilterComponentProps {
    ariaLabel?: string;
    className?: string;
    defaultValue?: string;
    emptyOptionCaption?: string;
    multiSelect?: boolean;
    id?: string;
    options: FilterOption[];
    tabIndex?: number;
    styles?: CSSProperties;
    updateFilters?: (values: FilterOption[]) => void;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [valueInput, setValueInput] = useState("");
    const [options, setOptions] = useState<FilterOption[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
    const [show, setShow] = useState(false);
    const [dropdownWidth, setDropdownWidth] = useState(0);
    const defaultValuesLoaded = useRef<boolean>(false);

    const componentRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);

    const position = usePositionObserver(componentRef.current, show);

    const setMultiSelectFilters = useCallback(
        (selectedOptions: FilterOption[]) => {
            if (selectedOptions?.length === 0) {
                setValueInput(props.emptyOptionCaption ?? "");
                setSelectedFilters([]);
            } else {
                setValueInput(selectedOptions.map(option => option.caption).join(","));
                setSelectedFilters(prev => {
                    if (deepEqual(selectedOptions, prev, { strict: true })) {
                        return prev;
                    }
                    return selectedOptions;
                });
            }
        },
        [props.emptyOptionCaption]
    );

    const onClick = useCallback(
        (option: FilterOption) => {
            if (props.multiSelect) {
                setMultiSelectFilters(toggleFilter(selectedFilters, option));
            } else {
                setValueInput(option.caption);
                setSelectedFilters([option]);
                setShow(false);
            }
        },
        [selectedFilters, props.multiSelect]
    );

    useOnClickOutside([componentRef, optionsRef], () => setShow(false));

    // Select the first option Or default option on load
    useEffect(() => {
        if (!defaultValuesLoaded.current && options.length > 0) {
            if (props.multiSelect) {
                if (props.defaultValue) {
                    const initialOptions = props.defaultValue
                        .split(",")
                        .map(value => options.find(option => option.value === value))
                        .filter(Boolean) as FilterOption[];

                    // User can set anything, but it could not match so we have to set to empty or ""
                    setMultiSelectFilters(initialOptions);
                } else {
                    setValueInput(props.emptyOptionCaption ?? "");
                }
            } else {
                // We want to add empty option caption
                const initialOption = options.find(option => option.value === props.defaultValue) ?? options[0];

                setValueInput(initialOption?.caption ?? "");
                setSelectedFilters(prev => {
                    const newValue = [initialOption];
                    if (deepEqual(newValue, prev, { strict: true })) {
                        return prev;
                    }
                    return newValue;
                });
            }
            defaultValuesLoaded.current = true;
        }
    }, [props.defaultValue, props.emptyOptionCaption, props.multiSelect, options]);

    useEffect(() => {
        const emptyOption = props.multiSelect
            ? []
            : [
                  {
                      caption: props.emptyOptionCaption ?? "",
                      value: ""
                  }
              ];
        const options = [...emptyOption, ...props.options];
        setOptions(prev => {
            if (deepEqual(prev, options, { strict: true })) {
                return prev;
            }
            return options;
        });

        // Resets the option to reload default values
        defaultValuesLoaded.current = false;
    }, [props.emptyOptionCaption, props.multiSelect, props.options, props.defaultValue]);

    useEffect(() => {
        props.updateFilters?.(selectedFilters);
    }, [selectedFilters]);

    const showPlaceholder = selectedFilters.length === 0 || valueInput === props.emptyOptionCaption;

    const optionsComponent = createPortal(
        <ul
            ref={optionsRef}
            id={`${props.id}-dropdown-list`}
            className="dropdown-list"
            role="menu"
            data-focusindex={0}
            style={{ position: "fixed", width: dropdownWidth, top: position?.bottom, left: position?.left }}
        >
            {options.map((option, index) => (
                <li
                    className={classNames({
                        "filter-selected": !props.multiSelect && selectedFilters.includes(option)
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
                        } else if (
                            (e.key === "Tab" && (index + 1 === options.length || (e.shiftKey && index === 0))) ||
                            e.key === "Escape"
                        ) {
                            e.preventDefault();
                            setShow(false);
                            componentRef.current?.querySelector("input")?.focus();
                        }
                    }}
                    role="menuitem"
                    tabIndex={0}
                >
                    {props.multiSelect ? (
                        <Fragment>
                            <input
                                id={`${props.id}_checkbox_toggle_${index}`}
                                type="checkbox"
                                checked={selectedFilters.includes(option)}
                            />
                            <label htmlFor={`${props.id}_checkbox_toggle_${index}`} style={{ pointerEvents: "none" }}>
                                {option.caption}
                            </label>
                        </Fragment>
                    ) : (
                        <div className="filter-label">{option.caption}</div>
                    )}
                </li>
            ))}
        </ul>,
        document.body
    );

    const containerClick = useCallback(() => {
        setShow(show => !show);
        setTimeout(() => {
            (optionsRef.current?.querySelector("li.filter-selected") as HTMLElement)?.focus();
        }, 10);
    }, []);

    return (
        <div
            className={classNames("dropdown-container", props.className)}
            data-focusindex={props.tabIndex ?? 0}
            ref={componentRef}
            style={props.styles}
        >
            <input
                value={!showPlaceholder ? valueInput : ""}
                placeholder={showPlaceholder ? props.emptyOptionCaption : undefined}
                className="form-control dropdown-triggerer"
                onClick={containerClick}
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
                aria-controls={`${props.id}-dropdown-list`}
                aria-label={props.ariaLabel}
            />
            {show && optionsComponent}
        </div>
    );
}

function toggleFilter(filters: FilterOption[], filterToToggle: FilterOption): FilterOption[] {
    const alteredFilters = [...filters];
    const index = filters.indexOf(filterToToggle);
    if (index > -1) {
        alteredFilters.splice(index, 1);
    } else {
        alteredFilters.push(filterToToggle);
    }

    return alteredFilters;
}

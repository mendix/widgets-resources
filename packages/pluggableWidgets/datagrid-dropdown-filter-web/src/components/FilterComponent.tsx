import { createElement, Dispatch, Fragment, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { ListAttributeValue, ObjectItem } from "mendix";
import { useOnClickOutside } from "@widgets-resources/piw-utils";

interface Option {
    caption: string;
    value: string;
}

interface FilterComponentProps {
    ariaLabel?: string;
    emptyOptionCaption?: string;
    filterDispatcher: Dispatch<{ filter(item: ObjectItem, attribute: ListAttributeValue): boolean }>;
    multiSelect?: boolean;
    name?: string;
    options: Option[];
    tabIndex?: number;
    defaultValue?: string;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [valueInput, setValueInput] = useState("");
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<Option[]>([]);
    const [show, setShow] = useState(false);
    const [dropdownWidth, setDropdownWidth] = useState(0);

    const listRef = useRef<HTMLUListElement>(null);

    const setMultiSelectFilters = useCallback(
        (selectedOptions: Option[]) => {
            if (selectedOptions?.length === 0) {
                setValueInput(props.emptyOptionCaption ?? "");
                setSelectedFilters([]);
            } else {
                setValueInput(selectedOptions.map(option => option.caption).join(","));
                setSelectedFilters(selectedOptions);
            }
        },
        [props.emptyOptionCaption]
    );

    const onClick = useCallback(
        (option: Option) => {
            if (props.multiSelect) {
                setMultiSelectFilters(toggleFilter(selectedFilters, option));
            } else {
                setValueInput(option.caption);
                setSelectedFilters(option.value ? [option] : []);
                setShow(false);
            }
        },
        [selectedFilters, props.emptyOptionCaption, props.multiSelect]
    );

    useOnClickOutside(listRef, () => setShow(false));

    // Select the first option Or default option on load
    useEffect(() => {
        if (props.multiSelect) {
            if (props.defaultValue) {
                const initialOptions = props.defaultValue
                    .split(",")
                    .map(value => props.options.find(option => option.value === value))
                    .filter(Boolean) as Option[];

                // User can set anything, but it could not match so we have to set to empty or ""
                setMultiSelectFilters(initialOptions);
            } else {
                setValueInput(props.emptyOptionCaption ?? "");
            }

            setOptions(props.options);
        } else {
            // We want to add empty option caption
            const optionsWithEmptyCaption = [{ caption: props.emptyOptionCaption ?? "", value: "" }, ...props.options];
            const initialOption =
                optionsWithEmptyCaption.find(option => option.value === props.defaultValue) ??
                optionsWithEmptyCaption[0];

            setValueInput(initialOption?.caption ?? "");
            setSelectedFilters([initialOption]);
            setOptions(optionsWithEmptyCaption);
        }
    }, [props.defaultValue, props.options, props.emptyOptionCaption]);

    // Filter
    useEffect(() => {
        if (props.filterDispatcher) {
            props.filterDispatcher({
                filter: (item, attr): boolean => {
                    if (selectedFilters.length > 0) {
                        return selectedFilters.some(
                            selectedFilter =>
                                attr(item).value?.toString().toLocaleLowerCase() ===
                                    selectedFilter.value?.toString().toLocaleLowerCase() ||
                                selectedFilter.value?.toString() === ""
                        );
                    }
                    return true;
                }
            });
        }
    }, [props.filterDispatcher, selectedFilters]);

    return (
        <div className="dropdown-container" data-focusindex={props.tabIndex ?? 0}>
            <input
                value={valueInput}
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
            <ul
                id={`${props.name}-dropdown-list`}
                className={`dropdown-list ${show && "dropdown-list-visible"}`}
                ref={listRef}
                style={{ width: dropdownWidth }}
                role="menu"
                data-focusindex={0}
            >
                {options.map((option, index) => (
                    <li
                        className={!props.multiSelect && selectedFilters.includes(option) ? "filter-selected" : ""}
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
                        {props.multiSelect ? (
                            <Fragment>
                                <input
                                    id={`checkbox_toggle_${index}`}
                                    type="checkbox"
                                    checked={selectedFilters.includes(option)}
                                />
                                <label htmlFor={`checkbox_toggle_${index}`}>{option.caption}</label>
                            </Fragment>
                        ) : (
                            <div className="filter-label">{option.caption}</div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function toggleFilter(filters: Option[], filterToToggle: Option): Option[] {
    const alteredFilters = [...filters];
    const index = filters.indexOf(filterToToggle);
    if (index > -1) {
        alteredFilters.splice(index, 1);
    } else {
        alteredFilters.push(filterToToggle);
    }

    return alteredFilters;
}

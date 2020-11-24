import { createElement, Dispatch, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { ListAttributeValue, ObjectItem } from "mendix";
import { useOnClickOutside } from "../utils/utils";

interface Option {
    caption: string;
    value: string;
}

interface FilterComponentProps {
    ariaLabel?: string;
    emptyOptionCaption?: string;
    filterDispatcher: Dispatch<{ filter(item: ObjectItem, attribute: ListAttributeValue): boolean }>;
    name?: string;
    options: Option[];
    tabIndex?: number;
    value?: string;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [valueInput, setValueInput] = useState("");

    const [value, setValue] = useState(props.value);
    const [show, setShow] = useState(false);
    const listRef = useRef<HTMLUListElement>(null);
    const [dropdownWidth, setDropdownWidth] = useState(0);
    useOnClickOutside(listRef, () => setShow(false));

    const [options, setOptions] = useState<Option[]>([{ caption: "", value: "" }]);

    useEffect(() => {
        setOptions([{ caption: props.emptyOptionCaption ?? "", value: "" }, ...props.options]);
    }, [props.options, props.emptyOptionCaption]);

    useEffect(() => {
        const selectedOption = options.find(option => option.value === props.value) ?? options[0];
        setValueInput(selectedOption.caption);
        setValue(selectedOption.value);
    }, [props.value, options]);

    useEffect(() => {
        if (props.filterDispatcher) {
            props.filterDispatcher({
                filter: (item, attr): boolean =>
                    value ? attr(item).value?.toString().toLocaleLowerCase() === value.toLocaleLowerCase() : true
            });
        }
    }, [props.filterDispatcher, value]);

    const onClick = useCallback((option: Option) => {
        setValueInput(option.caption);
        setValue(option.value);
        setShow(false);
    }, []);

    // TODO: after selecting via keyboard, it jumps to end
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
                        className={value === option.value ? "filter-selected" : ""}
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
        </div>
    );
}

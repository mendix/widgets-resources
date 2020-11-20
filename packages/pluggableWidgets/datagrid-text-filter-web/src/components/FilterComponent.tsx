import { createElement, Dispatch, ReactElement, useCallback, useEffect, useState } from "react";
import { FilterSelector } from "./FilterSelector";
import { ObjectItem, ListAttributeValue } from "mendix";
import { DefaultFilterEnum } from "../../typings/DatagridTextFilterProps";
import { debounce } from "../utils/utils";

interface FilterComponentProps {
    ariaLabel?: string;
    defaultFilter: DefaultFilterEnum;
    delay: number;
    filterDispatcher: Dispatch<{ filter(item: ObjectItem, attribute: ListAttributeValue): boolean }>;
    name?: string;
    placeholder?: string;
    tabIndex?: number;
    value?: string;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [type, setType] = useState<DefaultFilterEnum>(props.defaultFilter);
    const [value, setValue] = useState("");
    const [valueInput, setValueInput] = useState("");

    useEffect(() => {
        if (props.value) {
            setValueInput(props.value);
            setValue(props.value);
        }
    }, [props.value]);

    useEffect(() => {
        if (props.filterDispatcher) {
            props.filterDispatcher({
                filter: (item, attr): boolean => {
                    if (!value) {
                        return true;
                    }
                    const dataValue = attr(item).displayValue.toLowerCase();
                    const filterValue = value.toLowerCase();
                    switch (type) {
                        case "contains":
                            return dataValue.includes(filterValue);
                        case "startsWith":
                            return dataValue.startsWith(filterValue);
                        case "endsWith":
                            return dataValue.endsWith(filterValue);
                        case "greater":
                            return dataValue > filterValue;
                        case "greaterEqual":
                            return dataValue >= filterValue;
                        case "equal":
                            return dataValue === filterValue;
                        case "notEqual":
                            return dataValue !== filterValue;
                        case "smaller":
                            return dataValue < filterValue;
                        case "smallerEqual":
                            return dataValue <= filterValue;
                    }
                }
            });
        }
    }, [props.filterDispatcher, value, type]);

    const onChange = useCallback(
        debounce((value: string) => setValue(value), props.delay),
        [props.delay]
    );

    return (
        <div className="filter-container" data-focusindex={props.tabIndex ?? 0}>
            <FilterSelector name={props.name} defaultFilter={props.defaultFilter} onChange={setType} />
            <input
                aria-label={props.ariaLabel}
                className="form-control filter-input"
                onChange={e => {
                    setValueInput(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={props.placeholder}
                type="text"
                value={valueInput}
            />
        </div>
    );
}

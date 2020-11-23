import { createElement, Dispatch, ReactElement, useCallback, useEffect, useState } from "react";
import { FilterSelector } from "./FilterSelector";
import { ListAttributeValue, ObjectItem } from "mendix";
import { DefaultFilterEnum } from "../../typings/DatagridNumberFilterProps";
import { debounce } from "../utils/utils";
import Big from "big.js";

interface FilterComponentProps {
    ariaLabel?: string;
    defaultFilter: DefaultFilterEnum;
    delay: number;
    filterDispatcher: Dispatch<{ filter(item: ObjectItem, attribute: ListAttributeValue): boolean }>;
    name?: string;
    placeholder?: string;
    tabIndex?: number;
    value?: BigJs.Big;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [type, setType] = useState<DefaultFilterEnum>(props.defaultFilter);
    const [value, setValue] = useState<BigJs.Big | undefined>(undefined);
    const [valueInput, setValueInput] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (props.value) {
            setValueInput(props.value.toString());
            setValue(props.value);
        }
    }, [props.value]);

    useEffect(() => {
        if (props.filterDispatcher) {
            props.filterDispatcher({
                filter: (item, attr): boolean => {
                    if (!value || isNaN(Number(attr(item).value))) {
                        return true;
                    }
                    const dataValue = attr(item).value as Big;
                    const filterValue = new Big(value);
                    switch (type) {
                        case "greater":
                            return dataValue.gt(filterValue);
                        case "greaterEqual":
                            return dataValue.gte(filterValue);
                        case "equal":
                            return dataValue.eq(filterValue);
                        case "notEqual":
                            return !dataValue.eq(filterValue);
                        case "smaller":
                            return dataValue.lt(filterValue);
                        case "smallerEqual":
                            return dataValue.lte(filterValue);
                    }
                }
            });
        }
    }, [props.filterDispatcher, value, type]);

    const onChange = useCallback(
        debounce((value?: BigJs.Big) => setValue(value), props.delay),
        [props.delay]
    );

    return (
        <div className="filter-container" data-focusindex={props.tabIndex ?? 0}>
            <FilterSelector name={props.name} defaultFilter={props.defaultFilter} onChange={setType} />
            <input
                aria-label={props.ariaLabel}
                className="form-control filter-input"
                onChange={e => {
                    const value = e.target.value;
                    if (value && !isNaN(Number(value))) {
                        setValueInput(value);
                        onChange(new Big(Number(value)));
                    } else {
                        setValueInput(value);
                        onChange(undefined);
                    }
                }}
                placeholder={props.placeholder}
                type="number"
                value={valueInput}
            />
        </div>
    );
}

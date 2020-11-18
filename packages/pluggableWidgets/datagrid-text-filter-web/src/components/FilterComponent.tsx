import { createElement, Dispatch, ReactElement, useEffect, useState } from "react";
import { FilterSelector } from "./FilterSelector";
import { ObjectItem, ListAttributeValue } from "mendix";
import { DefaultFilterEnum } from "../../typings/DatagridTextFilterProps";

interface FilterComponentProps {
    defaultFilter: DefaultFilterEnum;
    value?: string;
    placeholder?: string;
    filterDispatcher: Dispatch<{ filter(item: ObjectItem, attribute: ListAttributeValue): boolean }>;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [type, setType] = useState<DefaultFilterEnum>(props.defaultFilter);
    const [value, setValue] = useState(props.value);

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

    return (
        <div className="filter-container">
            <FilterSelector defaultFilter={props.defaultFilter} onChange={v => setType(v)} />
            <input
                placeholder={props.placeholder}
                value={value}
                className="form-control filter-input"
                onChange={e => setValue(e.target.value)}
                type="text"
            />
        </div>
    );
}

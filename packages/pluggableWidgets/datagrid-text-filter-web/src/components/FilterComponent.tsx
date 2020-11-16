import { createElement, Dispatch, ReactElement, useEffect, useState } from "react";
import { FilterSelector } from "./FilterSelector";
import { ObjectItem, ListAttributeValue } from "mendix";

interface FilterComponentProps {
    value?: string;
    placeholder?: string;
    filterDispatcher: Dispatch<{ filter(item: ObjectItem, attribute: ListAttributeValue): boolean }>;
}

declare type FilterType =
    | "contains"
    | "startsWith"
    | "endsWith"
    | "greater"
    | "greaterEqual"
    | "equal"
    | "notEqual"
    | "smaller"
    | "smallerEqual";

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [type, setType] = useState<FilterType>("equal");
    const [value, setValue] = useState("");

    useEffect(() => {
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
    }, [props.filterDispatcher, value, type]);
    return (
        <div className="filter-container">
            <FilterSelector onChange={v => setType(v as FilterType)} />
            <input
                placeholder={props.placeholder}
                value={value}
                className="form-control"
                onChange={v => setValue(v.target.value)}
                type="text"
            />
        </div>
    );
}

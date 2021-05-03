import { createElement, Dispatch, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { FilterSelector } from "./FilterSelector";
import { ListAttributeValue } from "mendix";
import {
    attribute,
    contains,
    equals,
    endsWith,
    greaterThan,
    greaterThanOrEqual,
    lessThan,
    lessThanOrEqual,
    literal,
    startsWith,
    notEqual
} from "mendix/filters/builders";
import { DefaultFilterEnum } from "../../typings/DatagridTextFilterProps";
import { debounce } from "../utils/utils";
import classNames from "classnames";
import { FilterFunction } from "../../../datagrid-number-filter-web/src/utils/provider";
import { Alert } from "@mendix/piw-utils-internal";

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && !type.match(/HashString|String/)
        ? "The attribute type being used for Data grid text filter is not 'Hashed string or String'"
        : null;
}

interface FilterComponentProps {
    adjustable: boolean;
    attribute?: ListAttributeValue;
    defaultFilter: DefaultFilterEnum;
    delay: number;
    filterDispatcher: Dispatch<FilterFunction>;
    name?: string;
    placeholder?: string;
    tabIndex?: number;
    screenReaderButtonCaption?: string;
    screenReaderInputCaption?: string;
    value?: string;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [type, setType] = useState<DefaultFilterEnum>(props.defaultFilter);
    const [value, setValue] = useState("");
    const [valueInput, setValueInput] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (props.value) {
            setValueInput(props.value);
            setValue(props.value);
        }
    }, [props.value]);

    useEffect(() => {
        if (props.filterDispatcher) {
            props.filterDispatcher({
                getFilterCondition: () => {
                    if (!props.attribute || !props.attribute.filterable || !value) {
                        return undefined;
                    }
                    const filterAttribute = attribute(props.attribute.id);

                    switch (type) {
                        case "contains":
                            return contains(filterAttribute, literal(value));
                        case "startsWith":
                            return startsWith(filterAttribute, literal(value));
                        case "endsWith":
                            return endsWith(filterAttribute, literal(value));
                        case "greater":
                            return greaterThan(filterAttribute, literal(value));
                        case "greaterEqual":
                            return greaterThanOrEqual(filterAttribute, literal(value));
                        case "equal":
                            return equals(filterAttribute, literal(value));
                        case "notEqual":
                            return notEqual(filterAttribute, literal(value));
                        case "smaller":
                            return lessThan(filterAttribute, literal(value));
                        case "smallerEqual":
                            return lessThanOrEqual(filterAttribute, literal(value));
                    }
                }
            });
        }
    }, [props.attribute, props.filterDispatcher, value, type]);

    const onChange = useCallback(
        debounce((value: string) => setValue(value), props.delay),
        [props.delay]
    );

    const focusInput = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const errorMessage = getAttributeTypeErrorMessage(props.attribute?.type);

    if (errorMessage) {
        return <Alert bootstrapStyle="danger">{errorMessage}</Alert>;
    }

    return (
        <div className="filter-container" data-focusindex={props.tabIndex ?? 0}>
            {props.adjustable && (
                <FilterSelector
                    ariaLabel={props.screenReaderButtonCaption}
                    name={props.name}
                    defaultFilter={props.defaultFilter}
                    onChange={type => {
                        setType(type);
                        focusInput();
                    }}
                />
            )}
            <input
                aria-label={props.screenReaderInputCaption}
                className={classNames("form-control", { "filter-input": props.adjustable })}
                onChange={e => {
                    setValueInput(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={props.placeholder}
                ref={inputRef}
                type="text"
                value={valueInput}
            />
        </div>
    );
}

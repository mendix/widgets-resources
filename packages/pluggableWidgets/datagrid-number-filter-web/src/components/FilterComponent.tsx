import { createElement, Dispatch, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { FilterSelector } from "./FilterSelector";
import { ListAttributeValue } from "mendix";
import {
    attribute,
    equals,
    greaterThan,
    greaterThanOrEqual,
    lessThan,
    lessThanOrEqual,
    literal,
    notEqual
} from "mendix/filters/builders";
import { DefaultFilterEnum } from "../../typings/DatagridNumberFilterProps";
import { debounce } from "../utils/utils";
import { Big } from "big.js";
import classNames from "classnames";
import { FilterFunction } from "../utils/provider";
import { Alert } from "@mendix/piw-utils-internal";

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && !type.match(/AutoNumber|Decimal|Integer|Long/)
        ? "The attribute type being used for Data grid number filter is not 'Auto number, Decimal, Integer or Long'"
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
    screenReaderButtonCaption?: string;
    screenReaderInputCaption?: string;
    tabIndex?: number;
    value?: Big;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [type, setType] = useState<DefaultFilterEnum>(props.defaultFilter);
    const [value, setValue] = useState<Big | undefined>(undefined);
    const [valueInput, setValueInput] = useState<string | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (props.value) {
            setValueInput(props.value.toString());
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
                    const filterValue = new Big(value);

                    switch (type) {
                        case "greater":
                            return greaterThan(filterAttribute, literal(filterValue));
                        case "greaterEqual":
                            return greaterThanOrEqual(filterAttribute, literal(filterValue));
                        case "equal":
                            return equals(filterAttribute, literal(filterValue));
                        case "notEqual":
                            return notEqual(filterAttribute, literal(filterValue));
                        case "smaller":
                            return lessThan(filterAttribute, literal(filterValue));
                        case "smallerEqual":
                            return lessThanOrEqual(filterAttribute, literal(filterValue));
                    }
                }
            });
        }
    }, [props.attribute, props.filterDispatcher, value, type]);

    const onChange = useCallback(
        debounce((value?: Big) => setValue(value), props.delay),
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
                ref={inputRef}
                type="number"
                value={valueInput}
            />
        </div>
    );
}

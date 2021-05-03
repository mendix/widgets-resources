import { createElement, Dispatch, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { FilterSelector } from "./FilterSelector";

import { FilterCondition } from "mendix/filters";
import { DefaultFilterEnum } from "../../typings/DatagridNumberFilterProps";
import { debounce } from "../utils/utils";
import { Big } from "big.js";
import classNames from "classnames";
import { FilterFunction } from "../utils/provider";

interface FilterComponentProps {
    adjustable: boolean;
    defaultFilter: DefaultFilterEnum;
    delay: number;
    filterDispatcher: Dispatch<FilterFunction>;
    getFilterConditions?: (value: Big | undefined, type: DefaultFilterEnum) => FilterCondition | undefined;
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
                getFilterCondition: () => props.getFilterConditions?.(value, type)
            });
        }
    }, [props.filterDispatcher, value, type]);

    const onChange = useCallback(
        debounce((value?: Big) => setValue(value), props.delay),
        [props.delay]
    );

    const focusInput = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

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

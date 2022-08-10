import { createElement, CSSProperties, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { FilterSelector } from "@mendix/piw-utils-internal/components/web";
import { debounce } from "@mendix/piw-utils-internal";

import { DefaultFilterEnum } from "../../typings/DatagridNumberFilterProps";
import { Big } from "big.js";
import classNames from "classnames";

interface FilterComponentProps {
    adjustable: boolean;
    className?: string;
    defaultFilter: DefaultFilterEnum;
    delay: number;
    id?: string;
    placeholder?: string;
    screenReaderButtonCaption?: string;
    screenReaderInputCaption?: string;
    tabIndex?: number;
    styles?: CSSProperties;
    updateFilters?: (value: Big | undefined, type: DefaultFilterEnum) => void;
    value?: Big;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [type, setType] = useState<DefaultFilterEnum>(props.defaultFilter);
    const [value, setValue] = useState<Big | undefined>(undefined);
    const [valueInput, setValueInput] = useState<string | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setValueInput(props.value?.toString() ?? "");
        setValue(props.value);
    }, [props.value]);

    useEffect(() => {
        props.updateFilters?.(value, type);
    }, [value, type]);

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
        <div
            className={classNames("filter-container", props.className)}
            data-focusindex={props.tabIndex ?? 0}
            style={props.styles}
        >
            {props.adjustable && (
                <FilterSelector
                    ariaLabel={props.screenReaderButtonCaption}
                    id={props.id}
                    defaultFilter={props.defaultFilter}
                    onChange={useCallback(
                        type => {
                            setType(prev => {
                                if (prev === type) {
                                    return prev;
                                }
                                focusInput();
                                return type;
                            });
                        },
                        [focusInput]
                    )}
                    options={
                        [
                            { value: "greater", label: "Greater than" },
                            { value: "greaterEqual", label: "Greater than or equal" },
                            { value: "equal", label: "Equal" },
                            { value: "notEqual", label: "Not equal" },
                            { value: "smaller", label: "Smaller than" },
                            { value: "smallerEqual", label: "Smaller than or equal" },
                            { value: "empty", label: "Empty" },
                            { value: "notEmpty", label: "Not empty" }
                        ] as Array<{ value: DefaultFilterEnum; label: string }>
                    }
                />
            )}
            <input
                aria-label={props.screenReaderInputCaption}
                className={classNames("form-control", { "filter-input": props.adjustable })}
                disabled={type === "empty" || type === "notEmpty"}
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

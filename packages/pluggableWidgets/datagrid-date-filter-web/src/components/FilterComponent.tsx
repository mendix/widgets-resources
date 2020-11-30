import { createElement, Dispatch, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { FilterSelector } from "./FilterSelector";
import { ListAttributeValue, ObjectItem } from "mendix";
import { DefaultFilterEnum } from "../../typings/DatagridDateFilterProps";
import DatePicker from "react-datepicker";

import classNames from "classnames";

interface FilterComponentProps {
    adjustable: boolean;
    defaultFilter: DefaultFilterEnum;
    defaultValue?: Date;
    dateFormat?: string;
    filterDispatcher: Dispatch<{ filter(item: ObjectItem, attribute: ListAttributeValue): boolean }>;
    locale?: string;
    name?: string;
    placeholder?: string;
    tabIndex?: number;
    screenReaderButtonCaption?: string;
    screenReaderInputCaption?: string;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [type, setType] = useState<DefaultFilterEnum>(props.defaultFilter);
    const [value, setValue] = useState<Date | null>(new Date());
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (props.defaultValue) {
            setValue(props.defaultValue);
        }
    }, [props.defaultValue]);

    useEffect(() => {
        if (props.filterDispatcher) {
            props.filterDispatcher({
                filter: (item, attr): any => {
                    if (!value) {
                        return true;
                    }
                    const dataValue = attr(item).displayValue.toLowerCase();
                    console.log(dataValue);
                    return true;
                    // TODO: actually filter
                    // const filterValue = value.toLowerCase();
                    // switch (type) {
                    //     case "greater":
                    //         return dataValue > filterValue;
                    //     case "greaterEqual":
                    //         return dataValue >= filterValue;
                    //     case "equal":
                    //         return dataValue === filterValue;
                    //     case "notEqual":s
                    //         return dataValue !== filterValue;
                    //     case "smaller":
                    //         return dataValue < filterValue;
                    //     case "smallerEqual":
                    //         return dataValue <= filterValue;
                    // }
                }
            });
        }
    }, [props.filterDispatcher, value, type]);

    const focusInput = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const InputButton = (inputProps: any) => (
        <input aria-label={props.screenReaderInputCaption} ref={inputRef} type="text" {...inputProps} />
    );

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
            <DatePicker
                dateFormat={props.dateFormat}
                locale={props.locale}
                className={classNames("form-control", { "filter-input": props.adjustable })}
                placeholderText={props.placeholder}
                selected={value}
                onChange={date => {
                    // TODO: this is being triggered if you type, so set if it is valid
                    setValue(date as Date);
                }}
                customInput={<InputButton />}
            />
        </div>
    );
}

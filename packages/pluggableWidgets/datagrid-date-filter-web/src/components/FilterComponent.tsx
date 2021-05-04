import { createElement, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { FilterSelector } from "./FilterSelector";

import { DefaultFilterEnum } from "../../typings/DatagridDateFilterProps";

import DatePickerComponent from "react-datepicker";
import { DatePicker } from "./DatePicker";

interface FilterComponentProps {
    adjustable: boolean;
    defaultFilter: DefaultFilterEnum;
    defaultValue?: Date;
    dateFormat?: string;
    locale?: string;
    name?: string;
    placeholder?: string;
    screenReaderButtonCaption?: string;
    screenReaderInputCaption?: string;
    tabIndex?: number;
    updateFilters?: (value: Date | null, type: DefaultFilterEnum) => void;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [type, setType] = useState<DefaultFilterEnum>(props.defaultFilter);
    const [value, setValue] = useState<Date | null>(null);
    const pickerRef = useRef<DatePickerComponent | null>(null);

    useEffect(() => {
        if (props.defaultValue) {
            setValue(props.defaultValue);
        }
    }, [props.defaultValue]);

    useEffect(() => {
        props.updateFilters?.(value, type);
    }, [value, type]);

    const focusInput = useCallback(() => {
        if (pickerRef.current) {
            pickerRef.current.setFocus();
        }
    }, [pickerRef.current]);

    return (
        <div className="filter-container" data-focusindex={props.tabIndex ?? 0}>
            {props.adjustable && (
                <FilterSelector
                    ariaLabel={props.screenReaderButtonCaption}
                    defaultFilter={props.defaultFilter}
                    name={props.name}
                    onChange={type => {
                        setType(type);
                        focusInput();
                    }}
                />
            )}
            <DatePicker
                adjustable={props.adjustable}
                dateFormat={props.dateFormat}
                locale={props.locale}
                name={props.name}
                placeholder={props.placeholder}
                ref={pickerRef}
                screenReaderInputCaption={props.screenReaderInputCaption}
                setValue={setValue}
                value={value}
            />
        </div>
    );
}

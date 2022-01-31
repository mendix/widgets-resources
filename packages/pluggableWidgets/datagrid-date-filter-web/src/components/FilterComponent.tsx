import { createElement, CSSProperties, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { FilterSelector } from "@mendix/piw-utils-internal/components/web";

import { DefaultFilterEnum } from "../../typings/DatagridDateFilterProps";

import DatePickerComponent from "react-datepicker";
import { DatePicker } from "./DatePicker";
import classNames from "classnames";

interface FilterComponentProps {
    adjustable: boolean;
    calendarStartDay?: number;
    className?: string;
    defaultFilter: DefaultFilterEnum;
    defaultValue?: Date;
    defaultStartDate?: Date;
    defaultEndDate?: Date;
    dateFormat?: string;
    locale?: string;
    id?: string;
    placeholder?: string;
    screenReaderButtonCaption?: string;
    screenReaderCalendarCaption?: string;
    screenReaderInputCaption?: string;
    tabIndex?: number;
    styles?: CSSProperties;
    updateFilters?: (
        value: Date | null,
        rangeValues: [Date | null, Date | null] | null,
        type: DefaultFilterEnum
    ) => void;
}

export function FilterComponent(props: FilterComponentProps): ReactElement {
    const [type, setType] = useState<DefaultFilterEnum>(props.defaultFilter);
    const [value, setValue] = useState<Date | null>(null);
    const [rangeValues, setRangeValues] = useState<[Date | null, Date | null] | null>(
        props.defaultStartDate || props.defaultEndDate
            ? [props.defaultStartDate ?? null, props.defaultEndDate ?? null]
            : null
    );
    const pickerRef = useRef<DatePickerComponent | null>(null);

    useEffect(() => {
        if (props.defaultValue) {
            setValue(props.defaultValue);
        }
    }, [props.defaultValue]);

    useEffect(() => {
        if (props.defaultStartDate || props.defaultEndDate) {
            setRangeValues([props.defaultStartDate ?? null, props.defaultEndDate ?? null]);
        }
    }, [props.defaultStartDate, props.defaultEndDate]);

    useEffect(() => {
        props.updateFilters?.(value, rangeValues, type);
    }, [value, rangeValues, type]);

    const focusInput = useCallback(() => {
        if (pickerRef.current) {
            pickerRef.current.setFocus();
        }
    }, [pickerRef.current]);

    return (
        <div
            className={classNames("filter-container", props.className)}
            data-focusindex={props.tabIndex ?? 0}
            style={props.styles}
        >
            {props.adjustable && (
                <FilterSelector
                    ariaLabel={props.screenReaderButtonCaption}
                    defaultFilter={props.defaultFilter}
                    id={props.id}
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
                            { value: "between", label: "Between" },
                            { value: "greater", label: "Greater than" },
                            { value: "greaterEqual", label: "Greater than or equal" },
                            { value: "equal", label: "Equal" },
                            { value: "notEqual", label: "Not equal" },
                            { value: "smaller", label: "Smaller than" },
                            { value: "smallerEqual", label: "Smaller than or equal" }
                        ] as Array<{ value: DefaultFilterEnum; label: string }>
                    }
                />
            )}
            <DatePicker
                adjustable={props.adjustable}
                calendarStartDay={props.calendarStartDay}
                dateFormat={props.dateFormat}
                enableRange={type === "between"}
                locale={props.locale}
                id={props.id}
                placeholder={props.placeholder}
                rangeValues={rangeValues}
                ref={pickerRef}
                screenReaderCalendarCaption={props.screenReaderCalendarCaption}
                screenReaderInputCaption={props.screenReaderInputCaption}
                setRangeValues={setRangeValues}
                setValue={setValue}
                value={value}
            />
        </div>
    );
}

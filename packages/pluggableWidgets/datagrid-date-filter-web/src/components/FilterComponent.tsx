import { createElement, Dispatch, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { FilterSelector } from "./FilterSelector";
import { ListAttributeValue, ObjectItem } from "mendix";
import { DefaultFilterEnum } from "../../typings/DatagridDateFilterProps";
import { isValid, isDate } from "date-fns";

import { changeTimeOfDate } from "../utils/utils";
import DatePickerComponent from "react-datepicker";
import { DatePicker } from "./DatePicker";

interface FilterComponentProps {
    adjustable: boolean;
    defaultFilter: DefaultFilterEnum;
    defaultValue?: Date;
    dateFormat?: string;
    filterDispatcher: Dispatch<{ filter(item: ObjectItem, attribute: ListAttributeValue): boolean }>;
    locale?: string;
    name?: string;
    placeholder?: string;
    screenReaderButtonCaption?: string;
    screenReaderInputCaption?: string;
    tabIndex?: number;
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
        props.filterDispatcher({
            filter: (item, attr): any => {
                const dateValue = attr(item).value as Date;

                if (!value) {
                    return true;
                }

                if (!dateValue || !isDate(dateValue) || !isValid(dateValue)) {
                    return false;
                }

                const utcDateValue = dateValue.getTime();

                switch (type) {
                    case "greater":
                        return utcDateValue > changeTimeOfDate(value, 23, 59, 59).getTime();
                    case "greaterEqual":
                        return utcDateValue >= changeTimeOfDate(value, 0, 0, 0).getTime();
                    case "equal":
                        return (
                            changeTimeOfDate(dateValue, 0, 0, 0).getTime() ===
                            changeTimeOfDate(value, 0, 0, 0).getTime()
                        );
                    case "notEqual":
                        return (
                            changeTimeOfDate(dateValue, 0, 0, 0).getTime() !==
                            changeTimeOfDate(value, 0, 0, 0).getTime()
                        );
                    case "smaller":
                        return utcDateValue < changeTimeOfDate(value, 0, 0, 0).getTime();
                    case "smallerEqual":
                        return utcDateValue <= changeTimeOfDate(value, 23, 59, 59).getTime();
                }
            }
        });
    }, [props.filterDispatcher, value, type]);

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

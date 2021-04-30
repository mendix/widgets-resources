import { createElement, Dispatch, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { FilterSelector } from "./FilterSelector";
import { ListAttributeValue } from "mendix";
import {
    and,
    attribute,
    greaterThan,
    greaterThanOrEqual,
    lessThan,
    lessThanOrEqual,
    literal,
    or
} from "mendix/filters/builders";
import { DefaultFilterEnum } from "../../typings/DatagridDateFilterProps";

import { chanteTimeToMidnight } from "../utils/utils";
import DatePickerComponent from "react-datepicker";
import { DatePicker } from "./DatePicker";
import { FilterFunction } from "../utils/provider";
import { addDays, subDays } from "date-fns";

interface FilterComponentProps {
    adjustable: boolean;
    attribute?: ListAttributeValue;
    defaultFilter: DefaultFilterEnum;
    defaultValue?: Date;
    dateFormat?: string;
    filterDispatcher: Dispatch<FilterFunction>;
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
            getFilterCondition: () => {
                if (!props.attribute || !props.attribute.filterable || !value) {
                    return undefined;
                }

                const filterAttribute = attribute(props.attribute.id);

                switch (type) {
                    case "greater":
                        // > Date at midnight
                        return greaterThan(filterAttribute, literal(chanteTimeToMidnight(value)));
                    case "greaterEqual":
                        // > day -1 at midnight
                        return greaterThan(filterAttribute, literal(subDays(chanteTimeToMidnight(value), 1)));
                    case "equal":
                        // >= day at midnight and < day +1 midnight
                        return and(
                            greaterThanOrEqual(filterAttribute, literal(chanteTimeToMidnight(value))),
                            lessThan(filterAttribute, literal(addDays(chanteTimeToMidnight(value), 1)))
                        );
                    case "notEqual":
                        // < day at midnight or >= day +1 at midnight
                        return or(
                            lessThan(filterAttribute, literal(chanteTimeToMidnight(value))),
                            greaterThanOrEqual(filterAttribute, literal(addDays(chanteTimeToMidnight(value), 1)))
                        );
                    case "smaller":
                        // <= day -1 at midnight
                        return lessThanOrEqual(filterAttribute, literal(subDays(chanteTimeToMidnight(value), 1)));
                    case "smallerEqual":
                        // < day +1 at midnight
                        return lessThan(filterAttribute, literal(addDays(chanteTimeToMidnight(value), 1)));
                }
            }
        });
    }, [props.attribute, props.filterDispatcher, value, type]);

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

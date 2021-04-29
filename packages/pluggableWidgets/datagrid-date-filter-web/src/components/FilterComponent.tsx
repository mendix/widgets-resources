import { createElement, Dispatch, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { FilterSelector } from "./FilterSelector";
import { ListAttributeValue } from "mendix";
import { FilterCondition } from "mendix/filters";
import {
    and,
    attribute,
    greaterThan,
    greaterThanOrEqual,
    lessThan,
    lessThanOrEqual,
    literal
} from "mendix/filters/builders";
import { DefaultFilterEnum } from "../../typings/DatagridDateFilterProps";

import { changeTimeOfDate } from "../utils/utils";
import DatePickerComponent from "react-datepicker";
import { DatePicker } from "./DatePicker";

interface FilterComponentProps {
    adjustable: boolean;
    defaultFilter: DefaultFilterEnum;
    defaultValue?: Date;
    dateFormat?: string;
    filterDispatcher: Dispatch<{ getFilterCondition(attribute: ListAttributeValue): FilterCondition | undefined }>;
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
            getFilterCondition: attr => {
                if (!attr.filterable || !value) {
                    return undefined;
                }

                const filterAttribute = attribute(attr.id);

                switch (type) {
                    case "greater":
                        return greaterThan(filterAttribute, literal(changeTimeOfDate(value, 23, 59, 59)));
                    case "greaterEqual":
                        return greaterThanOrEqual(filterAttribute, literal(changeTimeOfDate(value, 0, 0, 0)));
                    case "equal":
                        return and(
                            greaterThanOrEqual(filterAttribute, literal(changeTimeOfDate(value, 0, 0, 0))),
                            lessThanOrEqual(filterAttribute, literal(changeTimeOfDate(value, 23, 59, 59)))
                        );
                    case "notEqual":
                        return and(
                            lessThan(filterAttribute, literal(changeTimeOfDate(value, 0, 0, 0))),
                            greaterThan(filterAttribute, literal(changeTimeOfDate(value, 23, 59, 59)))
                        );
                    case "smaller":
                        return lessThan(filterAttribute, literal(changeTimeOfDate(value, 0, 0, 0)));
                    case "smallerEqual":
                        return lessThanOrEqual(filterAttribute, literal(changeTimeOfDate(value, 23, 59, 59)));
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

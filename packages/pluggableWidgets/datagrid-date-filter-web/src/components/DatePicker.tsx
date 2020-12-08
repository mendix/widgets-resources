import { createElement, Dispatch, Fragment, MutableRefObject, ReactElement, SetStateAction, useState } from "react";
import DatePickerComponent from "react-datepicker";
import classNames from "classnames";
import { isDate, isValid } from "date-fns";

interface DatePickerProps {
    adjustable: boolean;
    dateFormat?: string;
    locale?: string;
    name?: string;
    placeholder?: string;
    screenReaderInputCaption?: string;
    setValue: Dispatch<SetStateAction<Date | null>>;
    value: Date | null;
    ref?: MutableRefObject<DatePickerComponent | null>;
}

export function DatePicker(props: DatePickerProps): ReactElement {
    const [open, setOpen] = useState(false);
    return (
        <Fragment>
            <span className="sr-only" id={`${props.name}-label`}>
                {props.screenReaderInputCaption}
            </span>
            <DatePickerComponent
                allowSameDay={false}
                ariaLabelledBy={`${props.name}-label`}
                autoFocus={false}
                className={classNames("form-control", { "filter-input": props.adjustable })}
                dateFormat={props.dateFormat}
                disabledKeyboardNavigation={false}
                dropdownMode="select"
                locale={props.locale}
                onChange={date => {
                    if (isDate(date) && isValid(date)) {
                        props.setValue(date as Date);
                    } else {
                        props.setValue(null);
                    }
                }}
                open={open}
                onClickOutside={() => setOpen(false)}
                placeholderText={props.placeholder}
                popperPlacement="bottom-start"
                popperModifiers={{
                    offset: {
                        enabled: true,
                        offset: "0, 0"
                    },
                    preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: "viewport"
                    },
                    flip: {
                        enabled: false
                    }
                }}
                preventOpenOnFocus
                ref={props.ref}
                selected={props.value}
                shouldCloseOnSelect={false}
                showMonthDropdown
                showPopperArrow={false}
                showYearDropdown
                strictParsing
                useWeekdaysShort
            />
            <button className="btn btn-default btn-calendar" onClick={() => setOpen(true)}>
                <span className="glyphicon glyphicon-calendar" />
            </button>
        </Fragment>
    );
}

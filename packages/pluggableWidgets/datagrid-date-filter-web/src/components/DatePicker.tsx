import {
    createElement,
    Dispatch,
    forwardRef,
    Fragment,
    MutableRefObject,
    ReactElement,
    SetStateAction,
    useRef,
    useState
} from "react";
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
}

export const DatePicker = forwardRef(
    (props: DatePickerProps, ref: MutableRefObject<DatePickerComponent> | null): ReactElement => {
        const [open, setOpen] = useState(false);
        const buttonRef = useRef<HTMLButtonElement>(null);
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
                    onClickOutside={event => {
                        if (!buttonRef.current || buttonRef.current.contains(event.target as Node)) {
                            return;
                        }
                        setOpen(false);
                    }}
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
                    ref={ref}
                    selected={props.value}
                    shouldCloseOnSelect={false}
                    showMonthDropdown
                    showPopperArrow={false}
                    showYearDropdown
                    strictParsing
                    useWeekdaysShort
                />
                <button ref={buttonRef} className="btn btn-default btn-calendar" onClick={() => setOpen(prev => !prev)}>
                    <span className="glyphicon glyphicon-calendar" />
                </button>
            </Fragment>
        );
    }
);

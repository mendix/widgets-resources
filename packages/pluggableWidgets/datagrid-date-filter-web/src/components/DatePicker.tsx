import {
    createElement,
    Dispatch,
    forwardRef,
    Fragment,
    MutableRefObject,
    ReactElement,
    SetStateAction,
    useCallback,
    useMemo,
    useRef,
    useState
} from "react";
import DatePickerComponent from "react-datepicker";
import classNames from "classnames";
import { isDate, isValid } from "date-fns";
import { createPortal } from "react-dom";

interface DatePickerProps {
    adjustable: boolean;
    dateFormat?: string;
    locale?: string;
    id?: string;
    placeholder?: string;
    screenReaderCalendarCaption?: string;
    screenReaderInputCaption?: string;
    setValue: Dispatch<SetStateAction<Date | null>>;
    value: Date | null;
}

export const DatePicker = forwardRef(
    (props: DatePickerProps, ref: MutableRefObject<DatePickerComponent> | null): ReactElement => {
        const [open, setOpen] = useState(false);
        const buttonRef = useRef<HTMLButtonElement>(null);
        const portalRef = useRef<HTMLDivElement>(null);
        const id = useMemo(() => `datepicker_` + Math.random(), []);
        const Portal = createPortal(<div ref={portalRef} id={id} style={{ position: "fixed" }} />, document.body);

        const buttonClick = useCallback(() => {
            setOpen(open => !open);
            setTimeout(() => {
                (portalRef.current?.querySelector(".react-datepicker > button") as HTMLElement)?.focus();
            }, 10);
        }, []);

        return (
            <Fragment>
                {Portal}
                <span className="sr-only" id={`${props.id}-label`}>
                    {props.screenReaderInputCaption}
                </span>
                <DatePickerComponent
                    allowSameDay={false}
                    ariaLabelledBy={`${props.id}-label`}
                    autoFocus={false}
                    className={classNames("form-control", { "filter-input": props.adjustable })}
                    dateFormat={props.dateFormat}
                    disabledKeyboardNavigation={false}
                    dropdownMode="select"
                    enableTabLoop
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
                    popperPlacement="bottom-end"
                    popperModifiers={[
                        {
                            name: "offset",
                            options: {
                                offset: [0, 0]
                            }
                        }
                    ]}
                    preventOpenOnFocus
                    ref={ref}
                    selected={props.value}
                    shouldCloseOnSelect={false}
                    showMonthDropdown
                    showPopperArrow={false}
                    showYearDropdown
                    strictParsing
                    useWeekdaysShort
                    portalId={id}
                />
                <button
                    aria-controls={id}
                    aria-expanded={open}
                    aria-haspopup
                    aria-label={props.screenReaderCalendarCaption ?? "Show calendar"}
                    ref={buttonRef}
                    className="btn btn-default btn-calendar"
                    onClick={buttonClick}
                    onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            buttonClick();
                        }
                    }}
                >
                    <span className="glyphicon glyphicon-calendar" />
                </button>
            </Fragment>
        );
    }
);

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
import replaceAllInserter from "string.prototype.replaceall";
import { doubleMonthOrDayWhenSingle } from "../utils/utils";

export type RangeDateValue = [Date | undefined, Date | undefined];

interface DatePickerProps {
    adjustable: boolean;
    dateFormat?: string;
    disabledInput?: boolean;
    enableRange?: boolean;
    locale?: string;
    id?: string;
    placeholder?: string;
    setRangeValues?: Dispatch<SetStateAction<RangeDateValue>>;
    rangeValues?: RangeDateValue;
    screenReaderCalendarCaption?: string;
    screenReaderInputCaption?: string;
    setValue: Dispatch<SetStateAction<Date | undefined>>;
    value?: Date;
    calendarStartDay?: number;
}

replaceAllInserter.shim();

export const DatePicker = forwardRef(
    (props: DatePickerProps, ref: MutableRefObject<DatePickerComponent> | null): ReactElement => {
        const [open, setOpen] = useState(false);
        const buttonRef = useRef<HTMLButtonElement>(null);
        const portalRef = useRef<HTMLDivElement>(null);
        const id = useMemo(() => `datepicker_` + Math.random(), []);
        const Portal = createPortal(
            <div ref={portalRef} id={id} className="date-filter-container" style={{ position: "fixed" }} />,
            document.body
        );

        const buttonClick = useCallback(() => {
            setOpen(open => !open);
            setTimeout(() => {
                (portalRef.current?.querySelector(".react-datepicker > button") as HTMLElement)?.focus();
            }, 10);
        }, []);

        let dateFormats;
        if (props.dateFormat) {
            // Replace with full patterns d -> dd, M -> MM
            const fixedFormatString = doubleMonthOrDayWhenSingle(props.dateFormat);
            dateFormats =
                props.dateFormat !== fixedFormatString ? [props.dateFormat, fixedFormatString] : [props.dateFormat];
        }

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
                    calendarStartDay={props.calendarStartDay}
                    className={classNames("form-control", { "filter-input": props.adjustable })}
                    dateFormat={dateFormats}
                    disabled={props.disabledInput ?? false}
                    disabledKeyboardNavigation={false}
                    dropdownMode="select"
                    enableTabLoop
                    endDate={props.enableRange ? props.rangeValues?.[1] : undefined}
                    isClearable={props.enableRange}
                    locale={props.locale}
                    onChange={date => {
                        if (Array.isArray(date)) {
                            const [startDate, endDate] = date;
                            props.setRangeValues?.([startDate ?? undefined, endDate ?? undefined]);
                            props.setValue(undefined);
                        } else {
                            if (isDate(date) && isValid(date)) {
                                props.setValue(date as Date);
                            } else {
                                props.setValue(undefined);
                            }
                            props.setRangeValues?.([undefined, undefined]);
                        }
                    }}
                    onClickOutside={event => {
                        if (!buttonRef.current || buttonRef.current.contains(event.target as Node)) {
                            return;
                        }
                        setOpen(false);
                    }}
                    open={open}
                    onInputClick={() => setOpen(true)}
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
                    portalId={id}
                    preventOpenOnFocus
                    readOnly={props.enableRange}
                    ref={ref}
                    startDate={props.enableRange ? props.rangeValues?.[0] : undefined}
                    selected={props.enableRange ? undefined : props.value}
                    selectsRange={props.enableRange}
                    shouldCloseOnSelect={false}
                    showMonthDropdown
                    showPopperArrow={false}
                    showYearDropdown
                    strictParsing
                    useWeekdaysShort={false}
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

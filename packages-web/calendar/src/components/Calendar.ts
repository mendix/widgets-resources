import { CSSProperties, Component, ReactChild, createElement } from "react";

import { Alert } from "./Alert";
import { Container, Style } from "../utils/namespaces";
import * as classNames from "classnames";
import * as BigCalendar from "react-big-calendar";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import * as globalize from "globalize";
import localizer from "react-big-calendar/lib/localizers/globalize";
import * as withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../ui/Calendar.scss";

localizer(globalize);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

export interface CalendarProps {
    alertMessage: ReactChild;
    className?: string;
    events: CalendarEvent[];
    color: string;
    height: number;
    heightUnit: Style.HeightUnitType;
    loading?: boolean;
    showMultiDayTimes?: boolean;
    defaultView: Style.View;
    startPosition: Date;
    firstDay?: number;
    messages: Container.CustomViews[];
    popup: boolean;
    selectable: boolean;
    dayFormat?: string;
    weekdayFormat?: string;
    timeGutterFormat?: string;
    monthHeaderFormat?: string;
    dayHeaderFormat?: string;
    style: object;
    views?: string;
    width: number;
    widthUnit: Style.WidthUnitType;
    onSelectEventAction?: (eventInfo: object) => void;
    onEventResizeAction?: (eventInfo: any) => void;
    onSelectSlotAction?: (slotInfo: object) => void;
    onEventDropAction?: (eventInfo: object) => void;
}

export interface CalendarEvent {
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
    guid: string;
    color: string;
}

interface CalendarState {
    events?: CalendarEvent[];
    color?: string;
}

class Calendar extends Component<CalendarProps, CalendarState> {
    state: CalendarState = { events: this.props.events };

    componentWillMount() {
        globalize().cultures.default.calendars.standard.firstDay = window.mx.session.sessionData.locale.firstDayOfWeek;
    }

    render() {
        return createElement("div", { className: classNames("widget-calendar", this.props.className), style: this.getDimensions() },
            createElement(DragAndDropCalendar, {
                events: this.props.events,
                allDayAccessor: this.allDayAccessor,
                eventPropGetter: (events: any) => {
                    return { style: { backgroundColor: events.color } };
                },
                defaultDate: this.props.startPosition,
                defaultView: this.props.defaultView,
                formats: {
                    dayFormat: this.dayFormat,
                    weekdayFormat: this.weekdayFormat,
                    timeGutterFormat: this.timeGutterFormat,
                    monthHeaderFormat: this.monthHeaderFormat,
                    dayHeaderFormat: this.dayHeaderFormat
                },
                messages: this.props.views === "custom" ? this.props.messages : "",
                views: this.props.views === "standard"
                    ? [ "day", "week", "month" ]
                    : Object.keys(this.props.messages),
                popup: this.props.popup,
                selectable: this.props.selectable,
                step: 60,
                showMultiDayTimes: true,
                onEventDrop: this.onEventDrop,
                onEventResize: this.onEventResize,
                onSelectEvent: this.onSelectEvent,
                onSelectSlot: this.onSelectSlot
            }),
            createElement(Alert, { className: "widget-calendar-alert" }, this.props.alertMessage)
        );
    }

    componentWillReceiveProps(newProps: CalendarProps) {
        if (this.state.events !== newProps.events) {
            this.setState({ events: newProps.events });
        }
    }

    private getDimensions = (): CSSProperties => {
        const style: CSSProperties = {
            width: this.props.widthUnit === "percentage" ? `${this.props.width}%` : `${this.props.width}px`
        };
        if (this.props.heightUnit === "percentageOfWidth") {
            style.paddingBottom = this.props.widthUnit === "percentage"
                ? `${this.props.height}%`
                : `${this.props.width / 2}px`;
        } else if (this.props.heightUnit === "pixels") {
            style.height = `${this.props.height}px`;
        } else if (this.props.heightUnit === "percentageOfParent") {
            style.height = `${this.props.height}%`;
        }

        return style;
    }

    private allDayAccessor = (event: any) => {
        return event.allDay;
    }

    private dayFormat = (date: Date) => {
        const dayFormat = this.props.dayFormat || "EEEE dd/MM";

        return mx.parser.formatValue(date, "dateTime", { datePattern: dayFormat });
    }

    private weekdayFormat = (date: Date) => {
        const weekdayFormat = this.props.weekdayFormat || "EEEE";

        return mx.parser.formatValue(date, "dateTime", { datePattern: weekdayFormat });
    }

    private timeGutterFormat = (date: Date) => {
        const timeGutterFormat = this.props.timeGutterFormat || "hh:mm a";

        return mx.parser.formatValue(date, "dateTime", { datePattern: timeGutterFormat });
    }

    private monthHeaderFormat = (date: Date) => {
        const monthHeaderFormat = this.props.monthHeaderFormat || "MMMM yyyy";

        return mx.parser.formatValue(date, "dateTime", { datePattern: monthHeaderFormat });
    }

    private dayHeaderFormat = (date: Date) => {
        const dayHeaderFormat = this.props.dayHeaderFormat || "EEE yyyy/MM/dd";

        return mx.parser.formatValue(date, "dateTime", { datePattern: dayHeaderFormat });
    }

    private onEventDrop = (eventInfo: any) => {
        if (eventInfo.start.getDate() !== eventInfo.event.start.getDate() && this.props.selectable) {
            if (this.props.onEventDropAction) { this.props.onEventDropAction(eventInfo); }
        }
    }

    private onEventResize = (_resizeType: string, eventInfo: any) => {
        if (eventInfo.start.getDate() !== eventInfo.event.start.getDate() && this.props.selectable) {
            if (this.props.onEventResizeAction) { this.props.onEventResizeAction(eventInfo); }
        }
    }

    private onSelectEvent = (eventInfo: object) => {
        if (this.props.onSelectEventAction) { this.props.onSelectEventAction(eventInfo); }
    }

    private onSelectSlot = (slotInfo: object) => {
        if (this.props.onSelectSlotAction) { this.props.onSelectSlotAction(slotInfo); }
    }
}

const CalendarDnD = DragDropContext(HTML5Backend)(Calendar);

export { CalendarDnD as Calendar };

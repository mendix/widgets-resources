import { Component, ReactChild, createElement } from "react";

import { Alert } from "./Alert";
import * as BigCalendar from "react-big-calendar";
import { CalendarLoading } from "./CalendarLoading";
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
    alertMessage?: ReactChild;
    events?: CalendarEvent[];
    color: string;
    customCaption?: string;
    customViews?: { customView: string, customCaption: string }[];
    loading?: boolean;
    showMultiDayTimes?: boolean;
    defaultView: View;
    startPosition: Date;
    firstDay?: number;
    popup: boolean;
    selectable: boolean;
    dayFormat?: string;
    weekdayFormat?: string;
    timeGutterFormat?: string;
    monthHeaderFormat?: string;
    dayHeaderFormat?: string;
    onSelectEventAction?: (eventInfo: object) => void;
    onSelectSlotAction?: (slotInfo: object) => void;
    onEventDropAction?: (eventInfo: object) => void;
}

export type View = "month" | "week" | "work_week" | "day" | "agenda";

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

    render() {
        if (this.props.alertMessage) {
            return createElement(Alert, { className: "widget-calendar-alert" }, this.props.alertMessage);
        }
        if (this.props.loading) {
            return createElement(CalendarLoading);
        }
        globalize().cultures.default.calendars.standard.firstDay = window.mx.session.sessionData.locale.firstDayOfWeek;

        return createElement("div", { className: ("widget-calendar") },
            createElement(DragAndDropCalendar, {
                events: this.props.events,
                allDayAccessor: this.allDayAccessor,
                eventPropGetter: (events: any) => {
                    return { style: { backgroundColor: events.color } };
                },
                defaultDate: this.props.startPosition,
                defaultView: this.props.defaultView,
                // formats: {
                //     dayFormat: this.dayFormat,
                //     weekdayFormat: this.weekdayFormat,
                //     timeGutterFormat: this.timeGutterFormat,
                //     monthHeaderFormat: this.monthHeaderFormat,
                //     dayHeaderFormat: this.dayHeaderFormat
                // },
                messages: {
                    month: "month",
                    week: "Wiki",
                    work_week: "Enaku zokukola",
                    day: "olunaku",
                    agenda: "Pulogram"
                },
                views: [ "month", "week", "work_week", "day", "agenda" ],
                popup: this.props.popup,
                selectable: this.props.selectable,
                step: 60,
                showMultiDayTimes: true,
                onEventDrop: this.onEventDrop,
                onSelectEvent: this.onSelectEvent,
                onSelectSlot: this.onSelectSlot
            })
        );
    }

    componentWillReceiveProps(newProps: CalendarProps) {
        if (this.state.events !== newProps.events) {
            this.setState({ events: newProps.events });
        }
    }

    private allDayAccessor = (event: any) => {
        return event.allDay;
    }

    // private dayFormat = (date: Date) => {
    //     const dayFormat = this.props.dayFormat || "EEEE dd/MM";

    //     return mx.parser.formatValue(date, "dateTime", { datePattern: dayFormat });
    // }

    // private weekdayFormat = (date: Date) => {
    //     const weekdayFormat = this.props.weekdayFormat || "EEEE";

    //     return mx.parser.formatValue(date, "dateTime", { datePattern: weekdayFormat });
    // }

    // private timeGutterFormat = (date: Date) => {
    //     const timeGutterFormat = this.props.timeGutterFormat || "hh:mm a";

    //     return mx.parser.formatValue(date, "dateTime", { datePattern: timeGutterFormat });
    // }

    // private monthHeaderFormat = (date: Date) => {
    //     const monthHeaderFormat = this.props.monthHeaderFormat || "MMMM yyyy";

    //     return mx.parser.formatValue(date, "dateTime", { datePattern: monthHeaderFormat });
    // }

    // private dayHeaderFormat = (date: Date) => {
    //     const dayHeaderFormat = this.props.dayHeaderFormat || "EEE yyyy/MM/dd";

    //     return mx.parser.formatValue(date, "dateTime", { datePattern: dayHeaderFormat });
    // }

    private onEventDrop = (eventInfo: any) => {
        if (eventInfo.start !== eventInfo.event.start) {
        if (this.props.onEventDropAction) { this.props.onEventDropAction(eventInfo); }
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

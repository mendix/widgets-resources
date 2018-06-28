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
    loading?: boolean;
    showMultiDayTimes?: boolean;
    defaultView: View;
    startPosition: Date;
    popup: boolean;
    selectable: boolean;
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

        return createElement("div", { className: ("widget-calendar") },
            createElement(DragAndDropCalendar, {
                events: this.props.events,
                eventPropGetter: (events: any) => {
                    return { style: { backgroundColor: events.color } };
                },
                defaultDate: this.props.startPosition,
                defaultView: this.props.defaultView,
                views: [ "month", "week", "work_week", "day", "agenda" ],
                popup: this.props.popup,
                selectable: this.props.selectable,
                showMultiDayTimes: true,
                onEventDrop:  this.onEventDrop,
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

    private onEventDrop = (eventInfo: object) => {
        if (this.props.onEventDropAction) { this.props.onEventDropAction(eventInfo); }
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

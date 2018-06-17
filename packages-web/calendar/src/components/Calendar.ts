import { Component, createElement } from "react";
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
    events?: CalendarEvent[];
    showMultiDayTimes?: boolean;
    defaultDate: Date;
    defaultView: View;
    popup: boolean;
    selectable: boolean;
    onSelectEventAction: (eventInfo: any) => void;
    onSelectSlotAction: (slotInfo: any) => void;
    onEventDropAction: (eventInfo: any) => void;
}

export type View = "month" | "week" | "day" | "agenda";

export interface CalendarEvent {
    title: string;
    start: Date;
    end: Date;
    guid: string;
}

interface CalendarState {
    events?: CalendarEvent[];
}

class Calendar extends Component<CalendarProps, CalendarState> {

    constructor(props: CalendarProps) {
        super(props);

        this.state = { events: this.props.events };
    }

    render() {
        return createElement("div", { className: classNames("widget-calendar") },
            createElement(DragAndDropCalendar, {
                events: this.props.events,
                defaultDate: new Date(),
                defaultView: this.props.defaultView,
                popup: this.props.popup,
                selectable: this.props.selectable,
                showMultiDayTimes: true,
                onEventDrop: (eventInfo: any) => this.props.onEventDropAction(eventInfo),
                onSelectEvent: (eventInfo: any) => this.props.onSelectEventAction(eventInfo),
                onSelectSlot: (slotInfo: {}) => this.props.onSelectSlotAction(slotInfo)
            })
        );
    }

    componentWillReceiveProps(newProps: CalendarProps) {
        if (this.state.events !== newProps.events) {
            this.setState({
                events: newProps.events
            });
        }
    }
}

const CalendarDnD = DragDropContext(HTML5Backend)(Calendar);

export { CalendarDnD as Calendar };

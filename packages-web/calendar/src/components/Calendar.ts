import { Component, createElement } from "react";

import * as classNames from "classnames";
import * as BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import localizer from "react-big-calendar/lib/localizers/globalize";
import * as globalize from "globalize";

import "../ui/Calendar.scss";

localizer(globalize);

export interface CalendarProps {
    events?: CalendarEvent[];
    step?: number;
    showMultiDayTimes?: boolean;
    defaultDate?: Date;
    defaultView?: string;
    popup?: boolean;
    onSelectEventAction: () => void;
    onSelectSlotAction: () => void;
}

export interface CalendarEvent {
    title: string;
    start: Date;
    end: Date;
    guid: string;
}

interface CalendarState {
    events?: CalendarEvent[];
}

export class Calendar extends Component<CalendarProps, CalendarState> {

    constructor(props: CalendarProps) {
        super(props);

        this.state = { events: this.props.events };
    }

    render() {
        return createElement("div", { className: classNames("widget-calendar") },
            createElement(BigCalendar, {
                events: this.props.events,
                step: 60,
                selectable: true,
                showMultiDayTimes: true,
                defaultDate: new Date(),
                defaultView: this.props.defaultView,
                popup: this.props.popup,
                onSelectEvent: () => this.props.onSelectEventAction(),
                onSelectSlot: () => this.props.onSelectSlotAction()
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

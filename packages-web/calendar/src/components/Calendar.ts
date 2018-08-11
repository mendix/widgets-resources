import { CSSProperties, Component, ReactChild, createElement } from "react";

import { Alert } from "./Alert";
import { Style } from "../utils/namespaces";
import * as classNames from "classnames";
import * as BigCalendar from "react-big-calendar";
import * as moment from "moment";
import * as withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CustomToolbar from "./Toolbar";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../ui/Calendar.scss";

BigCalendar.momentLocalizer(moment);
export const DragAndDropCalendar = withDragAndDrop(BigCalendar);

export interface CalendarProps {
    alertMessage?: ReactChild;
    className?: string;
    events: CalendarEvent[];
    color?: string;
    formats: {};
    dragAndDrop: boolean;
    height: number;
    heightUnit: Style.HeightUnitType;
    loading?: boolean;
    showMultiDayTimes?: boolean;
    defaultView: Style.View;
    startPosition?: Date;
    messages: {};
    popup: boolean;
    editable: string;
    titleFormat?: (date: Date) => void;
    weekdayFormat?: (date: Date) => void;
    timeGutterFormat?: (date: Date) => void;
    monthHeaderFormat?: (date: Date) => void;
    dayHeaderFormat?: (date: Date) => void;
    style: object;
    views?: string;
    width: number;
    widthUnit: Style.WidthUnitType;
    onSelectEventAction?: (eventInfo: object) => void;
    onEventResizeAction?: (eventInfo: any) => void;
    onSelectSlotAction?: (slotInfo: object) => void;
    onEventDropAction?: (eventInfo: object) => void;
    onViewChangeAction?: () => void;
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

    render() {
        return createElement("div", { className: classNames("widget-calendar", this.props.className), style: this.getDimensions() },
            createElement(Alert, { className: "widget-calendar-alert" }, this.props.alertMessage),
            this.renderCalendar()
        );
    }

    componentWillReceiveProps(newProps: CalendarProps) {
        if (this.state.events !== newProps.events) {
            this.setState({ events: newProps.events });
        }
    }

    private renderCalendar() {
        const props = {
            events: this.props.events,
            allDayAccessor: this.allDayAccessor,
            components: { toolbar: CustomToolbar },
            eventPropGetter: this.eventColor,
            defaultDate: this.props.startPosition,
            defaultView: this.props.defaultView,
            formats: this.props.views === "custom" ? this.props.formats : "",
            messages: this.props.views === "custom" ? this.props.messages : "",
            views: this.props.views === "standard"
                ? [ "day", "week", "month" ]
                : Object.keys(this.props.messages),
            popup: this.props.popup,
            selectable: this.props.dragAndDrop,
            step: 60,
            showMultiDayTimes: true,
            onSelectEvent: this.onSelectEvent,
            onSelectSlot: this.onSelectSlot,
            onView: this.onViewChange
        };

        if (this.props.dragAndDrop && this.props.editable === "default") {
            return createElement(DragAndDropCalendar, {
                ...props,
                onEventDrop: this.onEventDrop,
                onEventResize: this.onEventResize
            });
        } else {
            return createElement(BigCalendar, { ...props });
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

    private allDayAccessor = (event: any) => event.allDay;

    private eventColor = (events: any) => ({ style: { backgroundColor: events.color } });

    private onEventDrop = (eventInfo: any) => {
        if (eventInfo.start.getDate() !== eventInfo.event.start.getDate() && this.props.editable === "default" && this.props.onEventDropAction) {
            this.props.onEventDropAction(eventInfo);
        }
    }

    private onEventResize = (_resizeType: string, eventInfo: any) => {
        if (eventInfo.end.getDate() !== eventInfo.event.end.getDate() && this.props.editable && this.props.onEventResizeAction) {
            this.props.onEventResizeAction(eventInfo);
        }
    }

    private onSelectEvent = (eventInfo: object) => {
        if (this.props.onSelectEventAction) { this.props.onSelectEventAction(eventInfo); }
    }

    private onSelectSlot = (slotInfo: object) => {
        if (this.props.onSelectSlotAction) { this.props.onSelectSlotAction(slotInfo); }
    }

    private onViewChange = () => {
        if (this.props.onViewChangeAction) { this.props.onViewChangeAction(); }
    }
}

export { Calendar as Calendar, Calendar as MyCalendar };

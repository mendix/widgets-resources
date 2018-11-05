import { CSSProperties, Component, ReactChild, createElement } from "react";

import { Alert } from "./Alert";
import { Container, Style } from "../utils/namespaces";
import * as classNames from "classnames";
import * as BigCalendar from "react-big-calendar";
import * as moment from "moment";
import * as withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CustomToolbar from "./Toolbar";
import { CalendarLoader } from "./CalendarLoader";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../ui/Calendar.scss";
import "../ui/CalendarLoader.scss";

BigCalendar.momentLocalizer(moment);
export const DragAndDropCalendar = withDragAndDrop(BigCalendar);

export interface CalendarProps {
    alertMessage?: ReactChild;
    className?: string;
    events: CalendarEvent[];
    color?: string;
    formats?: {};
    enableCreate: boolean;
    height: number;
    heightUnit: Style.HeightUnitType;
    defaultView: Style.View;
    loading?: boolean;
    startPosition?: Date;
    messages: {};
    popup: boolean;
    editable: string;
    titleFormat?: (date: Date) => void;
    weekdayFormat?: (date: Date) => void;
    timeGutterFormat?: (date: Date) => void;
    monthHeaderFormat?: (date: Date) => void;
    dayHeaderFormat?: (date: Date) => void;
    style: CSSProperties;
    viewOption: "custom" | "standard";
    width: number;
    widthUnit: Style.WidthUnitType;
    onRangeChangeAction?: (date: object) => void;
    onSelectEventAction?: (eventInfo: object) => void;
    onEventResizeAction?: (eventInfo: object) => void;
    onSelectSlotAction?: (slotInfo: object) => void;
    onEventDropAction?: (eventInfo: object) => void;
    customViews: Container.CustomViews[];
}

interface HOCToolbarProps {
    customViews: Container.CustomViews[] | Partial<Container.ButtonConfig>[];
    onClickToolbarButton: (date: object) => void;
}

export interface CalendarEvent {
    allDay: boolean;
    color: string;
    end: Date;
    guid: string;
    start: Date;
    title: string;
}

interface CalendarState {
    events?: CalendarEvent[];
    color?: string;
}

class Calendar extends Component<CalendarProps, CalendarState> {
    readonly state: CalendarState = { events: this.props.events };

    render() {
        return createElement("div", { className: classNames("widget-calendar", this.props.className), style: this.getDimensions() },
            this.renderAlert(),
            this.renderCalendar()
        );
    }

    componentWillReceiveProps(newProps: CalendarProps) {
        if (this.state.events !== newProps.events) {
            this.setState({ events: newProps.events });
        }
    }

    private getDefaultToolbar(): Partial<Container.ButtonConfig>[] {
        return [
            {
                customView: "previous",
                position: "left",
                buttonToolTip: "previous"
            },
            {
                customView: "today",
                position: "left",
                customCaption: "today"
            },
            {
                customView: "next",
                position: "left",
                buttonToolTip: "next"
            },
            {
                customView: "title",
                position: "center"
            },
            {
                customView: "day",
                position: "right",
                customCaption: "day"
            },
            {
                customView: "week",
                position: "right",
                customCaption: "week"
            },
            {
                customView: "month",
                position: "right",
                customCaption: "month"
            }
        ];
    }

    private renderAlert() {
        return createElement(Alert, { className: "widget-calendar-alert" }, this.props.alertMessage);
    }

    private renderCalendar() {
        const wrapToolbar = (injectedProps: HOCToolbarProps) =>
            (toolbarProps: Container.ToolbarProps) => createElement(CustomToolbar as any, { ...injectedProps, ...toolbarProps });

        const props = {
            events: this.props.events,
            allDayAccessor: this.allDayAccessor,
            components: { toolbar: wrapToolbar({ customViews: this.getToolbarProps(), onClickToolbarButton: this.onRangeChange }) },
            eventPropGetter: this.eventColor,
            defaultDate: this.props.startPosition,
            defaultView: this.defaultView(),
            formats: this.props.viewOption === "custom" ? this.props.formats : "",
            messages: this.props.viewOption === "custom" ? this.props.messages : "",
            popup: this.props.popup,
            selectable: this.props.enableCreate,
            step: 60,
            showMultiDayTimes: true,
            onRangeChange: this.onRangeChange,
            onSelectEvent: this.onSelectEvent,
            onSelectSlot: this.onSelectSlot,
            views: [ "month", "day", "week", "work_week", "month", "agenda" ]
        };

        if (this.props.loading) {
            return createElement(CalendarLoader);
        } else if (this.props.enableCreate && this.props.editable === "default") {
            return createElement(DragAndDropCalendar, {
                ...props,
                onEventDrop: this.onEventDrop,
                onEventResize: this.onEventResize
            });
        } else {
            return createElement(BigCalendar, props);
        }
    }

    private defaultView() {
        if (this.props.viewOption === "standard" && this.props.defaultView === "work_week" || this.props.defaultView === "agenda") {
            return "month";
        }

        return this.props.defaultView;
    }

    private getToolbarProps(): Partial<Container.ButtonConfig>[] {
        const toolbarProps = this.props.viewOption === "standard"
            ? this.getDefaultToolbar()
            : this.props.customViews;

        return toolbarProps.map(customView => ({ ...customView, onClickToolbarButton: this.onRangeChange }));
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

    private allDayAccessor = (event: Container.ViewOptions) => event.allDay;

    private eventColor = (events: CalendarEvent) => ({ style: { backgroundColor: events.color } });

    private onRangeChange = (date: object) => {
        if (this.props.onRangeChangeAction && date) {
            this.props.onRangeChangeAction(date);
        }
    }

    private onEventDrop = (eventInfo: Container.EventInfo) => {
        if (eventInfo.start.getDate() !== eventInfo.event.start.getDate() && this.props.editable === "default" && this.props.onEventDropAction) {
            this.props.onEventDropAction(eventInfo);
        }
    }

    private onEventResize = (_resizeType: string, eventInfo: Container.EventInfo) => {
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
}

export { Calendar as Calendar, Calendar as MyCalendar };

import { Component, createElement, ReactNode } from "react";

import { Calendar, CalendarProps } from "./components/Calendar";
import { Container } from "./utils/namespaces";
import { validateProps } from "./utils/validation";
import { parseStyle } from "./utils/style";

declare function require(name: string): string;

export class preview extends Component<Container.CalendarContainerProps> {
    render(): ReactNode {
        return createElement(Calendar, this.transformProps(this.props));
    }

    private transformProps(props: Container.CalendarContainerProps): CalendarProps {
        const eventData = [
            {
                title: "Leave",
                allDay: true,
                start: new Date(new Date().setDate(new Date().getDate() - 15)),
                end: new Date(new Date().setDate(new Date().getDate() - 7)),
                guid: "",
                color: ""
            },
            {
                title: "Leave",
                allDay: true,
                start: new Date(new Date().setDate(new Date().getDate() - 9)),
                end: new Date(new Date().setDate(new Date().getDate() - 5)),
                guid: "",
                color: "green"
            },
            {
                title: "BD",
                allDay: true,
                start: new Date(),
                end: new Date(),
                guid: "",
                color: "red"
            },
            {
                title: "Bank Holiday",
                allDay: true,
                start: new Date(new Date().valueOf() + 6000 * 3600 * 24),
                end: new Date(new Date().valueOf() + 9000 * 3600 * 24),
                guid: "",
                color: "grey"
            },
            {
                title: "Bank Holiday",
                allDay: true,
                start: new Date(new Date().valueOf() + 4000 * 3600 * 24),
                end: new Date(new Date().valueOf() + 8000 * 3600 * 24),
                guid: "",
                color: "purple"
            },
            {
                title: "Leave",
                allDay: true,
                start: new Date(new Date().valueOf() + 10000 * 3600 * 24),
                end: new Date(new Date().valueOf() + 14000 * 3600 * 24),
                guid: "",
                color: ""
            }
        ];
        const alertMessage = validateProps(this.props);

        return {
            alertMessage,
            color: props.eventColor,
            customViews: props.customViews,
            defaultView: props.defaultView,
            enableCreate: props.enableCreate,
            events: eventData,
            height: props.height,
            heightUnit: props.heightUnit,
            messages: [],
            startPosition: new Date(),
            popup: props.popup,
            editable: props.editable,
            style: parseStyle(props.style),
            viewOption: props.view,
            width: props.width,
            widthUnit: props.widthUnit
        };
    }
}

export function getVisibleProperties(
    valueMap: Container.CalendarContainerProps,
    visibilityMap: VisibilityMap<Container.CalendarContainerProps>
): VisibilityMap<Container.CalendarContainerProps> {
    visibilityMap.dataSourceMicroflow = valueMap.dataSource === "microflow";
    visibilityMap.entityConstraint = valueMap.dataSource === "XPath";
    visibilityMap.onClickMicroflow = valueMap.onClickEvent === "callMicroflow";
    visibilityMap.onClickNanoflow = valueMap.onClickEvent === "callNanoflow";
    if (valueMap.view === "standard") {
        visibilityMap.view = false;
    }
    if (valueMap.defaultView !== "agenda") {
        valueMap.customViews.forEach((_element, index) => {
            visibilityMap.customViews[index].allDayText = false;
            visibilityMap.customViews[index].textHeaderDate = false;
            visibilityMap.customViews[index].textHeaderTime = false;
            visibilityMap.customViews[index].textHeaderEvent = false;
            visibilityMap.customViews[index].gutterDateFormat = false;
        });
    }
    if (valueMap.defaultView === "agenda") {
        valueMap.customViews.forEach((_element, index) => {
            visibilityMap.customViews[index].headerFormat = false;
        });
    }
    if (valueMap.defaultView === "month") {
        valueMap.customViews.forEach((_element, index) => {
            visibilityMap.customViews[index].gutterTimeFormat = false;
        });
    }
    if (valueMap.defaultView !== "month") {
        valueMap.customViews.forEach((_element, index) => {
            visibilityMap.customViews[index].cellDateFormat = false;
        });
    }

    return visibilityMap;
}

export function getPreviewCss(): string {
    return require("./ui/Calendar.scss") + require("react-big-calendar/lib/css/react-big-calendar.css");
}

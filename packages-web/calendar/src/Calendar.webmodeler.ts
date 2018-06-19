import { Component, createElement } from "react";

import { Alert } from "./components/Alert";
import { Calendar, CalendarProps } from "./components/Calendar";
import CalendarContainer, { CalendarContainerProps } from "./components/CalendarContainer";

declare function require(name: string): string;
type VisibilityMap = {
    [P in keyof CalendarContainerProps]: boolean;
};

// tslint:disable-next-line class-name
export class preview extends Component<CalendarContainerProps, {}> {
    render() {
        const message = CalendarContainer.validateProps(this.props);
        return createElement("div", {},
            createElement(Alert, { bootstrapStyle: "danger", message, className: "widget-calendar-alert" }),
            createElement(Calendar, preview.transformProps(this.props))
        );
    }

    private static transformProps(props: CalendarContainerProps): CalendarProps {
        const eventData = [ {
            title: "Leave",
            start: new Date(),
            end: new Date(),
            guid: ""
        } ];
        return {
            events: eventData,
            defaultView: props.defaultView,
            defaultDate: new Date(),
            popup: props.popup,
            selectable: props.selectable,
            onSelectEventAction: () => null,
            onSelectSlotAction: () => null,
            onEventDropAction: () => null
        };
    }
}

export function getVisibleProperties(valueMap: CalendarContainerProps, visibilityMap: VisibilityMap) {
    if (valueMap.dataSource !== "XPath") {
        visibilityMap.entityConstraint = false;
    }
    if (valueMap.dataSource !== "microflow") {
        visibilityMap.dataSourceMicroflow = false;
    }
    visibilityMap.dataSourceMicroflow = valueMap.dataSource === "microflow";
    visibilityMap.entityConstraint = valueMap.dataSource === "XPath";

    visibilityMap.eventMicroflow = valueMap.onClickEvent === "callMicroflow";
    visibilityMap.eventNanoflow = valueMap.onClickEvent === "callNanoflow";
    visibilityMap.eventPage = valueMap.onClickEvent === "showPage";

    return visibilityMap;
}

export function getPreviewCss() {
    return (
        require("./ui/Calendar.scss") + require("react-big-calendar/lib/css/react-big-calendar.css")
    );
}

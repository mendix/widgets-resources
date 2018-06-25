import { Component, createElement } from "react";

import { Calendar, CalendarProps } from "./components/Calendar";
import CalendarContainer, { CalendarContainerProps } from "./components/CalendarContainer";

declare function require(name: string): string;
type VisibilityMap = {
    [P in keyof CalendarContainerProps]: boolean;
};

// tslint:disable-next-line class-name
export class preview extends Component<CalendarContainerProps, {}> {
    render() {
        return createElement("div", {},
            createElement(Calendar, this.transformProps(this.props))
        );
    }

    private transformProps(props: CalendarContainerProps): CalendarProps {
        const eventData = [ {
            title: "Leave",
            start: new Date(),
            end: new Date(),
            guid: "",
            color: "red"
        } ];

        return {
            alertMessage: CalendarContainer.validateProps(this.props),
            color: props.eventColor,
            events: eventData,
            defaultView: props.defaultView,
            startPosition: new Date(),
            popup: props.popup,
            selectable: props.selectable
        };
    }
}

export function getVisibleProperties(valueMap: CalendarContainerProps, visibilityMap: VisibilityMap) {
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

import { Component, createElement } from "react";

import { Calendar, CalendarProps } from "./components/Calendar";
import CalendarContainer, { parseStyle } from "./components/CalendarContainer";
import { Container } from "./utils/namespaces";

declare function require(name: string): string;
type VisibilityMap = {
    [P in keyof Container.CalendarContainerProps]: boolean;
};

// tslint:disable-next-line class-name
export class preview extends Component<Container.CalendarContainerProps, {}> {
    render() {
        return createElement(Calendar, this.transformProps(this.props));
        }

    private transformProps(props: Container.CalendarContainerProps): CalendarProps {
        const eventData = [ {
            title: "Leave",
            allDay: true,
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
            height: props.height,
            heightUnit: props.heightUnit,
            messages: [],
            startPosition: new Date(),
            popup: props.popup,
            selectable: props.selectable,
            style: parseStyle(props.style),
            width: props.width,
            widthUnit: props.widthUnit
        };
    }
}

export function getVisibleProperties(valueMap: Container.CalendarContainerProps, visibilityMap: VisibilityMap) {
    visibilityMap.dataSourceMicroflow = valueMap.dataSource === "microflow";
    visibilityMap.entityConstraint = valueMap.dataSource === "XPath";
    visibilityMap.onClickMicroflow = valueMap.onClickEvent === "callMicroflow";
    visibilityMap.onClickNanoflow = valueMap.onClickEvent === "callNanoflow";

    return visibilityMap;
}

export function getPreviewCss() {
    return (
        require("./ui/Calendar.scss") + require("react-big-calendar/lib/css/react-big-calendar.css")
    );
}

import { Container } from "./namespaces";
import { createElement, ReactChild } from "react";

export function validateProps(props: Container.CalendarContainerProps): ReactChild {
    const errorMessages: string[] = [];

    if (props.onClickEvent === "callMicroflow" && !props.onClickMicroflow) {
        errorMessages.push("On click event is set to 'Call a microflow' but no microflow is selected");
    } else if (props.onClickEvent === "callNanoflow" && !props.onClickNanoflow.nanoflow) {
        errorMessages.push("On click event is set to 'Call a nanoflow' but no nanoflow is selected");
    }
    if (props.onCreate === "callMicroflow" && !props.onCreateMicroflow) {
        errorMessages.push("On create event is set to 'Call a microflow' but no microflow is selected");
    } else if (props.onCreate === "callNanoflow" && !props.onCreateNanoflow.nanoflow) {
        errorMessages.push("On create event is set to 'Call a nanoflow' but no nanoflow is selected");
    }
    if (props.onChangeEvent === "callMicroflow" && !props.onChangeMicroflow) {
        errorMessages.push("On change event is set to 'Call a microflow' but no microflow is selected");
    } else if (props.onChangeEvent === "callNanoflow" && !props.onChangeNanoflow.nanoflow) {
        errorMessages.push("On change event is set to 'Call a nanoflow' but no nanoflow is selected");
    }
    if (props.dataSource === "microflow" && !props.dataSourceMicroflow) {
        errorMessages.push("Datasource is set to 'microflow' but no microflow is selected");
    } else if (props.dataSource === "nanoflow" && !props.dataSourceNanoflow.nanoflow) {
        errorMessages.push("Datasource is set to 'nanoflow' but no nanoflow is selected");
    }
    if (props.dataSource === "context" && props.mxObject && props.mxObject.getEntity() !== props.eventEntity) {
        errorMessages.push(`${props.friendlyId}: Context entity does not match the event entity`);
    }
    if (props.view === "custom" && props.customViews.length <= 0) {
        errorMessages.push(`${props.friendlyId}: View is set to "custom" but there is no view selected`);
    }
    if (props.view === "standard" && (props.defaultView === "work_week" || props.defaultView === "agenda")) {
        errorMessages.push(`${props.friendlyId}: ${props.defaultView} is only available in custom view`);
    }
    if (errorMessages.length) {
        return createElement(
            "div",
            {},
            "Error in calendar configuration:",
            errorMessages.map((message, key) => createElement("p", { key }, message))
        );
    }

    return "";
}

export function validateCustomFormats(props: Container.CalendarContainerProps): ReactChild {
    const errorMessages: string[] = [];

    try {
        if (props.view === "custom") {
            const date = new Date();
            props.customViews.forEach(customView => {
                window.mx.parser.formatValue(date, "datetime", { datePattern: customView.cellDateFormat });
                window.mx.parser.formatValue(date, "datetime", { datePattern: customView.gutterDateFormat });
                if (customView.headerFormat) {
                    window.mx.parser.formatValue(date, "datetime", { datePattern: customView.headerFormat });
                }
                window.mx.parser.formatValue(date, "datetime", { datePattern: customView.gutterTimeFormat });
            });
        }
    } catch (error) {
        errorMessages.push(`${props.friendlyId}: Invalid format value`);
    }
    if (errorMessages.length) {
        return createElement(
            "div",
            {},
            "Error in calendar configuration:",
            errorMessages.map((message, key) => createElement("p", { key }, message))
        );
    }

    return "";
}

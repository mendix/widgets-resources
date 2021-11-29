import { createElement, ReactElement } from "react";
import { FilterComponent } from "./components/FilterComponent";
import { DatagridDateFilterPreviewProps } from "../typings/DatagridDateFilterProps";
import { parseStyle } from "@mendix/piw-utils-internal";

export function preview(props: DatagridDateFilterPreviewProps): ReactElement {
    return (
        <FilterComponent
            adjustable={props.adjustable}
            className={props.className}
            defaultFilter={props.defaultFilter}
            placeholder={props.placeholder}
            screenReaderButtonCaption={props.screenReaderButtonCaption}
            screenReaderCalendarCaption={props.screenReaderCalendarCaption}
            screenReaderInputCaption={props.screenReaderInputCaption}
            styles={parseStyle(props.style)}
        />
    );
}

export function getPreviewCss(): string {
    return require("react-datepicker/dist/react-datepicker.css");
}

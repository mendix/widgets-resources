import { createElement, ReactElement } from "react";
import { FilterComponent } from "./components/FilterComponent";
import { DatagridDateFilterPreviewProps } from "../typings/DatagridDateFilterProps";

export function preview(props: DatagridDateFilterPreviewProps): ReactElement {
    return (
        <FilterComponent
            adjustable={props.adjustable}
            defaultFilter={props.defaultFilter}
            placeholder={props.placeholder}
            screenReaderButtonCaption={props.screenReaderButtonCaption}
            screenReaderInputCaption={props.screenReaderInputCaption}
        />
    );
}

export function getPreviewCss(): string {
    return require("react-datepicker/dist/react-datepicker.css");
}

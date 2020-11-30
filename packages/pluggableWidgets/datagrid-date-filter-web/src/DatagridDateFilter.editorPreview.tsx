import { createElement, ReactElement } from "react";
import { DatagridDateFilterPreviewProps } from "../typings/DatagridDateFilterProps";
import { FilterComponent } from "./components/FilterComponent";

export function preview(props: DatagridDateFilterPreviewProps): ReactElement {
    return (
        <FilterComponent
            adjustable={props.adjustable}
            defaultFilter={props.defaultFilter}
            filterDispatcher={() => ({})}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue ? new Date() : undefined}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/DatagridDateFilter.scss");
}

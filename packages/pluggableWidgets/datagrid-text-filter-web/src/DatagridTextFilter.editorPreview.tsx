import { createElement, ReactElement } from "react";
import { DatagridTextFilterPreviewProps } from "../typings/DatagridTextFilterProps";
import { FilterComponent } from "./components/FilterComponent";

export function preview(props: DatagridTextFilterPreviewProps): ReactElement {
    return (
        <FilterComponent
            defaultFilter={props.defaultFilter}
            filterDispatcher={() => ({})}
            placeholder={props.placeholder}
            value={props.defaultValue}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/DatagridTextFilter.scss");
}

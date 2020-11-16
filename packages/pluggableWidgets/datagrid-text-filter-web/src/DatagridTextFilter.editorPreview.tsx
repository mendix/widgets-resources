import { createElement, ReactElement } from "react";
import { DatagridTextFilterPreviewProps } from "../typings/DatagridTextFilterProps";
import { FilterComponent } from "./components/FilterComponent";

export function preview(props: DatagridTextFilterPreviewProps): ReactElement {
    return <FilterComponent value={props.defaultValue} placeholder={props.placeholder} filterDispatcher={() => ({})} />;
}

export function getPreviewCss(): string {
    return require("./ui/DatagridTextFilter.scss");
}

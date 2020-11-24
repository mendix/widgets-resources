import { createElement, ReactElement } from "react";
import { DatagridDropdownFilterPreviewProps } from "../typings/DatagridDropdownFilterProps";
import { FilterComponent } from "./components/FilterComponent";

export function preview(props: DatagridDropdownFilterPreviewProps): ReactElement {
    return (
        <FilterComponent
            options={[{ caption: "yolo1", value: "yolo1" }]}
            filterDispatcher={() => ({})}
            value={props.defaultValue}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/DatagridDropdownFilter.scss");
}

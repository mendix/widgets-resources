import { createElement, ReactElement } from "react";
import { DatagridDropdownFilterPreviewProps } from "../typings/DatagridDropdownFilterProps";
import { FilterComponent } from "./components/FilterComponent";

export function preview(props: DatagridDropdownFilterPreviewProps): ReactElement {
    return (
        <FilterComponent
            options={[{ caption: "optionCaption", value: "option" }]}
            filterDispatcher={() => ({})}
            defaultValue={props.defaultValue}
        />
    );
}

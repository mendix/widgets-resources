import { createElement, ReactElement } from "react";
import { DatagridDropdownFilterPreviewProps } from "../typings/DatagridDropdownFilterProps";
import { FilterComponent } from "./components/FilterComponent";
import { parseStyle } from "@mendix/piw-utils-internal";

interface PreviewProps extends Omit<DatagridDropdownFilterPreviewProps, "class"> {
    className: string;
}

export function preview(props: PreviewProps): ReactElement {
    return (
        <FilterComponent
            ariaLabel={props.ariaLabel}
            className={props.className}
            defaultValue={props.defaultValue}
            options={[{ caption: "optionCaption", value: "option" }]}
            styles={parseStyle(props.style)}
        />
    );
}

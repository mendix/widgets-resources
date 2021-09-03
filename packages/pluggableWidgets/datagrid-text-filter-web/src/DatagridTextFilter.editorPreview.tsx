import { createElement, ReactElement } from "react";
import { DatagridTextFilterPreviewProps } from "../typings/DatagridTextFilterProps";
import { FilterComponent } from "./components/FilterComponent";
import { parseStyle } from "@mendix/piw-utils-internal";

interface PreviewProps extends Omit<DatagridTextFilterPreviewProps, "class"> {
    className: string;
}

export function preview(props: PreviewProps): ReactElement {
    return (
        <FilterComponent
            adjustable={props.adjustable}
            className={props.className}
            defaultFilter={props.defaultFilter}
            delay={props.delay ?? 500}
            placeholder={props.placeholder}
            styles={parseStyle(props.style)}
            value={props.defaultValue}
        />
    );
}

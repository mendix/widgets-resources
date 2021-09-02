import { createElement, ReactElement } from "react";
import { DatagridNumberFilterPreviewProps } from "../typings/DatagridNumberFilterProps";
import { FilterComponent } from "./components/FilterComponent";
import { parseStyle } from "@mendix/piw-utils-internal";

export function preview(props: DatagridNumberFilterPreviewProps): ReactElement {
    return (
        <FilterComponent
            adjustable={props.adjustable}
            className={props.className}
            defaultFilter={props.defaultFilter}
            delay={props.delay ?? 500}
            placeholder={props.placeholder}
            styles={parseStyle(props.style)}
        />
    );
}

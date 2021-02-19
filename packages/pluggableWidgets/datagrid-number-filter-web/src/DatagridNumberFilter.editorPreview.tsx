import { createElement, ReactElement } from "react";
import { DatagridNumberFilterPreviewProps } from "../typings/DatagridNumberFilterProps";
import { FilterComponent } from "./components/FilterComponent";

export function preview(props: DatagridNumberFilterPreviewProps): ReactElement {
    return (
        <FilterComponent
            adjustable={props.adjustable}
            defaultFilter={props.defaultFilter}
            delay={props.delay ?? 500}
            filterDispatcher={() => ({})}
            placeholder={props.placeholder}
        />
    );
}

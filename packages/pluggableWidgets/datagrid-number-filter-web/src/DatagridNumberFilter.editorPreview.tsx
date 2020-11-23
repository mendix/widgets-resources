import { createElement, ReactElement } from "react";
import { DatagridNumberFilterPreviewProps } from "../typings/DatagridNumberFilterProps";
import { FilterComponent } from "./components/FilterComponent";
import Big from "big.js";

export function preview(props: DatagridNumberFilterPreviewProps): ReactElement {
    return (
        <FilterComponent
            defaultFilter={props.defaultFilter}
            delay={props.delay ?? 500}
            filterDispatcher={() => ({})}
            placeholder={props.placeholder}
            value={new Big(props.defaultValue)}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/DatagridNumberFilter.scss");
}

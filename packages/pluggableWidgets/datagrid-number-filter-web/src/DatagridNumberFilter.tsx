import { createElement, ReactElement } from "react";
import { DatagridNumberFilterContainerProps } from "../typings/DatagridNumberFilterProps";

import "./ui/DatagridNumberFilter.scss";
import { FilterComponent } from "./components/FilterComponent";
import { useFilterDispatcher } from "./utils/provider";

export default function DatagridNumberFilter(props: DatagridNumberFilterContainerProps): ReactElement {
    const filterDispatcher = useFilterDispatcher();
    return (
        <FilterComponent
            adjustable={props.adjustable}
            defaultFilter={props.defaultFilter}
            delay={props.delay}
            filterDispatcher={filterDispatcher}
            name={props.name}
            placeholder={props.placeholder?.value}
            screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
            screenReaderInputCaption={props.screenReaderInputCaption?.value}
            tabIndex={props.tabIndex}
            value={props.defaultValue?.value}
        />
    );
}

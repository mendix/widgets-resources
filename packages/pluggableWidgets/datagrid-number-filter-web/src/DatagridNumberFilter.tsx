import { createElement, ReactElement } from "react";
import { DatagridNumberFilterContainerProps } from "../typings/DatagridNumberFilterProps";

import "./ui/DatagridNumberFilter.scss";
import { FilterComponent } from "./components/FilterComponent";
import { useFilterDispatcher } from "../../datagrid-web/src/components/provider";

export default function DatagridNumberFilter(props: DatagridNumberFilterContainerProps): ReactElement {
    const filterDispatcher = useFilterDispatcher();
    return (
        <FilterComponent
            adjustable={props.adjustable}
            ariaLabel={props.ariaLabel?.value}
            defaultFilter={props.defaultFilter}
            delay={props.delay}
            filterDispatcher={filterDispatcher}
            name={props.name}
            placeholder={props.placeholder?.value}
            tabIndex={props.tabIndex}
            value={props.defaultValue?.value}
        />
    );
}

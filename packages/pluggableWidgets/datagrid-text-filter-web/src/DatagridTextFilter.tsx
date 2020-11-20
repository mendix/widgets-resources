import { createElement, ReactElement } from "react";
import { DatagridTextFilterContainerProps } from "../typings/DatagridTextFilterProps";

import "./ui/DatagridTextFilter.scss";
import { FilterComponent } from "./components/FilterComponent";
import { useFilterDispatcher } from "../../datagrid-web/src/components/provider";

export default function DatagridTextFilter(props: DatagridTextFilterContainerProps): ReactElement {
    const filterDispatcher = useFilterDispatcher();
    return (
        <FilterComponent
            ariaLabel={props.ariaLabel?.value}
            defaultFilter={props.defaultFilter}
            filterDispatcher={filterDispatcher}
            name={props.name}
            placeholder={props.placeholder?.value}
            value={props.defaultValue?.value}
        />
    );
}

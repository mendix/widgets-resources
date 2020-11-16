import { createElement, ReactElement } from "react";
import { DatagridTextFilterContainerProps } from "../typings/DatagridTextFilterProps";

import "./ui/DatagridTextFilter.scss";
import { FilterComponent } from "./components/FilterComponent";
import { useFilterDispatcher } from "../../datagrid-web/src/components/provider";

export default function DatagridTextFilter(props: DatagridTextFilterContainerProps): ReactElement {
    const filterDispatcher = useFilterDispatcher();
    return (
        <FilterComponent
            value={props.defaultValue?.value}
            placeholder={props.placeholder?.value}
            filterDispatcher={filterDispatcher}
        />
    );
}

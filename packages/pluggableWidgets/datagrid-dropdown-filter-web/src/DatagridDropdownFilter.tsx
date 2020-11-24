import { createElement, ReactElement } from "react";
import { DatagridDropdownFilterContainerProps } from "../typings/DatagridDropdownFilterProps";
import { ValueStatus } from "mendix";
import "./ui/DatagridDropdownFilter.scss";
import { FilterComponent } from "./components/FilterComponent";
import { useFilterDispatcher } from "../../datagrid-web/src/components/provider";

export default function DatagridDropdownFilter(props: DatagridDropdownFilterContainerProps): ReactElement {
    const filterDispatcher = useFilterDispatcher();
    const isAllOptionsReady = props.filterOptions.every(
        ({ value, caption }) => value.status === ValueStatus.Available && caption.status === ValueStatus.Available
    );

    const parsedOptions = isAllOptionsReady
        ? props.filterOptions.map(value => ({
              caption: value.caption.value ?? "",
              value: value.value.value ?? ""
          }))
        : [];

    return (
        <FilterComponent
            ariaLabel={props.ariaLabel?.value}
            emptyOptionCaption={props.emptyOptionCaption?.value}
            filterDispatcher={filterDispatcher}
            name={props.name}
            options={parsedOptions}
            tabIndex={props.tabIndex}
            value={props.defaultValue?.value}
        />
    );
}

import { createElement, ReactElement } from "react";
import { DatagridDropdownFilterContainerProps } from "../typings/DatagridDropdownFilterProps";
import { ValueStatus } from "mendix";
import { FilterComponent } from "./components/FilterComponent";
import { getFilterDispatcher } from "./utils/provider";
import { Alert } from "@mendix/piw-utils-internal";

export default function DatagridDropdownFilter(props: DatagridDropdownFilterContainerProps): ReactElement {
    const FilterContext = getFilterDispatcher();
    const isAllOptionsReady = props.filterOptions.every(
        ({ value, caption }) => value.status === ValueStatus.Available && caption.status === ValueStatus.Available
    );
    const parsedOptions = isAllOptionsReady
        ? props.filterOptions.map(value => ({
              caption: value.caption.value ?? "",
              value: value.value.value ?? ""
          }))
        : [];
    const alertMessage = (
        <Alert bootstrapStyle="danger">
            The usage of filter widgets are only available within a data grid filter context. Please move the Data grid
            dropdown widget to inside a Data Grid v2.
        </Alert>
    );

    return FilterContext?.Consumer ? (
        <FilterContext.Consumer>
            {filterDispatcher =>
                filterDispatcher ? (
                    <FilterComponent
                        ariaLabel={props.ariaLabel?.value}
                        emptyOptionCaption={props.emptyOptionCaption?.value}
                        filterDispatcher={filterDispatcher}
                        multiSelect={props.multiSelect}
                        name={props.name}
                        options={parsedOptions}
                        tabIndex={props.tabIndex}
                        defaultValue={props.defaultValue?.value}
                    />
                ) : (
                    alertMessage
                )
            }
        </FilterContext.Consumer>
    ) : (
        alertMessage
    );
}

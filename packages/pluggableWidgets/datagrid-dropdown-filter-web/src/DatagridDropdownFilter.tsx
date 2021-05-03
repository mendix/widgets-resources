import { createElement, ReactElement } from "react";
import { DatagridDropdownFilterContainerProps } from "../typings/DatagridDropdownFilterProps";
import { ValueStatus } from "mendix";
import { FilterComponent, Option } from "./components/FilterComponent";
import { getFilterDispatcher } from "./utils/provider";
import { Alert } from "@mendix/piw-utils-internal";

import { attribute as attributeFunction, equals, literal, or } from "mendix/filters/builders";
import { FilterCondition } from "mendix/filters";

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && type !== "Enum"
        ? "The attribute type being used for Data grid drop-down filter is not 'Enumeration'"
        : null;
}

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
            The data grid drop-down filter widget must be placed inside the header of the Data grid 2.0 widget.
        </Alert>
    );

    return FilterContext?.Consumer ? (
        <FilterContext.Consumer>
            {filterContextValue => {
                if (!filterContextValue || !filterContextValue.filterDispatcher || !filterContextValue.attribute) {
                    return alertMessage;
                }
                const { filterDispatcher, attribute } = filterContextValue;

                const errorMessage = getAttributeTypeErrorMessage(attribute.type);
                if (errorMessage) {
                    return <Alert bootstrapStyle="danger">{errorMessage}</Alert>;
                }
                const getFilterConditions = (values: Option[]): FilterCondition | undefined => {
                    if (!attribute || !attribute.filterable || values.length === 0) {
                        return undefined;
                    }

                    const filterAttribute = attributeFunction(attribute.id);

                    if (values.length > 1) {
                        return or(...values.map(filter => equals(filterAttribute, literal(filter.value))));
                    }

                    const [filterValue] = values;
                    if (filterValue.value) {
                        return equals(filterAttribute, literal(filterValue.value));
                    }

                    return undefined;
                };

                return (
                    <FilterComponent
                        ariaLabel={props.ariaLabel?.value}
                        attribute={attribute}
                        auto={props.auto}
                        emptyOptionCaption={props.emptyOptionCaption?.value}
                        filterDispatcher={filterDispatcher}
                        getFilterConditions={getFilterConditions}
                        multiSelect={props.multiSelect}
                        name={props.name}
                        options={parsedOptions}
                        tabIndex={props.tabIndex}
                        defaultValue={props.defaultValue?.value}
                    />
                );
            }}
        </FilterContext.Consumer>
    ) : (
        alertMessage
    );
}

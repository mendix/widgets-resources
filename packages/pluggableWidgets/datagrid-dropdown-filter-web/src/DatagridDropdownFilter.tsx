import { createElement, ReactElement } from "react";
import { DatagridDropdownFilterContainerProps } from "../typings/DatagridDropdownFilterProps";
import { ValueStatus, ListAttributeValue } from "mendix";
import { FilterComponent, FilterOption } from "./components/FilterComponent";
import { Alert, getFilterDispatcher } from "@mendix/piw-utils-internal";

import { attribute, equals, literal, or } from "mendix/filters/builders";
import { FilterCondition } from "mendix/filters";

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
                const { filterDispatcher, attribute, initialFilters } = filterContextValue;

                const defaultValues = initialFilters.map(filter => filter.value).join(",");

                const errorMessage =
                    getAttributeTypeErrorMessage(attribute.type) || validateValues(attribute, parsedOptions);
                if (errorMessage) {
                    return <Alert bootstrapStyle="danger">{errorMessage}</Alert>;
                }

                return (
                    <FilterComponent
                        ariaLabel={props.ariaLabel?.value}
                        attribute={attribute}
                        auto={props.auto}
                        defaultValue={defaultValues ?? props.defaultValue?.value}
                        emptyOptionCaption={props.emptyOptionCaption?.value}
                        multiSelect={props.multiSelect}
                        name={props.name}
                        options={parsedOptions}
                        tabIndex={props.tabIndex}
                        updateFilters={(values: FilterOption[]): void =>
                            filterDispatcher({
                                getFilterCondition: () => getFilterCondition(attribute, values)
                            })
                        }
                    />
                );
            }}
        </FilterContext.Consumer>
    ) : (
        alertMessage
    );
}

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && !type.match(/Enum|Boolean/)
        ? "The attribute type being used for Data grid drop-down filter is not 'Boolean or Enumeration'"
        : null;
}

function validateValues(listAttribute: ListAttributeValue, options: FilterOption[]): string | null {
    if (options.length === 0) {
        return null;
    }

    return options.some(
        filterOption => !listAttribute.universe?.includes(checkValue(filterOption.value, listAttribute.type))
    )
        ? "There are invalid values available in the Data grid drop-down filter"
        : null;
}

function getFilterCondition(listAttribute: ListAttributeValue, values: FilterOption[]): FilterCondition | undefined {
    if (!listAttribute || !listAttribute.filterable || values.length === 0) {
        return undefined;
    }

    const { id, type } = listAttribute;
    const filterAttribute = attribute(id);

    if (values.length > 1) {
        return or(...values.map(filter => equals(filterAttribute, literal(checkValue(filter.value, type)))));
    }

    const [filterValue] = values;
    if (filterValue.value) {
        return equals(filterAttribute, literal(checkValue(filterValue.value, type)));
    }

    return undefined;
}

function checkValue(value: string, type: string): boolean | string {
    if (type === "Boolean") {
        if (value !== "true" && value !== "false") {
            return value;
        }
        return value === "true";
    }
    return value;
}

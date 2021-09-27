import { createElement, ReactElement, useRef } from "react";
import { DatagridDropdownFilterContainerProps } from "../typings/DatagridDropdownFilterProps";
import { ValueStatus, ListAttributeValue } from "mendix";
import { FilterComponent, FilterOption } from "./components/FilterComponent";
import { Alert, FilterType, getFilterDispatcher, generateUUID } from "@mendix/piw-utils-internal/components/web";

import { attribute, equals, literal, or } from "mendix/filters/builders";
import { FilterCondition } from "mendix/filters";

export default function DatagridDropdownFilter(props: DatagridDropdownFilterContainerProps): ReactElement {
    const id = useRef(`DropdownFilter${generateUUID()}`);

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
            The Drop-down filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget.
        </Alert>
    );

    const alertMessageMultipleFilters = (
        <Alert bootstrapStyle="danger">
            The Drop-down filter widget can&apos;t be used with the filters options you have selected. It requires a
            &quot;Boolean or Enumeration&quot; attribute to be selected.
        </Alert>
    );

    return FilterContext?.Consumer ? (
        <FilterContext.Consumer>
            {filterContextValue => {
                if (
                    !filterContextValue ||
                    !filterContextValue.filterDispatcher ||
                    (!filterContextValue.singleAttribute && !filterContextValue.multipleAttributes)
                ) {
                    return alertMessage;
                }
                const {
                    filterDispatcher,
                    singleAttribute,
                    multipleAttributes,
                    singleInitialFilter,
                    multipleInitialFilters
                } = filterContextValue;

                const attributes = [
                    ...(singleAttribute ? [singleAttribute] : []),
                    ...(multipleAttributes ? findAttributesByType(multipleAttributes) ?? [] : [])
                ];

                if (attributes.length === 0) {
                    if (multipleAttributes) {
                        return alertMessageMultipleFilters;
                    }
                    return alertMessage;
                }

                const errorMessage =
                    getAttributeTypeErrorMessage(attributes[0].type) || validateValues(attributes, parsedOptions);

                if (errorMessage) {
                    return <Alert bootstrapStyle="danger">{errorMessage}</Alert>;
                }

                const defaultValues = singleInitialFilter
                    ? singleInitialFilter?.map(filter => filter.value).join(",")
                    : attributes
                          ?.flatMap(attribute => multipleInitialFilters?.[attribute.id].map(filter => filter.value))
                          .join(",");

                const options = props.auto ? attributes?.flatMap(mapAttributeToValues) ?? [] : parsedOptions;

                return (
                    <FilterComponent
                        ariaLabel={props.ariaLabel?.value}
                        className={props.class}
                        defaultValue={defaultValues ?? props.defaultValue?.value}
                        emptyOptionCaption={props.emptyOptionCaption?.value}
                        multiSelect={props.multiSelect}
                        id={id.current}
                        options={options}
                        styles={props.style}
                        tabIndex={props.tabIndex}
                        updateFilters={(values: FilterOption[]): void => {
                            const conditions = attributes
                                ?.map(attribute => getFilterCondition(attribute, values))
                                .filter((filter): filter is FilterCondition => filter !== undefined);
                            filterDispatcher({
                                getFilterCondition: () =>
                                    conditions && conditions.length > 1 ? or(...conditions) : conditions?.[0],
                                filterType: FilterType.ENUMERATION
                            });
                        }}
                    />
                );
            }}
        </FilterContext.Consumer>
    ) : (
        alertMessage
    );
}

function findAttributesByType(multipleAttributes?: {
    [key: string]: ListAttributeValue;
}): ListAttributeValue[] | undefined {
    if (!multipleAttributes) {
        return undefined;
    }
    return Object.keys(multipleAttributes)
        .map(key => multipleAttributes[key])
        .filter(attr => attr.type.match(/Enum|Boolean/));
}

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && !type.match(/Enum|Boolean/)
        ? "The attribute type being used for Drop-down filter is not 'Boolean or Enumeration'"
        : null;
}

function validateValues(attributes: ListAttributeValue[], options: FilterOption[]): string | null {
    if (options.length === 0) {
        return null;
    }

    return options.some(filterOption =>
        attributes.every(
            listAttribute => !listAttribute.universe?.includes(checkValue(filterOption.value, listAttribute.type))
        )
    )
        ? "There are invalid values available in the Drop-down filter"
        : null;
}

function getFilterCondition(
    listAttribute: ListAttributeValue | undefined,
    values: FilterOption[]
): FilterCondition | undefined {
    if (!listAttribute || !listAttribute.filterable || values.length === 0) {
        return undefined;
    }

    const { id, type } = listAttribute;
    const filterAttribute = attribute(id);

    if (
        values.some(
            filterOption => !listAttribute.universe?.includes(checkValue(filterOption.value, listAttribute.type))
        )
    ) {
        return undefined;
    }

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

function mapAttributeToValues(attribute: ListAttributeValue): FilterOption[] {
    if (!attribute.universe) {
        return [];
    }
    return attribute.universe.map(value => ({
        caption: attribute.formatter.format(value) ?? "",
        value: value?.toString() ?? ""
    }));
}

import { createElement, ReactElement } from "react";
import { DatagridTextFilterContainerProps, DefaultFilterEnum } from "../typings/DatagridTextFilterProps";

import { FilterComponent } from "./components/FilterComponent";
import { getFilterDispatcher } from "./utils/provider";
import { Alert } from "@mendix/piw-utils-internal";

import {
    attribute as attributeFunction,
    contains,
    equals,
    endsWith,
    greaterThan,
    greaterThanOrEqual,
    lessThan,
    lessThanOrEqual,
    literal,
    startsWith,
    notEqual
} from "mendix/filters/builders";
import { FilterCondition } from "mendix/filters";
import { ListAttributeValue } from "mendix";

export default function DatagridTextFilter(props: DatagridTextFilterContainerProps): ReactElement {
    const FilterContext = getFilterDispatcher();
    const alertMessage = (
        <Alert bootstrapStyle="danger">
            The data grid text filter widget must be placed inside the header of the Data grid 2.0 widget.
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

                return (
                    <FilterComponent
                        adjustable={props.adjustable}
                        defaultFilter={props.defaultFilter}
                        delay={props.delay}
                        name={props.name}
                        placeholder={props.placeholder?.value}
                        screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
                        screenReaderInputCaption={props.screenReaderInputCaption?.value}
                        tabIndex={props.tabIndex}
                        updateFilters={(value: string, type: DefaultFilterEnum): void =>
                            filterDispatcher({
                                getFilterCondition: () => getFilterCondition(attribute, value, type)
                            })
                        }
                        value={props.defaultValue?.value}
                    />
                );
            }}
        </FilterContext.Consumer>
    ) : (
        alertMessage
    );
}

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && !type.match(/HashString|String/)
        ? "The attribute type being used for Data grid text filter is not 'Hashed string or String'"
        : null;
}

function getFilterCondition(
    attribute: ListAttributeValue,
    value: string,
    type: DefaultFilterEnum
): FilterCondition | undefined {
    if (!attribute || !attribute.filterable || !value) {
        return undefined;
    }

    const filterAttribute = attributeFunction(attribute.id);

    switch (type) {
        case "contains":
            return contains(filterAttribute, literal(value));
        case "startsWith":
            return startsWith(filterAttribute, literal(value));
        case "endsWith":
            return endsWith(filterAttribute, literal(value));
        case "greater":
            return greaterThan(filterAttribute, literal(value));
        case "greaterEqual":
            return greaterThanOrEqual(filterAttribute, literal(value));
        case "equal":
            return equals(filterAttribute, literal(value));
        case "notEqual":
            return notEqual(filterAttribute, literal(value));
        case "smaller":
            return lessThan(filterAttribute, literal(value));
        case "smallerEqual":
            return lessThanOrEqual(filterAttribute, literal(value));
    }
}

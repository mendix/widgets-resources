import { createElement, ReactElement } from "react";
import { DatagridTextFilterContainerProps, DefaultFilterEnum } from "../typings/DatagridTextFilterProps";

import { FilterComponent } from "./components/FilterComponent";
import { Alert, getFilterDispatcher } from "@mendix/piw-utils-internal";

import {
    attribute,
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
import { translateFilters } from "./utils/filters";

export default function DatagridTextFilter(props: DatagridTextFilterContainerProps): ReactElement {
    const FilterContext = getFilterDispatcher();
    const alertMessage = (
        <Alert bootstrapStyle="danger">
            The text filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget.
        </Alert>
    );
    const alertMessageMultipleFilters = (
        <Alert bootstrapStyle="danger">
            To use multiple filters you need to define a filter identification in the properties of text filter.
        </Alert>
    );

    console.warn(FilterContext?.Consumer);

    return FilterContext?.Consumer ? (
        <FilterContext.Consumer>
            {filterContextValue => {
                if (
                    !filterContextValue ||
                    !filterContextValue.filterDispatcher ||
                    (!filterContextValue.attribute && !filterContextValue.attributes)
                ) {
                    return alertMessage;
                }
                const {
                    filterDispatcher,
                    attribute: singleAttribute,
                    attributes: multipleAttributes,
                    initialFilter: singleInitialFilter,
                    initialFilters: multipleInitialFilters
                } = filterContextValue;

                if ((multipleAttributes?.length ?? 0) > 0 && !props.filterId) {
                    return alertMessageMultipleFilters;
                }

                const attribute = singleAttribute ?? multipleAttributes?.[props.filterId];

                if (!attribute) {
                    return alertMessage;
                }

                const defaultFilter = singleInitialFilter
                    ? translateFilters(singleInitialFilter)
                    : translateFilters(multipleInitialFilters?.[props.filterId]);

                const errorMessage = getAttributeTypeErrorMessage(attribute.type);
                if (errorMessage) {
                    return <Alert bootstrapStyle="danger">{errorMessage}</Alert>;
                }

                return (
                    <FilterComponent
                        adjustable={props.adjustable}
                        defaultFilter={defaultFilter?.type ?? props.defaultFilter}
                        delay={props.delay}
                        name={props.name}
                        placeholder={props.placeholder?.value}
                        screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
                        screenReaderInputCaption={props.screenReaderInputCaption?.value}
                        tabIndex={props.tabIndex}
                        updateFilters={(value: string, type: DefaultFilterEnum): void =>
                            filterDispatcher({
                                getFilterCondition: () => getFilterCondition(attribute, value, type),
                                filterId: props.filterId
                            })
                        }
                        value={defaultFilter?.value ?? props.defaultValue?.value}
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
    listAttribute: ListAttributeValue,
    value: string,
    type: DefaultFilterEnum
): FilterCondition | undefined {
    if (!listAttribute || !listAttribute.filterable || !value) {
        return undefined;
    }

    const filters = {
        contains,
        startsWith,
        endsWith,
        greater: greaterThan,
        greaterEqual: greaterThanOrEqual,
        equal: equals,
        notEqual,
        smaller: lessThan,
        smallerEqual: lessThanOrEqual
    };

    return filters[type](attribute(listAttribute.id), literal(value));
}

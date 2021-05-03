import { createElement, ReactElement } from "react";
import { DatagridNumberFilterContainerProps } from "../typings/DatagridNumberFilterProps";

import { FilterComponent } from "./components/FilterComponent";
import { getFilterDispatcher } from "./utils/provider";
import { Alert } from "@mendix/piw-utils-internal";
import { Big } from "big.js";
import { DefaultFilterEnum } from "../../datagrid-text-filter-web/typings/DatagridTextFilterProps";

import {
    attribute as attributeFunction,
    equals,
    greaterThan,
    greaterThanOrEqual,
    lessThan,
    lessThanOrEqual,
    literal,
    notEqual
} from "mendix/filters/builders";
import { FilterCondition } from "mendix/filters";

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && !type.match(/AutoNumber|Decimal|Integer|Long/)
        ? "The attribute type being used for Data grid number filter is not 'Auto number, Decimal, Integer or Long'"
        : null;
}

export default function DatagridNumberFilter(props: DatagridNumberFilterContainerProps): ReactElement {
    const FilterContext = getFilterDispatcher();
    const alertMessage = (
        <Alert bootstrapStyle="danger">
            The data grid number filter widget must be placed inside the header of the Data grid 2.0 widget.
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

                const getFilterConditions = (
                    value: Big | undefined,
                    type: DefaultFilterEnum
                ): FilterCondition | undefined => {
                    if (!attribute || !attribute.filterable || !value) {
                        return undefined;
                    }
                    const filterAttribute = attributeFunction(attribute.id);
                    const filterValue = new Big(value);

                    switch (type) {
                        case "greater":
                            return greaterThan(filterAttribute, literal(filterValue));
                        case "greaterEqual":
                            return greaterThanOrEqual(filterAttribute, literal(filterValue));
                        case "equal":
                            return equals(filterAttribute, literal(filterValue));
                        case "notEqual":
                            return notEqual(filterAttribute, literal(filterValue));
                        case "smaller":
                            return lessThan(filterAttribute, literal(filterValue));
                        case "smallerEqual":
                            return lessThanOrEqual(filterAttribute, literal(filterValue));
                    }
                };
                return (
                    <FilterComponent
                        adjustable={props.adjustable}
                        defaultFilter={props.defaultFilter}
                        delay={props.delay}
                        filterDispatcher={filterDispatcher}
                        getFilterConditions={getFilterConditions}
                        name={props.name}
                        placeholder={props.placeholder?.value}
                        screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
                        screenReaderInputCaption={props.screenReaderInputCaption?.value}
                        tabIndex={props.tabIndex}
                        value={props.defaultValue?.value}
                    />
                );
            }}
        </FilterContext.Consumer>
    ) : (
        alertMessage
    );
}

import { createElement, ReactElement, useRef } from "react";
import { DatagridNumberFilterContainerProps, DefaultFilterEnum } from "../typings/DatagridNumberFilterProps";

import { FilterComponent } from "./components/FilterComponent";
import { Alert, FilterType, getFilterDispatcher, generateUUID } from "@mendix/piw-utils-internal/components/web";
import { Big } from "big.js";

import {
    attribute,
    equals,
    greaterThan,
    greaterThanOrEqual,
    lessThan,
    lessThanOrEqual,
    literal,
    notEqual,
    or
} from "mendix/filters/builders";
import { FilterCondition } from "mendix/filters";
import { ListAttributeValue } from "mendix";
import { translateFilters } from "./utils/filters";

export default function DatagridNumberFilter(props: DatagridNumberFilterContainerProps): ReactElement {
    const id = useRef(`NumberFilter${generateUUID()}`);

    const FilterContext = getFilterDispatcher();
    const alertMessage = (
        <Alert bootstrapStyle="danger">
            The Number filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget.
        </Alert>
    );
    const alertMessageMultipleFilters = (
        <Alert bootstrapStyle="danger">
            The Number filter widget can&apos;t be used with the filters options you have selected. It requires a
            &quot;Autonumber, Decimal, Integer or Long&quot; attribute to be selected.
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

                const defaultFilter = singleInitialFilter
                    ? translateFilters(singleInitialFilter)
                    : translateFilters(multipleInitialFilters?.[attributes[0].id]);

                const errorMessage = getAttributeTypeErrorMessage(attributes[0].type);
                if (errorMessage) {
                    return <Alert bootstrapStyle="danger">{errorMessage}</Alert>;
                }

                return (
                    <FilterComponent
                        adjustable={props.adjustable}
                        className={props.class}
                        defaultFilter={defaultFilter?.type ?? props.defaultFilter}
                        delay={props.delay}
                        id={id.current}
                        placeholder={props.placeholder?.value}
                        screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
                        screenReaderInputCaption={props.screenReaderInputCaption?.value}
                        styles={props.style}
                        tabIndex={props.tabIndex}
                        updateFilters={(value: Big | undefined, type: DefaultFilterEnum): void => {
                            if (
                                (value && !props.valueAttribute?.value?.eq(value)) ||
                                value !== props.valueAttribute?.value
                            ) {
                                props.valueAttribute?.setValue(value);
                                props.onChange?.execute();
                            }
                            const conditions = attributes
                                ?.map(attribute => getFilterCondition(attribute, value, type))
                                .filter((filter): filter is FilterCondition => filter !== undefined);
                            filterDispatcher({
                                getFilterCondition: () =>
                                    conditions && conditions.length > 1 ? or(...conditions) : conditions?.[0],
                                filterType: FilterType.NUMBER
                            });
                        }}
                        value={defaultFilter?.value ?? props.defaultValue?.value}
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
        .filter(attr => attr.type.match(/AutoNumber|Decimal|Integer|Long/));
}

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && !type.match(/AutoNumber|Decimal|Integer|Long/)
        ? "The attribute type being used for Number filter is not 'Autonumber, Decimal, Integer or Long'"
        : null;
}

function getFilterCondition(
    listAttribute: ListAttributeValue,
    value: Big | undefined,
    type: DefaultFilterEnum
): FilterCondition | undefined {
    if (!listAttribute || !listAttribute.filterable || (type !== "empty" && type !== "notEmpty" && !value)) {
        return undefined;
    }

    const filters = {
        greater: greaterThan,
        greaterEqual: greaterThanOrEqual,
        equal: equals,
        notEqual,
        smaller: lessThan,
        smallerEqual: lessThanOrEqual,
        empty: equals,
        notEmpty: notEqual
    };

    return filters[type](
        attribute(listAttribute.id),
        literal(type === "empty" || type === "notEmpty" ? undefined : value)
    );
}

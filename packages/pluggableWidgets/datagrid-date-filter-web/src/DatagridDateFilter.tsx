import { createElement, ReactElement } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { FilterComponent } from "./components/FilterComponent";
import { DatagridDateFilterContainerProps, DefaultFilterEnum } from "../typings/DatagridDateFilterProps";
import { registerLocale } from "react-datepicker";
import * as locales from "date-fns/locale";
import { Alert, getFilterDispatcher } from "@mendix/piw-utils-internal";

import { changeTimeToMidnight } from "./utils/utils";
import { addDays } from "date-fns";

import {
    and,
    attribute,
    greaterThan,
    greaterThanOrEqual,
    lessThan,
    lessThanOrEqual,
    literal,
    or
} from "mendix/filters/builders";
import { FilterCondition } from "mendix/filters";
import { ListAttributeValue } from "mendix";
import { translateFilters } from "./utils/filters";

interface Locale {
    [key: string]: object;
}

export default function DatagridDateFilter(props: DatagridDateFilterContainerProps): ReactElement | null {
    const { languageTag = "en-US", patterns } = (window as any).mx.session.getConfig().locale;

    const [language] = languageTag.split("-");
    const languageTagWithoutDash = languageTag.replace("-", "");

    if (languageTagWithoutDash in locales) {
        registerLocale(language, (locales as Locale)[languageTagWithoutDash]);
    } else if (language in locales) {
        registerLocale(language, (locales as Locale)[language]);
    }

    const alertMessage = (
        <Alert bootstrapStyle="danger">
            The date filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget.
        </Alert>
    );
    const alertMessageMultipleFilters = (
        <Alert bootstrapStyle="danger">
            To use multiple filters you need to define a filter identification in the properties of date filter.
        </Alert>
    );

    const FilterContext = getFilterDispatcher();

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

                if (multipleAttributes && !props.filterId) {
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
                        defaultValue={defaultFilter?.value ?? props.defaultValue?.value}
                        dateFormat={patterns.date}
                        locale={language}
                        name={props.name}
                        placeholder={props.placeholder?.value}
                        screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
                        screenReaderInputCaption={props.screenReaderInputCaption?.value}
                        tabIndex={props.tabIndex}
                        updateFilters={(value: Date | null, type: DefaultFilterEnum): void =>
                            filterDispatcher({
                                getFilterCondition: () => getFilterCondition(attribute, value, type),
                                filterId: props.filterId
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
    return type && type !== "DateTime"
        ? "The attribute type being used for Data grid date filter is not 'Date and time'"
        : null;
}

function getFilterCondition(
    listAttribute: ListAttributeValue,
    value: Date | null,
    type: DefaultFilterEnum
): FilterCondition | undefined {
    if (!listAttribute || !listAttribute.filterable || !value) {
        return undefined;
    }

    const filterAttribute = attribute(listAttribute.id);
    const dateValue = changeTimeToMidnight(value);
    switch (type) {
        case "greater":
            // > Day +1 at midnight -1ms
            return greaterThan(filterAttribute, literal(new Date(addDays(dateValue, 1).getTime() - 1)));
        case "greaterEqual":
            // >= day at midnight
            return greaterThanOrEqual(filterAttribute, literal(dateValue));
        case "equal":
            // >= day at midnight and < day +1 midnight
            return and(
                greaterThanOrEqual(filterAttribute, literal(dateValue)),
                lessThan(filterAttribute, literal(addDays(dateValue, 1)))
            );
        case "notEqual":
            // < day at midnight or >= day +1 at midnight
            return or(
                lessThan(filterAttribute, literal(dateValue)),
                greaterThanOrEqual(filterAttribute, literal(addDays(dateValue, 1)))
            );
        case "smaller":
            // < day at midnight
            return lessThan(filterAttribute, literal(dateValue));
        case "smallerEqual":
            // <= day +1 at midnight -1ms
            return lessThanOrEqual(filterAttribute, literal(new Date(addDays(dateValue, 1).getTime() - 1)));
    }
}

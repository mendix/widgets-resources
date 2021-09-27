import { createElement, ReactElement, useRef } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { FilterComponent } from "./components/FilterComponent";
import { DatagridDateFilterContainerProps, DefaultFilterEnum } from "../typings/DatagridDateFilterProps";
import { registerLocale } from "react-datepicker";
import * as locales from "date-fns/locale";
import { Alert, FilterType, getFilterDispatcher, generateUUID } from "@mendix/piw-utils-internal/components/web";

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
    const id = useRef(`DateFilter${generateUUID()}`);
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
            The Date filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget.
        </Alert>
    );
    const alertMessageMultipleFilters = (
        <Alert bootstrapStyle="danger">
            The Date filter widget can&apos;t be used with the filters options you have selected. It requires a
            &quot;Date and Time&quot; attribute to be selected.
        </Alert>
    );

    const FilterContext = getFilterDispatcher();

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
                        defaultValue={defaultFilter?.value ?? props.defaultValue?.value}
                        dateFormat={patterns.date}
                        locale={language}
                        id={id.current}
                        placeholder={props.placeholder?.value}
                        screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
                        screenReaderCalendarCaption={props.screenReaderCalendarCaption?.value}
                        screenReaderInputCaption={props.screenReaderInputCaption?.value}
                        styles={props.style}
                        tabIndex={props.tabIndex}
                        updateFilters={(value: Date | null, type: DefaultFilterEnum): void => {
                            const conditions = attributes
                                ?.map(attribute => getFilterCondition(attribute, value, type))
                                .filter((filter): filter is FilterCondition => filter !== undefined);
                            filterDispatcher({
                                getFilterCondition: () =>
                                    conditions && conditions.length > 1 ? or(...conditions) : conditions?.[0],
                                filterType: FilterType.DATE
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
        .filter(attr => attr.type === "DateTime");
}

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && type !== "DateTime" ? "The attribute type being used for Date filter is not 'Date and time'" : null;
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

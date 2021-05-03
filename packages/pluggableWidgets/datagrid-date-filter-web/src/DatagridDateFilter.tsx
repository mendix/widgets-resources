import { createElement, ReactElement } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { FilterComponent } from "./components/FilterComponent";
import { DatagridDateFilterContainerProps } from "../typings/DatagridDateFilterProps";
import { registerLocale } from "react-datepicker";
import * as locales from "date-fns/locale";
import { getFilterDispatcher } from "./utils/provider";
import { Alert } from "@mendix/piw-utils-internal";

import { DefaultFilterEnum } from "../../datagrid-text-filter-web/typings/DatagridTextFilterProps";
import { chanteTimeToMidnight } from "./utils/utils";
import { addDays, subDays } from "date-fns";

import {
    and,
    attribute as attributeFunction,
    greaterThan,
    greaterThanOrEqual,
    lessThan,
    lessThanOrEqual,
    literal,
    or
} from "mendix/filters/builders";
import { FilterCondition } from "mendix/filters";

interface Locale {
    [key: string]: object;
}

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && type !== "DateTime"
        ? "The attribute type being used for Data grid date filter is not 'Date and time'"
        : null;
}

export default function DatagridDateFilter(props: DatagridDateFilterContainerProps): ReactElement | null {
    const FilterContext = getFilterDispatcher();

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
            The data grid date filter widget must be placed inside the header of the Data grid 2.0 widget.
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
                    value: Date | null,
                    type: DefaultFilterEnum
                ): FilterCondition | undefined => {
                    if (!attribute || !attribute.filterable || !value) {
                        return undefined;
                    }

                    const filterAttribute = attributeFunction(attribute.id);

                    switch (type) {
                        case "greater":
                            // > Date at midnight
                            return greaterThan(filterAttribute, literal(chanteTimeToMidnight(value)));
                        case "greaterEqual":
                            // > day -1 at midnight
                            return greaterThan(filterAttribute, literal(subDays(chanteTimeToMidnight(value), 1)));
                        case "equal":
                            // >= day at midnight and < day +1 midnight
                            return and(
                                greaterThanOrEqual(filterAttribute, literal(chanteTimeToMidnight(value))),
                                lessThan(filterAttribute, literal(addDays(chanteTimeToMidnight(value), 1)))
                            );
                        case "notEqual":
                            // < day at midnight or >= day +1 at midnight
                            return or(
                                lessThan(filterAttribute, literal(chanteTimeToMidnight(value))),
                                greaterThanOrEqual(filterAttribute, literal(addDays(chanteTimeToMidnight(value), 1)))
                            );
                        case "smaller":
                            // <= day -1 at midnight
                            return lessThanOrEqual(filterAttribute, literal(subDays(chanteTimeToMidnight(value), 1)));
                        case "smallerEqual":
                            // < day +1 at midnight
                            return lessThan(filterAttribute, literal(addDays(chanteTimeToMidnight(value), 1)));
                    }
                };
                return (
                    <FilterComponent
                        adjustable={props.adjustable}
                        defaultFilter={props.defaultFilter}
                        defaultValue={props.defaultValue?.value}
                        dateFormat={patterns.date}
                        filterDispatcher={filterDispatcher}
                        getFilterConditions={getFilterConditions}
                        locale={language}
                        name={props.name}
                        placeholder={props.placeholder?.value}
                        screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
                        screenReaderInputCaption={props.screenReaderInputCaption?.value}
                        tabIndex={props.tabIndex}
                    />
                );
            }}
        </FilterContext.Consumer>
    ) : (
        alertMessage
    );
}

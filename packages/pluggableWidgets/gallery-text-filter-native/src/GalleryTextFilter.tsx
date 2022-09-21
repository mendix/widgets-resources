import { createElement, ReactElement } from "react";
import { Text } from "react-native";
import { all } from "deepmerge";
import { GalleryTextFilterProps, DefaultFilterEnum } from "../typings/GalleryTextFilterProps";
import { defaultGalleryTextFilterStyle, GalleryTextFilterStyle } from "./ui/Styles";
import { FilterType, getFilterDispatcher } from "@mendix/piw-utils-internal/components/native";
import { FilterCondition } from "mendix/filters";
import { ListAttributeValue } from "mendix";
import {
    attribute,
    contains,
    endsWith,
    equals,
    greaterThan,
    greaterThanOrEqual,
    lessThan,
    lessThanOrEqual,
    literal,
    notEqual,
    or,
    startsWith
} from "mendix/filters/builders";

import FilterComponent from "./components/FilterComponent";

export type Props = GalleryTextFilterProps<GalleryTextFilterStyle>;

export function GalleryTextFilter(props: GalleryTextFilterProps<GalleryTextFilterStyle>): ReactElement {
    const styles = all<GalleryTextFilterStyle>([defaultGalleryTextFilterStyle, ...props.style]);
    const FilterContext = getFilterDispatcher();

    const alertMessage = <Text>The Text filter widget must be placed inside the header of the Gallery widget.</Text>;
    const alertMessageMultipleFilters = (
        <Text>
            The Text filter widget can&apos;t be used with the filters options you have selected. It requires a
            &quot;Hashed string or String&quot; attribute to be selected.
        </Text>
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

                const { filterDispatcher, singleAttribute, multipleAttributes } = filterContextValue;

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

                const errorMessage = getAttributeTypeErrorMessage(attributes[0].type);
                if (errorMessage) {
                    return <Text>{errorMessage}</Text>;
                }
                return (
                    <FilterComponent
                        name={props.name}
                        delay={props.delay}
                        styles={styles}
                        placeholder={props.placeholder?.value}
                        updateFilters={(value: string): void => {
                            const attributeCurrentValue = props.valueAttribute?.value || "";
                            if (value !== attributeCurrentValue) {
                                props.valueAttribute?.setValue(value);
                                props.onChange?.execute();
                            }
                            const conditions = attributes
                                ?.map(attribute => getFilterCondition(attribute, value, props.defaultFilter))
                                .filter((filter): filter is FilterCondition => filter !== undefined);
                            filterDispatcher({
                                getFilterCondition: () =>
                                    conditions && conditions.length > 1 ? or(...conditions) : conditions?.[0],
                                filterType: FilterType.STRING
                            });
                        }}
                        value={props.defaultValue?.value}
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
        .filter(attr => attr.type.match(/HashString|String/));
}

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && !type.match(/HashString|String/)
        ? "The attribute type being used for Text filter is not 'Hashed string or String'"
        : null;
}

function getFilterCondition(
    listAttribute: ListAttributeValue,
    value: string,
    type: DefaultFilterEnum
): FilterCondition | undefined {
    if (!listAttribute || !listAttribute.filterable || (type !== "empty" && type !== "notEmpty" && !value)) {
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
        smallerEqual: lessThanOrEqual,
        empty: equals,
        notEmpty: notEqual
    };

    return filters[type](
        attribute(listAttribute.id),
        literal(type === "empty" || type === "notEmpty" ? undefined : value)
    );
}

import { hidePropertyIn, Properties, Problem } from "@widgets-resources/piw-utils";
import { AttributesListPreviewType, AccessibilityHelperPreviewProps } from "../typings/AccessibilityHelperProps";

const PROHIBITED_ATTRIBUTES = ["class", "style", "widgetid", "data-mendix-id"];

export function getProperties(values: AccessibilityHelperPreviewProps, defaultProperties: Properties): Properties {
    values.attributesList.forEach((item: AttributesListPreviewType, index: number) => {
        if (item.valueSourceType === "text") {
            hidePropertyIn(defaultProperties, values, "attributesList", index, "valueExpression");
        }
        if (item.valueSourceType === "expression") {
            hidePropertyIn(defaultProperties, values, "attributesList", index, "valueText");
        }
    });
    return defaultProperties;
}

export function check(values: AccessibilityHelperPreviewProps): Problem[] {
    const errors: Problem[] = [];
    values.attributesList.forEach((item: AttributesListPreviewType) => {
        if (PROHIBITED_ATTRIBUTES.some(value => value === item.attribute)) {
            errors.push({
                property: "attributesList.attribute",
                message: `Widget tries to change ${item.attribute} attribute, this is prohibited`,
                url: "https://docs.mendix.com/appstore/widgets/accessibility-helper"
            });
        }
    });

    return errors;
}

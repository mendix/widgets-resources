import { hidePropertyIn, Properties } from "@widgets-resources/piw-utils";
import { AttributesListPreviewType, AccessibilityHelperPreviewProps } from "../typings/AccessibilityHelperProps";

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

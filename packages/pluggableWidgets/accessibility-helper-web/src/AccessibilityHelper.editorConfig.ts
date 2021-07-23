import {
    hidePropertyIn,
    Properties,
    Problem,
    StructurePreviewProps,
    DropZoneProps,
    RowLayoutProps,
    // ContainerProps,
    TextProps
} from "@mendix/piw-utils-internal";
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
    values.attributesList.forEach((item: AttributesListPreviewType, index) => {
        if (PROHIBITED_ATTRIBUTES.some(value => value === item.attribute)) {
            errors.push({
                property: `attributesList/${index + 1}/attribute`,
                message: `Widget tries to change ${item.attribute} attribute, this is prohibited`,
                url: "https://docs.mendix.com/appstore/widgets/accessibility-helper"
            });
        }
    });

    return errors;
}

export function getPreview(values: AccessibilityHelperPreviewProps): StructurePreviewProps | null {
    return {
        type: "Container",
        borders: true,
        borderWidth: 1,
        children: [
            {
                type: "RowLayout",
                backgroundColor: values.content.widgetCount > 0 ? undefined : "#F8F8F8",
                children: [
                    {
                        type: "DropZone",
                        property: values.content,
                        placeholder: "Place content here"
                    } as DropZoneProps
                ]
            } as RowLayoutProps,
            {
                type: "RowLayout",
                columnSize: "grow",
                children: [
                    {
                        type: "Container",
                        grow: 1,
                        children: []
                    },
                    {
                        type: "Container",
                        grow: 0,
                        padding: 8,
                        children: [
                            {
                                type: "Text",
                                bold: true,
                                content: buildCaption(values)
                            } as TextProps
                        ]
                    }
                ]
            }
        ]
    };
}

function buildCaption(values: AccessibilityHelperPreviewProps): string {
    if (values.targetSelector.length > 0) {
        if (values.attributesList.length > 0) {
            return `Target ${values.targetSelector}`;
        }
        return "Set [HTML Attributes list]";
    }
    return "Target [Target selector]";
}

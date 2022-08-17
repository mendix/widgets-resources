import { ButtonWebPreviewProps } from "../typings/ButtonWebProps";

import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import { hidePropertiesIn, hidePropertyIn, Properties, transformGroupsIntoTabs } from "@mendix/pluggable-widgets-tools";

export function getProperties(
    values: ButtonWebPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.type !== "link") {
        hidePropertyIn(defaultProperties, values, "href");
    }
    if (!values.openconfirm) {
        hidePropertiesIn(defaultProperties, values, [
            "confirmType",
            "confirmtitle",
            "confirmokText",
            "confirmcancelText",
            "confirmokType",
            "onConfirm",
            "onCancel"
        ]);
    }
    if (!values.advanced) {
        hidePropertiesIn(defaultProperties, values, [
            "confirmokText",
            "confirmcancelText",
            "confirmokType",
            "authPath",
            "block",
            "danger",
            "ghost",
            "shape"
        ]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(values: ButtonWebPreviewProps): StructurePreviewProps {
    return {
        type: "RowLayout",
        columnSize: "fixed",
        children: [
            {
                type: "Container",
                children: [
                    {
                        type: "Container",
                        children: [
                            {
                                type: "Text",
                                content: "Button-" + values.text + "+" + values.type,
                                fontColor: "#000",
                                bold: true,
                                fontSize: 10
                            }
                        ]
                    }
                ],
                padding: 2,
                borders: true
            }
        ]
    };
}

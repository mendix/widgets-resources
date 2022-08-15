import {
    ContainerProps,
    ImageProps,
    RowLayoutProps,
    StructurePreviewProps,
    TextProps
} from "@mendix/piw-utils-internal";
import { Properties, transformGroupsIntoTabs, hidePropertiesIn, hidePropertyIn } from "@mendix/pluggable-widgets-tools";

import { ColorPickerPreviewProps } from "../typings/ColorPickerProps";
import StructurePreviewSvg from "./assets/structure-preview.svg";
import StructurePreviewSvgDark from "./assets/structure-preview-dark.svg";

const defaultColorTypes = ["block", "sketch", "circle", "compact", "twitter"];

export function getProperties(
    values: ColorPickerPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (!values.advanced) {
        hidePropertiesIn(defaultProperties, values, ["type", "defaultColors", "format"]);
    }
    if (values.mode === "inline") {
        hidePropertyIn(defaultProperties, values, "invalidFormatMessage");
    }
    if (!defaultColorTypes.includes(values.type)) {
        hidePropertyIn(defaultProperties, values, "defaultColors");
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

function getRectangleSvg(isDarkMode: boolean): string {
    return `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="16" height="16" fill="${
        isDarkMode ? "#579BF9" : "#3A65E5"
    }"/></svg>`;
}

export const getPreview = (values: ColorPickerPreviewProps, isDarkMode: boolean): StructurePreviewProps => {
    if (values.mode === "inline") {
        return {
            type: "Image",
            document: decodeURIComponent(
                (isDarkMode ? StructurePreviewSvgDark : StructurePreviewSvg).replace("data:image/svg+xml,", "")
            ),
            height: 250
        };
    }

    const separator = {
        type: "Container",
        padding: 2,
        borders: false,
        grow: 0
    } as ContainerProps;

    const button = {
        type: "RowLayout",
        columnSize: "grow",
        grow: 0,
        backgroundColor: isDarkMode ? "#313131" : "#FFFFFF",
        borders: true,
        borderRadius: 5,
        borderWidth: 1,
        children: [
            ...(values.mode === "popover" ? [separator] : []),
            {
                type: "Container",
                padding: 8,
                children: [
                    {
                        type: "Image",
                        document: getRectangleSvg(isDarkMode),
                        width: 16,
                        height: 16
                    } as ImageProps
                ]
            } as ContainerProps,
            ...(values.mode === "popover" ? [separator] : [])
        ]
    } as RowLayoutProps;

    return {
        type: "RowLayout",
        columnSize: "grow",
        children:
            values.mode === "input"
                ? [
                      {
                          type: "RowLayout",
                          columnSize: "grow",
                          children: [
                              {
                                  type: "Container",
                                  backgroundColor: isDarkMode ? "#313131" : "#FFFFFF",
                                  borders: true,
                                  borderRadius: 5,
                                  borderWidth: 1,
                                  children: [
                                      {
                                          type: "Text",
                                          fontColor: isDarkMode ? "#313131" : "#FFFFFF",
                                          italic: true,
                                          content: "Placeholder"
                                      } as TextProps
                                  ],
                                  grow: 1
                              } as ContainerProps,
                              separator,
                              button
                          ]
                      }
                  ]
                : [
                      button,
                      {
                          type: "Container",
                          grow: 1,
                          children: []
                      }
                  ]
    };
};

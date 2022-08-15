import { SidebarTogglePreviewProps } from "../typings/SidebarToggleProps";
import { ImageProps, StructurePreviewProps, TextProps } from "@mendix/piw-utils-internal";
import { hidePropertyIn, Properties, transformGroupsIntoTabs } from "@mendix/pluggable-widgets-tools";

import HamburgerIcon from "./assets/hamburger.svg";

export function getProperties(
    values: SidebarTogglePreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.renderMode === "button") {
        hidePropertyIn(defaultProperties, values, "role");
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }

    return defaultProperties;
}

export function getPreview(values: SidebarTogglePreviewProps): StructurePreviewProps | null {
    const hasIcon = !!values.icon;
    const hasCaption = !!values.caption;
    return {
        type: "RowLayout",
        columnSize: "grow",
        children: [
            {
                type: "Container",
                children: [
                    {
                        type: "RowLayout",
                        columnSize: "grow",
                        children: [
                            ...(hasIcon
                                ? [
                                      {
                                          type: "Image",
                                          document: decodeURIComponent(
                                              HamburgerIcon.replace("data:image/svg+xml,", "")
                                          ),
                                          height: 13,
                                          width: 13
                                      } as ImageProps
                                  ]
                                : []),
                            {
                                type: "Text",
                                content:
                                    (hasIcon && hasCaption ? "  " : "") +
                                    values.caption +
                                    (!hasCaption && !hasIcon ? "__" : ""),
                                fontColor: hasCaption ? "#FFF" : "#264AE5",
                                bold: true,
                                fontSize: 8
                            } as TextProps
                        ],
                        padding: 8
                    }
                ],
                backgroundColor: "#264AE5",
                borderRadius: 4
            },
            { type: "Container", grow: 2 }
        ]
    };
}

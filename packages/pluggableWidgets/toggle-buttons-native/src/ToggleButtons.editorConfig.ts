import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import { ToggleButtonsPreviewProps } from "../typings/ToggleButtonsProps";

// import toggleButtonSvgDark from "./assets/ToggleButtonDefault.dark.svg";
// import toggleButtonSvgLight from "./assets/ToggleButtonDefault.light.svg";

export function getPreview(_: ToggleButtonsPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    const buttonRadius = 5;
    const buttonPadding = 8;

    return {
        type: "RowLayout",
        backgroundColor: isDarkMode ? "#848484" : "#CED0D3",
        borderRadius: buttonRadius,
        columnSize: "fixed",
        children: [
            {
                type: "RowLayout",
                backgroundColor: "#264AE5",
                columnSize: "grow",
                borderRadius: buttonRadius,
                children: [
                    {
                        type: "Container",
                        grow: 1
                    },
                    {
                        type: "Container",
                        padding: buttonPadding,
                        children: [
                            {
                                type: "Text",
                                fontColor: "#FFFFFF",
                                content: "Button 1"
                            }
                        ]
                    },
                    {
                        type: "Container",
                        grow: 1
                    }
                ]
            },
            {
                type: "RowLayout",
                columnSize: "grow",
                children: [
                    {
                        type: "Container",
                        grow: 1
                    },
                    {
                        type: "Container",
                        padding: buttonPadding,
                        children: [
                            {
                                type: "Text",
                                fontColor: "#FFFFFF",
                                content: "Button 2"
                            }
                        ]
                    },
                    {
                        type: "Container",
                        grow: 1
                    }
                ]
            },
            {
                type: "RowLayout",
                columnSize: "grow",
                children: [
                    {
                        type: "Container",
                        grow: 1
                    },
                    {
                        type: "Container",
                        padding: buttonPadding,
                        children: [
                            {
                                type: "Text",
                                fontColor: "#FFFFFF",
                                content: "Button 3"
                            }
                        ]
                    },
                    {
                        type: "Container",
                        grow: 1
                    }
                ]
            }
        ]
    };
}

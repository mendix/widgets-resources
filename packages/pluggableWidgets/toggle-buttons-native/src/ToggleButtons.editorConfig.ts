import { RowLayoutProps, StructurePreviewProps } from "@mendix/piw-utils-internal";

import { ToggleButtonsPreviewProps } from "../typings/ToggleButtonsProps";

// import toggleButtonSvgDark from "./assets/ToggleButtonDefault.dark.svg";
// import toggleButtonSvgLight from "./assets/ToggleButtonDefault.light.svg";

export function getPreview(_: ToggleButtonsPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    const buttonBorderRadius = 4;
    const buttonFontColor: string = isDarkMode ? "#FFFFFF" : "#000000";
    const buttonActiveFontColor: string = isDarkMode ? "#FFFFFF" : "#FFFFFF";

    const renderButton = (content: string, isActive = false): RowLayoutProps => ({
        type: "RowLayout",
        columnSize: "grow",
        ...(isActive ? { borderRadius: buttonBorderRadius, backgroundColor: isDarkMode ? "#344BCE" : "#264AE5" } : {}),
        children: [
            {
                type: "Container",
                grow: 1
            },
            {
                type: "Container",
                padding: 16,
                children: [
                    {
                        type: "Text",
                        fontSize: 12,
                        fontColor: isActive ? buttonActiveFontColor : buttonFontColor,
                        content
                    }
                ]
            },
            {
                type: "Container",
                grow: 1
            }
        ]
    });

    return {
        type: "RowLayout",
        backgroundColor: isDarkMode ? "#646464" : "#CED0D3",
        borderRadius: buttonBorderRadius,
        columnSize: "fixed",
        children: [renderButton("Button 1", true), renderButton("Button 2"), renderButton("Button 3")]
    };
}

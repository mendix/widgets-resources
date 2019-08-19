import { Platform }                        from "react-native";
import { button, contrast, font, spacing } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Button

    Default Class For Mendix Button Widget
========================================================================== */

export const ActionButton = {
    container: {
        // Ripplecolor and all ViewStyle properties are allowed
        borderWidth: 1,
        borderStyle: "solid",
        rippleColor: contrast.lowest,
        borderColor: button.primary.borderColor,
        backgroundColor: button.primary.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: button.borderRadius,
        ...Platform.select({
            ios: {
                paddingVertical: spacing.smaller,
                paddingHorizontal: spacing.regular,
            },
            android: {
                paddingVertical: spacing.smaller,
                paddingHorizontal: spacing.small,
            },
        }),
    },
    icon: {
        // Size, Color and all ViewStyle properties are allowed
        color: button.primary.color,
        size: font.sizeSmall,
    },
    caption: {
        // All TextStyle properties are allowed
        color: button.primary.color,
        fontSize: font.sizeSmall,
    },
};

// Default style for button inside a header
export const ActionButtonHeader = {
    container: {
        borderColor: button.header.borderColor,
        backgroundColor: button.header.backgroundColor,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    icon: {
        size: font.size,
        color: button.header.color,
    },
    caption: {
        color: button.header.color,
    },
};
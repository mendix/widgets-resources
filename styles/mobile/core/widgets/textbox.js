import { gray, spacing, border, brand, font } from "../variables";
import { Platform } from "react-native";

/* ==========================================================================
    TextBox

    Default Class For Mendix TextBox Widget
========================================================================== */

export const TextBox = {
    label: {
        color: gray.light
    },
    input: {
        color: font.color,
        backgroundColor: "#FFF",
        placeholderTextColor: gray.light,
        selectionColor: gray.lighter,
        borderColor: gray.lightest,
        ...Platform.select({
            ios: {
                padding: spacing.smaller
            },
            android: {
                borderWidth: 1,
                borderRadius: border.radius,
                padding: spacing.small,
                underlineColorAndroid: "transparent"
            }
        })
    },
    inputError: {
        placeholderTextColor: brand.danger,
        selectionColor: brand.danger,
        underlineColorAndroid: "transparent"
    },
    validationMessage: {
        color: brand.danger,
        borderWidth: 1,
        borderRadius: border.radius,
        borderColor: brand.danger,
        backgroundColor: "#FFF",
        padding: spacing.small
    }
};

export const TextBoxVertical = {
    label: {
        ...TextBox.label,
        marginBottom: 5,
        marginLeft: Platform.select({ ios: 0, android: spacing.small })
    },
    input: {
        ...TextBox.input,
        ...Platform.select({
            ios: {
                borderTopWidth: 1,
                borderBottomWidth: 1
            },
            android: {}
        })
    },
    inputError: TextBox.inputError,
    validationMessage: TextBox.validationMessage
};

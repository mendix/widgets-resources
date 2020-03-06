import { Platform } from "react-native";
import { background, brand, contrast, spacing } from "../variables";
import { TextBox, TextBoxVertical } from "./textbox";
//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//
/* ==========================================================================
    CheckBox

    Default Class For Mendix CheckBox Widget
========================================================================== */
export const CheckBox = {
    container: Object.assign(Object.assign({}, TextBox.container), { paddingVertical: spacing.smallest, justifyContent: "center" }),
    label: Object.assign({}, TextBox.label),
    input: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
        backgroundColor: "transparent",
        marginRight: Platform.select({ android: -3 }),
        thumbColorOn: background.primary,
        trackColorOn: brand.success,
        thumbColorOff: contrast.regular,
        trackColorOff: contrast.lower,
    },
    inputDisabled: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
        opacity: Platform.select({ android: 0.5 }),
    },
    inputError: Object.assign(Object.assign({}, TextBox.inputError), { thumbColorOn: background.primary, trackColorOn: brand.danger, thumbColorOff: contrast.lowest, trackColorOff: brand.danger }),
    validationMessage: Object.assign(Object.assign({}, TextBox.validationMessage), { alignSelf: "stretch" }),
};
export const CheckBoxVertical = {
    container: TextBoxVertical.container,
    label: Object.assign({}, TextBoxVertical.label),
    input: Object.assign(Object.assign({}, CheckBox.input), { alignSelf: "flex-start" }),
    inputDisabled: CheckBox.inputDisabled,
    inputError: Object.assign(Object.assign({}, TextBoxVertical.inputError), { thumbColorOn: background.primary, trackColorOn: brand.danger, thumbColorOff: contrast.lowest, trackColorOff: brand.danger }),
    validationMessage: Object.assign(Object.assign({}, TextBoxVertical.validationMessage), { alignSelf: "stretch" }),
};

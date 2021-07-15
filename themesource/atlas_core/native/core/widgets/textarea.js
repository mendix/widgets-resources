var _a, _b, _c, _d, _e, _f;
import { TextBox, TextBoxVertical } from "./textbox";
import { input } from "../../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Text Area

    Default Class For Mendix Text Area Widget
========================================================================== */
export const TextArea = {
    container: {
        // All ViewStyle properties are allowed
        ...TextBox.container
    },
    containerDisabled: {
        // All ViewStyle properties are allowed
        ...TextBox.containerDisabled
    },
    label: {
        // numberOfLines and all TextStyle properties are allowed
        ...TextBox.label,
        lineHeight: input.input.lineHeight,
        height: "100%",
        textAlignVertical: "top",
        paddingVertical: (_a = TextBox.input) === null || _a === void 0 ? void 0 : _a.paddingVertical
    },
    labelDisabled: {
        color: (_b = TextBox.labelDisabled) === null || _b === void 0 ? void 0 : _b.color
    },
    input: {
        // autoCapitalize, placeholderTextColor, selectionColor, underlineColorAndroid and all TextStyle properties are allowed
        ...TextBox.input,
        textAlignVertical: "top",
        paddingTop: (_c = TextBox.input) === null || _c === void 0 ? void 0 : _c.paddingVertical
    },
    inputDisabled: {
        // autoCapitalize, placeholderTextColor, selectionColor, underlineColorAndroid and all TextStyle properties are allowed
        backgroundColor: (_d = TextBox.inputDisabled) === null || _d === void 0 ? void 0 : _d.backgroundColor,
        borderColor: (_e = TextBox.inputDisabled) === null || _e === void 0 ? void 0 : _e.borderColor,
        color: (_f = TextBox.inputDisabled) === null || _f === void 0 ? void 0 : _f.color
    },
    inputFocused: {
    // autoCapitalize, placeholderTextColor, selectionColor, underlineColorAndroid and all TextStyle properties are allowed
    },
    inputError: {
        // autoCapitalize, placeholderTextColor, selectionColor, underlineColorAndroid and all TextStyle properties are allowed
        ...TextBox.inputError
    },
    validationMessage: {
        // All TextStyle properties are allowed
        ...TextBox.validationMessage
    }
};
export const TextAreaVertical = {
    container: TextBoxVertical.container,
    containerDisabled: TextBoxVertical.containerDisabled,
    label: {
        ...TextBoxVertical.label,
        height: undefined,
        paddingVertical: undefined,
        textAlignVertical: undefined
    },
    labelDisabled: {
        ...TextBoxVertical.labelDisabled,
        height: undefined,
        paddingVertical: undefined,
        textAlignVertical: undefined
    },
    input: {
        ...TextBoxVertical.input,
        lineHeight: input.input.lineHeight
    },
    inputDisabled: TextBoxVertical.inputDisabled,
    inputFocused: TextBoxVertical.inputFocused,
    inputError: TextBoxVertical.inputError,
    validationMessage: TextBoxVertical.validationMessage
};

import { TextBox, TextBoxVertical } from "./textbox";
import { TextBoxType }              from "../../types/widgets";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Text Area

    Default Class For Mendix Text Area Widget
========================================================================== */
export const TextArea: TextBoxType = {
    container: {
        // All ViewStyle properties are allowed
        ...TextBox.container,
    },
    label: {
        // numberOfLines and all TextStyle properties are allowed
        ...TextBox.label,
        height: "100%",
        textAlignVertical: "top",
        paddingVertical: TextBox.input?.paddingVertical,
    },
    input: {
        // placeholderTextColor, selectionColor, underlineColorAndroid and all TextStyle properties are allowed
        ...TextBox.input,
        textAlignVertical: "top",
        paddingTop: TextBox.input?.paddingVertical,
    },
    inputDisabled: {
        // placeholderTextColor, selectionColor, underlineColorAndroid and all TextStyle properties are allowed
        backgroundColor: TextBox.inputDisabled?.backgroundColor,
    },
    inputError: {
        // placeholderTextColor, selectionColor, underlineColorAndroid and all TextStyle properties are allowed
        ...TextBox.inputError,
    },
    validationMessage: {
        // All TextStyle properties are allowed
        ...TextBox.validationMessage,
    },
};
export const TextAreaVertical: TextBoxType = {
    container: TextBoxVertical.container,
    label: {
        ...TextBoxVertical.label,
        height: undefined,
        paddingVertical: undefined,
        textAlignVertical: undefined,
    },
    input: TextBoxVertical.input,
    inputError: TextBoxVertical.inputError,
    validationMessage: TextBoxVertical.validationMessage,
};

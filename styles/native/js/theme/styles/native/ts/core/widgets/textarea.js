import { TextBox, TextBoxVertical } from "./textbox";
//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//
/* ==========================================================================
    Text Area

    Default Class For Mendix Text Area Widget
========================================================================== */
export const TextArea = {
    container: Object.assign({}, TextBox.container),
    label: Object.assign({}, TextBox.label, { height: "100%", textAlignVertical: "top", paddingVertical: TextBox.input.paddingVertical }),
    input: Object.assign({}, TextBox.input, { textAlignVertical: "top", paddingTop: TextBox.input.paddingVertical }),
    inputDisabled: {
        // All TextStyle properties are allowed
        backgroundColor: TextBox.inputDisabled.backgroundColor,
    },
    inputError: Object.assign({}, TextBox.inputError),
    validationMessage: Object.assign({}, TextBox.validationMessage),
};
export const TextAreaVertical = {
    container: TextBoxVertical.container,
    label: Object.assign({}, TextBoxVertical.label, { height: null, paddingVertical: null, textAlignVertical: null }),
    input: TextBoxVertical.input,
    inputError: TextBoxVertical.inputError,
    validationMessage: TextBoxVertical.validationMessage,
};

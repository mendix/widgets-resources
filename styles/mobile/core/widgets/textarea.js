import { TextBox } from "./textbox";

/* ==========================================================================
    TextArea

    Default Class For Mendix TextArea Widget
========================================================================== */

export const TextArea = {
    label: TextBox.label,
    input: {
        ...TextBox.input,
        textAlignVertical: "top"
    },
    inputError: TextBox.inputError,
    validationMessage: TextBox.validationMessage
};
export const TextAreaVertical = {
    label: {
        ...TextArea.label,
        marginBottom: 5
    },
    input: TextArea.input,
    inputError: TextArea.inputError,
    validationMessage: TextArea.validationMessage
};

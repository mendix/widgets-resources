var _a, _b, _c;
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
    label: Object.assign(Object.assign({}, TextBox.label), { height: "100%", textAlignVertical: "top", paddingVertical: (_a = TextBox.input) === null || _a === void 0 ? void 0 : _a.paddingVertical }),
    input: Object.assign(Object.assign({}, TextBox.input), { textAlignVertical: "top", paddingTop: (_b = TextBox.input) === null || _b === void 0 ? void 0 : _b.paddingVertical }),
    inputDisabled: {
        // placeholderTextColor, selectionColor, underlineColorAndroid and all TextStyle properties are allowed
        backgroundColor: (_c = TextBox.inputDisabled) === null || _c === void 0 ? void 0 : _c.backgroundColor,
    },
    inputError: Object.assign({}, TextBox.inputError),
    validationMessage: Object.assign({}, TextBox.validationMessage),
};
export const TextAreaVertical = {
    container: TextBoxVertical.container,
    label: Object.assign(Object.assign({}, TextBoxVertical.label), { height: undefined, paddingVertical: undefined, textAlignVertical: undefined }),
    input: TextBoxVertical.input,
    inputError: TextBoxVertical.inputError,
    validationMessage: TextBoxVertical.validationMessage,
};

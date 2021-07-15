var _a, _b, _c, _d;
import { background, font, input } from "../../variables";
import { TextBox, TextBoxVertical } from "./textbox";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Date Picker

    Default Class For Mendix Date Picker Widget
========================================================================== */
export const DatePicker = {
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
        ...TextBox.label
    },
    labelDisabled: {
        // All TextStyle properties are allowed
        ...TextBox.labelDisabled
    },
    pickerIOS: {
        // All ViewStyle properties & "color" (type: string) are allowed
        backgroundColor: background.primary,
        color: font.colorTitle
    },
    pickerBackdropIOS: {
    // All ViewStyle properties are allowed
    },
    pickerTopIOS: {
        // All ViewStyle properties are allowed
        backgroundColor: background.primary
    },
    value: {
        // All TextStyle properties are allowed
        color: input.input.color,
        borderColor: input.input.borderColor,
        backgroundColor: input.input.backgroundColor,
        fontSize: input.input.fontSize,
        lineHeight: input.input.lineHeight,
        fontFamily: font.family,
        borderWidth: input.input.borderWidth,
        borderRadius: input.input.borderRadius,
        textAlignVertical: "center",
        minWidth: input.input.minWidth,
        minHeight: input.input.minHeight,
        paddingHorizontal: input.input.paddingHorizontal,
        paddingVertical: input.input.paddingVertical
    },
    valueDisabled: {
        // All TextStyle properties are allowed
        color: (_a = TextBox.inputDisabled) === null || _a === void 0 ? void 0 : _a.color,
        borderColor: (_b = TextBox.inputDisabled) === null || _b === void 0 ? void 0 : _b.borderColor,
        backgroundColor: (_c = TextBox.inputDisabled) === null || _c === void 0 ? void 0 : _c.backgroundColor
    },
    placeholder: {
        // All TextStyle properties are allowed
        color: input.input.placeholderTextColor
    },
    placeholderDisabled: {
        // All TextStyle properties are allowed
        color: (_d = TextBox.inputDisabled) === null || _d === void 0 ? void 0 : _d.color
    },
    validationMessage: {
        // All TextStyle properties are allowed
        ...TextBox.validationMessage
    }
};
export const DatePickerVertical = {
    container: TextBoxVertical.container,
    containerDisabled: TextBoxVertical.containerDisabled,
    label: TextBoxVertical.label,
    labelDisabled: TextBoxVertical.labelDisabled,
    value: DatePicker.value,
    valueDisabled: DatePicker.valueDisabled,
    placeholder: DatePicker.placeholder,
    validationMessage: TextBoxVertical.validationMessage
};

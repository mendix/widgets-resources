import { TextBox, TextBoxVertical } from './textbox';
import { input } from '../variables';

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Date Picker

    Default Class For Mendix Date Picker Widget
========================================================================== */

export const DatePicker = {
    container: {
        // All ViewStyle properties are allowed
        ...TextBox.container,
    },
    label: {
        // numberOfLines and all TextStyle properties are allowed
        ...TextBox.label,
    },
    value: {
        // All TextStyle properties are allowed
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,

        fontSize: input.fontSize,
        borderWidth: input.borderWidth,
        borderRadius: input.borderRadius,

        paddingHorizontal: input.paddingHorizontal,
        paddingVertical: input.paddingVertical,
    },
    valueDisabled: {
        // All TextStyle properties are allowed
        backgroundColor: input.disabledBackgroundColor,
    },
    placeholder: {
        // All TextStyle properties are allowed
        color: input.placeholderTextColor,
    },
    placeholderDisabled: {
        // All TextStyle properties are allowed
    },
    validationMessage: {
        // All TextStyle properties are allowed
        ...TextBox.validationMessage,
    },
};

export const DatePickerVertical = {
    container: TextBoxVertical.container,
    label: TextBoxVertical.label,
    value: {
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,

        fontSize: input.fontSize,
        borderRadius: input.borderRadius,
        borderWidth: input.borderWidth,

        paddingHorizontal: input.paddingHorizontal,
        paddingVertical: input.paddingVertical,
    },
    placeholder: {
        color: input.placeholderTextColor,
    },
    validationMessage: TextBoxVertical.validationMessage,
};

import { input } from '../variables';
import { TextBox, TextBoxVertical } from './textbox';

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
        // placeholderTextColor: input.placeholderTextColor,

        fontSize: input.fontSize,
        borderWidth: input.borderWidth,
        borderRadius: input.borderRadius,

        paddingHorizontal: input.paddingHorizontal,
        paddingVertical: input.paddingVertical,
    },
    inputError: {
        // All TextStyle properties are allowed
        color: input.errorColor,
        borderColor: input.errorColor,
        selectionColor: input.errorColor,
        placeholderTextColor: input.errorColor,
        underlineColorAndroid: input.underlineColorAndroid,
    },
    validationMessage: {
        // All TextStyle properties are allowed
        color: input.errorColor,
    },
};

export const DatePickerVertical = {
    container: TextBoxVertical.container,
    label: TextBoxVertical.label,
    value: {
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,
        // placeholderTextColor: input.placeholderTextColor,

        fontSize: input.fontSize,
        borderRadius: input.borderRadius,
        borderWidth: input.borderWidth,

        paddingHorizontal: input.paddingHorizontal,
        paddingVertical: input.paddingVertical,
    },
};

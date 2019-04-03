import { input } from '../variables';
import { Platform } from 'react-native';
import { TextBox, TextBoxVertical } from './textbox';

/* ==========================================================================
    Date Picker

    Default Class For Mendix Date Picker Widget
========================================================================== */

export const DatePicker = {
    container: TextBox.container,
    label: TextBox.label,
    value: {
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

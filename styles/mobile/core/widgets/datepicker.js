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
        borderWidth: Platform.select({ android: input.borderWidth }),
        borderRadius: input.borderRadius,

        paddingHorizontal: Platform.select({ ios: 0, android: input.paddingHorizontal }),
        paddingVertical: Platform.select({ ios: 0, android: input.paddingVertical }),
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
        borderRadius: Platform.select({ android: input.borderRadius }),
        borderWidth: Platform.select({ android: input.borderWidth }),
        borderTopWidth: Platform.select({ ios: input.borderWidth }),
        borderBottomWidth: Platform.select({ ios: input.borderWidth }),

        paddingHorizontal: input.paddingHorizontal,
        paddingVertical: input.paddingVertical,
    },
};

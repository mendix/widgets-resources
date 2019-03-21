import { TextBox, TextBoxVertical } from './textbox';
import {contrast, background } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    DatePicker

    Default Class For Mendix DatePicker Widget
========================================================================== */

export const DatePicker = {
    label: TextBox.label,
    value: {
        color: TextBox.input.color,
        fontSize: TextBox.input.fontSize,
        backgroundColor: TextBox.input.backgroundColor,
        borderRadius: TextBox.input.borderRadius,
        borderWidth: TextBox.input.borderWidth,
        borderColor: TextBox.input.borderColor,
        paddingHorizontal: TextBox.input.paddingHorizontal,
        paddingVertical: TextBox.input.paddingVertical,
    },
};

export const DatePickerVertical = {
    label: TextBoxVertical.label,
    value: {
        ...DatePicker.value,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: contrast.lowest,
                backgroundColor: background.primary,
                maxHeight: 40, //TODO: Needs to be properly fixed
            },
        }),
    },
};

export const DatePickerNoLabel = {
    label: {
        flex: -1,
    },
    value: DatePicker.value,
};

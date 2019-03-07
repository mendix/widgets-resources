import { TextBox, TextBoxVertical } from './textbox';
import { Platform } from 'react-native';
import { spacing, font } from '../variables';

/* ==========================================================================
    CheckBox

    Default Class For Mendix CheckBox Widget
========================================================================== */

//TODO: Horizontal checkbox in vertical form

export const CheckBox = {
    label: TextBox.label,
    input: {
        color: TextBox.input.color,
        fontSize: TextBox.input.fontSize,
        paddingVertical: TextBox.input.paddingVertical,
        paddingHorizontal: TextBox.input.paddingHorizontal,
        ...Platform.select({
            ios: {
                borderTopWidth: 1,
                borderBottomWidth: 1,
            },
            android: {
                backgroundColor: 'transparent',
            },
        }),
    },
    inputError: TextBox.inputError,
    validationMessage: TextBox.validationMessage,
};

export const CheckBoxVertical = {
    label: TextBoxVertical.label,
    input: TextBoxVertical.input,
    inputError: TextBoxVertical.inputError,
    validationMessage: TextBoxVertical.validationMessage,
};
export const CheckBoxNoLabel = {
    label: {
        flex: -1,
    },
    input: CheckBox.input,
    inputError: CheckBox.inputError,
    validationMessage: CheckBox.validationMessage,
};

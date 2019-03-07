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
        color: font.color,
        fontSize: font.size,
        paddingVertical: spacing.smaller,
        paddingHorizontal: spacing.small,
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
    label: {
        ...TextBoxVertical.label,
    },
    input: {
        flex: 1,
        color: TextBoxVertical.input.color,
        fontSize: TextBoxVertical.input.size,
        paddingVertical: TextBoxVertical.input.paddingVertical,
        paddingHorizontal: TextBoxVertical.input.paddingHorizontal,
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

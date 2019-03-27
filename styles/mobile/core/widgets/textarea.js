import { Platform } from 'react-native';
import { TextBox, TextBoxVertical } from './textbox';

/* ==========================================================================
    Text Area

    Default Class For Mendix Text Area Widget
========================================================================== */

export const TextArea = {
    container: TextBox.container,
    label: {
        ...TextBox.label,
        textAlignVertical: 'top',
    },
    input: {
        ...TextBox.input,
        textAlignVertical: Platform.select({ ios: 'top', android: 'top' }),
    },
    inputError: TextBox.inputError,
    validationMessage: TextBox.validationMessage,
};

export const TextAreaVertical = {
    container: TextBoxVertical.container,
    label: TextBoxVertical.label,
    input: TextBoxVertical.input,
    inputError: TextBoxVertical.inputError,
    validationMessage: TextBoxVertical.validationMessage,
};

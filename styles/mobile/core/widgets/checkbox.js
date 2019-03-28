import { Platform } from 'react-native';
import { brand, spacing } from '../variables';
import { TextBox, TextBoxVertical } from './textbox';
import { hexToRGBString } from '../_helperfunctions/calculatecontrast';

/* ==========================================================================
    CheckBox

    Default Class For Mendix CheckBox Widget
========================================================================== */

export const CheckBox = {
    container: {
        ...TextBox.container,
        paddingVertical: spacing.smallest,
    },
    label: TextBox.label,
    input: {
        backgroundColor: 'transparent',
        marginRight: Platform.select({ ios: 0, android: -5 }),
        // tintColor: `rgba(${hexToRGBString(brand.primary)},0.2)`,
        // thumbTintColor: brand.primary,
        // tintColor: Platform.select({ android: `rgba(${hexToRGBString(brand.primary)},0.2)` }),
        // thumbTintColor: Platform.select({ android: brand.primary }),
    },
    inputError: TextBox.inputError,
    validationMessage: TextBox.validationMessage,
};

export const CheckBoxVertical = {
    container: TextBoxVertical.container,
    label: TextBoxVertical.label,
    input: {
        backgroundColor: 'transparent',
    },
    inputError: TextBoxVertical.inputError,
    validationMessage: TextBoxVertical.validationMessage,
};

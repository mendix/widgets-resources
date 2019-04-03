import { Platform } from 'react-native';
import { brand, spacing, contrast } from '../variables';
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
        marginRight: Platform.select({ ios: 0, android: -3 }),
        thumbColorOn: brand.primary,
        trackColorOn: `rgba(${hexToRGBString(brand.primary)},0.2)`,
        thumbColorOff: contrast.low,
        trackColorOff: `rgba(${hexToRGBString(contrast.low)},0.2)`,
    },
    inputError: {
        ...TextBox.inputError,
        thumbColorOn: brand.primary,
        trackColorOn: `rgba(${hexToRGBString(brand.primary)},0.2)`,
        thumbColorOff: contrast.low,
        trackColorOff: `rgba(${hexToRGBString(contrast.low)},0.2)`,
    },
    validationMessage: TextBox.validationMessage,
};

export const CheckBoxVertical = {
    container: TextBoxVertical.container,
    label: TextBoxVertical.label,
    input: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
    },
    inputError: TextBoxVertical.inputError,
    validationMessage: TextBoxVertical.validationMessage,
};

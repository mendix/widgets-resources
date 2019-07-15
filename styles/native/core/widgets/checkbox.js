import { TextBox, TextBoxVertical } from './textbox';
import { brand, contrast, spacing, input, background } from '../variables';
import { Platform } from 'react-native';
import { anyColorToRgbString } from '../_helperfunctions/convertcolors';

/* ==========================================================================
    CheckBox

    Default Class For Mendix CheckBox Widget
========================================================================== */

export const CheckBox = {
    container: {
        // All ViewStyle properties are allowed
        ...TextBox.container,
        paddingVertical: spacing.smallest,
        justifyContent: 'center',
    },
    label: {
        // numberOfLines and all TextStyle properties are allowed
        ...TextBox.label,
        color: input.color,
    },
    input: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
        backgroundColor: 'transparent',
        marginRight: Platform.select({ android: -3 }),
        thumbColorOn: background.primary,
        trackColorOn: brand.success,
        thumbColorOff: background.lowest,
        trackColorOff: contrast.lowest,
    },
    inputDisabled: {
        opacity: Platform.select({ android: 0.5 }),
    },
    inputError: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
        ...TextBox.inputError,
        thumbColorOn: background.primary,
        trackColorOn: brand.danger,
        thumbColorOff: background.lowest,
        trackColorOff: contrast.lowest,
    },
    validationMessage: {
        // All TextStyle properties are allowed
        ...TextBox.validationMessage,
        alignSelf: 'stretch',
    },
};

export const CheckBoxVertical = {
    container: TextBoxVertical.container,
    label: {
        ...TextBoxVertical.label,
        color: input.color,
    },
    input: {
        alignSelf: 'flex-start',
    },
    inputError: TextBoxVertical.inputError,
    validationMessage: TextBoxVertical.validationMessage,
};

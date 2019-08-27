import { TextBox, TextBoxVertical } from './textbox';
import { brand, contrast, spacing, input, background } from '../variables';
import { Platform } from 'react-native';

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

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
    },
    input: {
        alignSelf: 'flex-start',
    },
    inputError: TextBoxVertical.inputError,
    validationMessage: TextBoxVertical.validationMessage,
};

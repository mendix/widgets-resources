import { Platform } from 'react-native';
import { brand, spacing, contrast } from '../variables';
import { TextBox, TextBoxVertical } from './textbox';
import { hexToRgbString } from '../_helperfunctions/calculatecontrast';

/* ==========================================================================
    CheckBox

    Default Class For Mendix CheckBox Widget
========================================================================== */

export const CheckBox = {
    container: {
        // All ViewStyle properties are allowed
        ...TextBox.container,
        paddingVertical: spacing.smallest,
    },
    label: {
        // numberOfLines and all TextStyle properties are allowed
        ...TextBox.label,
    },
    input: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
        backgroundColor: 'transparent',
        marginRight: Platform.select({ android: -3 }),
        thumbColorOn: brand.primary,
        trackColorOn: `rgba(${hexToRgbString(brand.primary)},0.2)`,
        thumbColorOff: contrast.low,
        trackColorOff: `rgba(${hexToRgbString(contrast.low)},0.2)`,
    },
};

export const CheckBoxVertical = {
    container: TextBoxVertical.container,
    label: TextBoxVertical.label,
    input: {
        alignSelf: 'flex-start',
    },
};

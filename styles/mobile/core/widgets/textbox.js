import { Platform } from 'react-native';
import { input, spacing } from '../variables';

/* ==========================================================================
    Text Box

    Default Class For Mendix Text Box Widget
========================================================================== */

export const TextBox = {
    container: {},
    label: {
        color: input.color,
        fontSize: input.fontSize,
        textAlign: input.textAlign,
        numberOfLines: 1,
        marginRight: spacing.small,
    },
    input: {
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,
        selectionColor: input.selectionColor,
        placeholderTextColor: input.placeholderTextColor,
        // underlineColorAndroidColor: input.underlineColorAndroidColor,

        fontSize: input.fontSize,
        borderWidth: input.borderWidth,
        borderRadius: input.borderRadius,

        // paddingTop: Platform.select({ ios: 0 }), // TextArea unexpected spacing
        paddingHorizontal: input.paddingHorizontal,
        paddingVertical: input.paddingVertical,
    },
    inputError: {
        selectionColor: input.errorColor,
        placeholderTextColor: input.errorColor,
        underlineColorAndroid: input.underlineColorAndroid,
    },
    validationMessage: {
        color: input.errorColor,
        borderColor: input.errorColor,
        backgroundColor: input.backgroundColor,
        borderWidth: input.borderWidth,
        borderRadius: input.borderRadius,
        // padding: spacing.small,
    },
};

export const TextBoxVertical = {
    container: {},
    label: {
        color: input.color,
        fontSize: input.fontSize,
        textAlign: input.textAlign,
        marginLeft: spacing.small,
        marginBottom: spacing.smallest,
        numberOfLines: 1,
    },
    input: {
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,
        selectionColor: input.selectionColor,
        placeholderTextColor: input.placeholderTextColor,
        // underlineColorAndroidColor: input.underlineColorAndroidColor,

        fontSize: input.fontSize,
        borderRadius: input.borderRadius,
        borderWidth: input.borderWidth,

        paddingHorizontal: input.paddingHorizontal,
        paddingVertical: input.paddingVertical,
    },
    inputError: TextBox.inputError,
    validationMessage: TextBox.validationMessage,
};

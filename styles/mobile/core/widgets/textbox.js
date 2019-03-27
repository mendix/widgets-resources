import { Platform } from 'react-native';
import { input, spacing } from '../variables';

/* ==========================================================================
    Text Box

    Default Class For Mendix Text Box Widget
========================================================================== */

export const TextBox = {
    container: {
        borderColor: input.borderColor,
        backgroundColor: Platform.select({ ios: input.backgroundColor }),
        borderBottomWidth: Platform.select({ ios: input.borderWidth }),
        paddingHorizontal: Platform.select({ ios: input.paddingHorizontal }),
        paddingVertical: Platform.select({ ios: input.paddingVertical }),
    },
    label: {
        color: input.color,
        fontSize: input.fontSize,
        textAlign: input.textAlign,
        marginRight: Platform.select({ ios: spacing.regular }),
    },
    input: {
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,
        selectionColor: input.selectionColor,
        placeholderTextColor: input.placeholderTextColor,
        underlineColorAndroidColor: input.underlineColorAndroidColor,

        fontSize: input.fontSize,
        borderWidth: Platform.select({ android: input.borderWidth }),
        borderRadius: input.borderRadius,

        paddingTop: Platform.select({ ios: 0 }), // TextArea unexpected spacing
        paddingHorizontal: Platform.select({ ios: 0, android: input.paddingHorizontal }),
        paddingVertical: Platform.select({ ios: 0, android: input.paddingVertical }),
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
    container: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    label: {
        color: input.color,
        fontSize: input.fontSize,
        textAlign: input.textAlign,
        marginLeft: spacing.small,
        marginBottom: spacing.smallest,
    },
    input: {
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,
        selectionColor: input.selectionColor,
        placeholderTextColor: input.placeholderTextColor,
        underlineColorAndroidColor: input.underlineColorAndroidColor,

        fontSize: input.fontSize,
        borderRadius: input.borderRadius,
        borderWidth: Platform.select({ android: input.borderWidth }),
        borderTopWidth: Platform.select({ ios: input.borderWidth }),
        borderBottomWidth: Platform.select({ ios: input.borderWidth }),

        paddingHorizontal: input.paddingHorizontal,
        paddingVertical: input.paddingVertical,
    },
    inputError: TextBox.inputError,
    validationMessage: TextBox.validationMessage,
};

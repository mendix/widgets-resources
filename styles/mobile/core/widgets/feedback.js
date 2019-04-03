import { Platform } from 'react-native';
import { button, contrast, font, input, border, brand, background } from '../variables';
import { hexToRGBString } from '../_helperfunctions/calculatecontrast';

/* ==========================================================================
    Feedback

    Default Class For Mendix Feedback Widget
========================================================================== */

export const com_mendix_widget_native_feedback_Feedback = (Feedback = {
    floatingButton: {
        // All ViewStyle properties
        borderRadius: 0,
        backgroundColor: background.secondary,
        borderTopLeftRadius: button.borderRadius,
        borderBottomLeftRadius: button.borderRadius,
        shadowColor: contrast.lower,
        shadowOpacity: 0.9,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 2,
    },
    dialog: {
        // All ViewStyle properties
        backgroundColor: background.primary,
    },
    title: {
        // All TextStyle properties
        color: font.color,
    },
    textAreaInput: {
        // All TextStyle properties
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,
        selectionColor: input.selectionColor,
        placeholderTextColor: input.placeholderTextColor,
        underlineColorAndroid: input.underlineColorAndroid,

        height: 100,
        fontSize: input.fontSize,
        fontFamily: input.fontFamily,
        borderWidth: input.width,
        borderRadius: input.borderRadius,
        borderTopWidth: input.borderWidth,
        borderBottomWidth: input.borderWidth,
        borderWidth: Platform.select({ android: border.width }),

        textAlignVertical: 'top',
        paddingVertical: input.paddingVertical,
        paddingHorizontal: input.paddingHorizontal,
    },
    switchLabel: {
        // All TextStyle properties
        color: input.color,
        fontSize: input.fontSize,
        fontFamily: input.fontFamily,
    },
    switchInput: {
        // All TextStyle properties
        margin: 0,
        padding: 0,
        marginRight: Platform.select({ ios: 0, android: -5 }),
        trackColor: Platform.select({ android: { true: `rgba(${hexToRGBString(brand.primary)},0.2)` } }),
        thumbColor: Platform.select({ android: brand.primary }),
    },
    button: {
        // Just these 3 properties
        color: brand.primary,
        borderColor: border.color, // Required for IOS
        borderWidth: border.width, // Required for IOS
    },
    activityIndicator: {
        color: font.color,
    },
});

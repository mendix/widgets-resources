import { Platform }                                                 from "react-native";
import { shadeBlendConvert }                                        from "../helpers/_functions/shadeblendconvert.js";
import { background, border, brand, button, contrast, font, input } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Feedback

    Default Class For Mendix Feedback Widget
========================================================================== */

export const com_mendix_widget_native_feedback_Feedback = {
    floatingButton: {
        // All ViewStyle properties are allowed
        borderRadius: 0,
        backgroundColor: background.secondary,
        borderTopLeftRadius: button.borderRadius,
        borderBottomLeftRadius: button.borderRadius,
        elevation: 1.5,
        shadowColor: shadeBlendConvert(-0.2, background.primary),
        shadowOpacity: 0.7,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    dialog: {
        // All ViewStyle properties are allowed
        backgroundColor: background.primary,
    },
    title: {
        // All TextStyle properties are allowed
        color: font.color,
        fontFamily: font.family,
    },
    textAreaInput: {
        // All TextStyle properties are allowed
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,
        selectionColor: input.selectionColor,
        placeholderTextColor: input.placeholderTextColor,
        underlineColorAndroid: input.underlineColorAndroid,

        height: 100,
        fontSize: input.fontSize,
        fontFamily: input.fontFamily,
        borderRadius: input.borderRadius,
        borderTopWidth: input.borderWidth,
        borderBottomWidth: input.borderWidth,
        borderWidth: Platform.select({ android: border.width }),

        textAlignVertical: "top",
        paddingVertical: input.paddingVertical,
        paddingHorizontal: input.paddingHorizontal,
    },
    switchLabel: {
        // All TextStyle properties are allowed
        color: input.color,
        fontSize: input.fontSize,
        fontFamily: input.fontFamily,
    },
    switchInput: {
        // All TextStyle properties are allowed
        margin: 0,
        padding: 0,
        marginRight: Platform.select({ ios: 0, android: -5 }),
        thumbColorOn: background.primary,
        trackColorOn: brand.success,
        thumbColorOff: background.lowest,
        trackColorOff: contrast.lowest,
    },
    button: {
        // Just these 3 properties are allowed
        color: brand.primary,
        borderColor: border.color, // Required for IOS
        borderWidth: border.width, // Required for IOS
    },
    activityIndicator: {
        color: font.color,
    },
};

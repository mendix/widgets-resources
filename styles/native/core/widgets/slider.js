import { Platform }                                         from "react-native";
import { background, border, brand, contrast, font, input } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Slider

    Default Class For Mendix Slider Widget
========================================================================== */

export const com_mendix_widget_native_slider_Slider = {
    container: {
        // All ViewStyle properties are allowed
        alignSelf: "stretch",
    },
    track: {
        // All ViewStyle properties are allowed
        backgroundColor: contrast.lower,
    },
    trackDisabled: {
        // All ViewStyle properties are allowed
        backgroundColor: contrast.lower,
        opacity: Platform.select({ ios: 0.4 }),
    },
    highlight: {
        // All ViewStyle properties are allowed
        backgroundColor: brand.primary,
    },
    highlightDisabled: {
        // All ViewStyle properties are allowed
        backgroundColor: Platform.select({ ios: brand.primary, android: contrast.low }),
    },
    marker: {
        // All ViewStyle properties are allowed
        backgroundColor: background.secondary,
        ...Platform.select({
            ios: {
                width: 30,
                height: 30,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                borderColor: contrast.lowest,
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                width: 20,
                height: 20,
                borderRadius: 10,
                elevation: 3,
                borderColor: border.color,
            },
        }),
    },
    markerActive: {
        // All ViewStyle properties are allowed
        ...Platform.select({
            android: {
                borderWidth: 0,
                width: 34,
                height: 34,
                borderRadius: 17,
            },
        }),
    },
    markerDisabled: {
        // All ViewStyle properties are allowed
        ...Platform.select({
            ios: {
                borderColor: contrast.lowest,
                backgroundColor: background.secondary,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                marginTop: 1,
                borderColor: background.primary,
                backgroundColor: contrast.low,
                borderWidth: 3,
                width: 14,
                height: 14,
                borderRadius: 7,
            },
        }),
    },
    validationMessage: {
        // All TextStyle properties are allowed
        color: input.errorColor,
        fontSize: font.size,
        fontFamily: font.family,
    },
};

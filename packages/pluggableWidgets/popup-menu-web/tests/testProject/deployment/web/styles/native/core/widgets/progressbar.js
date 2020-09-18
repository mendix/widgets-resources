import { Platform } from "react-native";
import { anyColorToRgbString } from "../helpers/_functions/convertcolors";
import { brand, font, input } from "../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Progress Bar

    Default Class For Mendix Progress Bar Widget
========================================================================== */
export const com_mendix_widget_native_progressbar_ProgressBar = {
    container: {
        // All ViewStyle properties are allowed
        alignSelf: "stretch",
    },
    bar: {
        // All ViewStyle properties are allowed
        ...Platform.select({
            ios: {
                borderColor: brand.primary,
            },
            android: {
                borderRadius: 0,
                borderWidth: 0,
                backgroundColor: `rgba(${anyColorToRgbString(brand.primary)},0.2)`,
            },
        }),
    },
    fill: {
        //Only the backgroundColor property is allowed
        backgroundColor: brand.primary,
    },
    validationMessage: {
        // All TextStyle properties are allowed
        color: input.errorColor,
        fontSize: font.size,
        fontFamily: font.family,
    },
};

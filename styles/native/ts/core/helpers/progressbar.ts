import { Platform }            from "react-native";
import { anyColorToRgbString } from "./_functions/convertcolors";
import { brand }               from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Progress Bar

//== Design Properties
//## Helper classes to change the look and feel of the widget
========================================================================== */
// Progress Bar Color
export const progressBarSuccess = {
    bar: {
        borderColor: Platform.select({ ios: brand.success }),
        backgroundColor: Platform.select({ android: `rgba(${anyColorToRgbString(brand.success)},0.2)` }),
    },
    fill: {
        backgroundColor: brand.success,
    },
};

export const progressBarWarning = {
    bar: {
        borderColor: Platform.select({ ios: brand.warning }),
        backgroundColor: Platform.select({ android: `rgba(${anyColorToRgbString(brand.warning)},0.2)` }),
    },
    fill: {
        backgroundColor: brand.warning,
    },
};

export const progressBarDanger = {
    bar: {
        borderColor: Platform.select({ ios: brand.danger }),
        backgroundColor: Platform.select({ android: `rgba(${anyColorToRgbString(brand.danger)},0.2)` }),
    },
    fill: {
        backgroundColor: brand.danger,
    },
};

// Progress Bar Size
export const progressBarSmall = {
    bar: {
        height: 3,
        borderRadius: Platform.select({ ios: 2 }),
    },
};
export const progressBarLarge = {
    bar: {
        height: 10,
        borderRadius: Platform.select({ ios: 8 }),
    },
};

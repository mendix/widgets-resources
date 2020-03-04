import { Platform }        from "react-native";
import { brand, contrast } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Slider

//== Design Properties
//## Helper classes to change the look and feel of the widget
========================================================================== */
// Slider Color
export const sliderSuccess = {
    highlight: {
        backgroundColor: brand.success,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: brand.success, android: contrast.low }),
    },
};
export const sliderWarning = {
    highlight: {
        backgroundColor: brand.warning,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: brand.warning, android: contrast.low }),
    },
};
export const sliderDanger = {
    highlight: {
        backgroundColor: brand.danger,
    },
    highlightDisabled: {
        backgroundColor: Platform.select({ ios: brand.danger, android: contrast.low }),
    },
};

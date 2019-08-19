import { Platform }                    from "react-native";
import { background, brand, contrast } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Segmented Controls

    Default Class For Mendix Segmented Controls Widget
========================================================================== */

export const com_mendix_widget_native_togglebuttons_ToggleButtons = (ToggleButtons = {
    container: {
        // All ViewStyle properties are allowed
        alignSelf: "stretch",
    },
    containerDisabled: {
        opacity: 0.6,
        alignSelf: "stretch",
    },
    button: {
        // All ViewStyle properties are allowed
        backgroundColor: background.primary,
        borderColor: Platform.select({ ios: brand.primary, android: contrast.lower }),
    },
    text: {
        // All TextStyle properties are allowed
        color: Platform.select({ ios: brand.primary, android: contrast.high }),
    },
    activeButton: {
        // All ViewStyle properties are allowed
        ...Platform.select({
            ios: {
                backgroundColor: brand.primary,
                borderColor: brand.primary,
            },
            android: {
                backgroundColor: brand.primary,
                borderColor: brand.primary,
            },
        }),
    },
    activeButtonText: {
        // All TextStyle properties are allowed
    },
});
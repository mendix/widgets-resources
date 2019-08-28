import { Platform }                    from "react-native";
import { background, brand, contrast } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Tab Container

    Default Class For Mendix Tab Container Widget
========================================================================== */

export const TabContainer = {
    container: {
        // All ViewStyle properties are allowed
        flex: 1,
    },
    tabBar: {
        // bounces, pressColor, pressOpacity, scrollEnabled and all ViewStyle properties are allowed
        bounces: true,
        pressColor: contrast.lower,
        pressOpacity: 0.8,
        backgroundColor: background.primary,
        scrollEnabled: false,
    },
    indicator: {
        // All ViewStyle properties are allowed
        backgroundColor: brand.primary,
        height: Platform.select({ ios: 2, android: 2 }),
    },
    tab: {
        // All ViewStyle properties are allowed
    },
    label: {
        // All TextStyle properties are allowed
        color: contrast.highest,
    },
};
import { contrast } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Badge

    Default Class For Mendix Badge Widget
========================================================================== */

export const com_mendix_widget_native_badge_Badge = (Badge = {
    container: {
        // All ViewStyle properties are allowed
        backgroundColor: contrast.lower,
        alignSelf: "center",
    },
    caption: {
        // All TextStyle properties are allowed
        color: contrast.higher,
    },
});
import { brand } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Maps

    Default Class For Mendix Maps Widget
========================================================================== */

export const com_mendix_widget_native_maps_Maps = (Maps = {
    container: {
        // All ViewStyle properties are allowed
        alignSelf: "stretch",
        aspectRatio: 4 / 3,
    },
    marker: {
        //Only color & opacity are allowed
        color: brand.primary,
        opacity: 1,
    },
});
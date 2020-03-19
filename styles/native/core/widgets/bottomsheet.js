import { background, border } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Bottom Sheet

    Default Class For Mendix Bottom Sheet Widget
========================================================================== */


export const com_mendix_widget_native_bottomsheet_BottomSheet = {
    container: {
        // All ViewStyle properties are allowed
        backgroundColor: background.primary,
        flex: 1,
        borderRadius: border.radius,
        elevation: 1.5,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: -4,
        },
    },
};


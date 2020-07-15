import { background, border, contrast } from "../variables";
import { isIphoneWithNotch } from "../helpers/_functions/device";
import { BottomSheetType }    from "../../types/widgets";

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


export const com_mendix_widget_native_bottomsheet_BottomSheet: BottomSheetType = {
    container: {
        // All ViewStyle properties are allowed
        backgroundColor: background.primary,
        borderRadius: border.radius,
        elevation: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: -4,
        },
    },
    containerWhenExpandedFullscreen: {
        // All ViewStyle properties are allowed
        height: "100%",
        alignSelf: "stretch",
        backgroundColor: background.primary,
    },
    modal: {
        // All ViewStyle properties are allowed
        margin: 0,
        justifyContent: "flex-end"
    },
    basicModal: {
        backdrop: {
            // All ViewStyle properties are allowed
            paddingBottom: isIphoneWithNotch ? 24 : 0,
            flex: 1,
            flexDirection: "row",
        },
        container: {
            // All ViewStyle properties are allowed
            flex: 1,
            alignSelf: "flex-end",
            backgroundColor: "#e5e5e5"
        },
        item: {
            // All ViewStyle properties + rippleColor: string
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            rippleColor: contrast.lower,
        },
    },
    modalItems: {
        defaultStyle: {
            // All TextStyle properties are allowed
            fontSize: 16,
            color: "black",
        },
        primaryStyle: {
            // All TextStyle properties are allowed
            fontSize: 16,
            color: "#0595DB",
        },
        dangerStyle: {
            // All TextStyle properties are allowed
            fontSize: 16,
            color: "#ed1c24",
        },
        customStyle: {
            // All TextStyle properties are allowed
            fontSize: 16,
            color: "#76CA02",
        },
    },
};


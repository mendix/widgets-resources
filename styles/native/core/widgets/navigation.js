import { Platform }                  from "react-native";
import { font, navigation, spacing } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    TopBar / BottomBar / ProgressOverlay

    Default Class For Mendix TopBar, BottomBar and ProgressOverlay
========================================================================== */

export const navigationStyle = {
    topBar: {
        backgroundColor: navigation.topBar.backgroundColor,
        backButtonColor: navigation.topBar.backButtonColor,
        titleColor: navigation.topBar.titleColor,
        titleFontSize: font.sizeH4,
        fontFamily: font.family,
        fontWeight: Platform.select({ ios: font.weightBold, android: font.weightNormal }),
    },
    bottomBar: {
        fontSize: font.sizeSmall,
        fontFamily: font.family,
        backgroundColor: navigation.bottomBar.backgroundColor,
        color: navigation.bottomBar.color,
        selectedColor: navigation.bottomBar.selectedColor,
    },
    progressOverlay: {
        background: {
            backgroundColor: `rgba(0, 0, 0, 0.5)`,
        },
        container: {},
        activityIndicator: {
            color: "#FFF",
        },
        text: {
            color: "#FFF",
            marginTop: spacing.small,
            fontSize: font.size,
            fontFamily: font.family,
        },
    },
};

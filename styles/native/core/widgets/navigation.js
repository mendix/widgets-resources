import { Platform }                                      from "react-native";
import { background, brand, contrast, font, navigation } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    TopBar / BottomBar

    Default Class For Mendix TopBar / BottomBar
========================================================================== */

export const navigationStyle = {
    topBar: {
        backgroundColor: navigation.topBar.backgroundColor,
        backButtonColor: navigation.topBar.backButtonColor,
        titleColor: navigation.topBar.titleColor,
        titleFontSize: font.sizeH4,
        fontWeight: Platform.select({ ios: font.weightBold, android: font.weightNormal }),
    },
    bottomBar: {
        fontSize: font.sizeSmall,
        backgroundColor: navigation.bottomBar.backgroundColor,
        color: navigation.bottomBar.color,
        selectedColor: navigation.bottomBar.selectedColor,
    },
};

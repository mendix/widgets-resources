import { background, font, navigation } from "../../../core/variables";

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

export const Layout = {
    sidebar: {
        // All ViewStyle properties are allowed
    },
    statusBar: {
        // Android only
        backgroundColor: navigation.statusBar.backgroundColor,
        barStyle: navigation.statusBar.barStyle,
    },
    header: {
        container: {
            // All ViewStyle properties are allowed
            backgroundColor: navigation.topBar.backgroundColor,
        },
        title: {
            // All TextStyle properties are allowed
            color: navigation.topBar.titleColor,
            fontSize: navigation.topBar.titleFontSize,
            fontFamily: font.family,
            fontWeight: font.weightBold,
        },
        backButtonText: {
            // All TextStyle properties are allowed
            color: navigation.topBar.backButtonColor,
            fontFamily: font.family,
        },
        backButtonIcon: {
            // All ImageStyle properties are allowed
            tintColor: navigation.topBar.backButtonColor,
        },
    },
    container: {
        // All ViewStyle properties are allowed
        backgroundColor: background.primary,
    },
};

export const Page = Layout;

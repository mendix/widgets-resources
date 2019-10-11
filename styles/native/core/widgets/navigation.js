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
    statusBar: {
        // Android only
        backgroundColor: navigation.statusBar.backgroundColor,
        barStyle: navigation.statusBar.barStyle,
    },
    topBar: {
        container: {
            // All ViewStyle properties are allowed
            backgroundColor: navigation.topBar.backgroundColor,
        },
        title: {
            // All TextStyle properties are allowed
            color: navigation.topBar.titleColor,
            fontSize: navigation.topBar.titleFontSize,
            fontFamily: font.family,
            fontWeight: Platform.select({ ios: font.weightBold, android: font.weightNormal }),
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
        // backButtonIconSource: {},
    },
    bottomBar: {
        container: {
            // All ViewStyle properties are allowed
            backgroundColor: navigation.bottomBar.backgroundColor,
        },
        label: {
            // All TextStyle properties are allowed
            color: navigation.bottomBar.color,
            fontFamily: font.family,
            fontSize: navigation.bottomBar.fontSize,

        },
        selectedLabel: {
            // All TextStyle properties are allowed
            color: navigation.bottomBar.selectedTextColor,
            fontFamily: font.family,
            fontSize: navigation.bottomBar.fontSize,
        },
        icon: {
            // All TextStyle properties are allowed
            color: navigation.bottomBar.color,
            fontSize: navigation.bottomBar.fontSize,
        },
        selectedIcon: {
            // All TextStyle properties are allowed
            color: navigation.bottomBar.selectedIconColor,
            fontSize: navigation.bottomBar.fontSize,
        },
    },
    progressOverlay: {
        background: {
            // All ViewStyle properties are allowed
            backgroundColor: navigation.progressOverlay.backgroundColor,
        },
        container: {
            // All ViewStyle properties are allowed

        },
        activityIndicator: {
            // Color, Size & All ViewStyle properties are allowed
            color: navigation.progressOverlay.activityIndicatorColor,
        },
        text: {
            // All TextStyle properties are allowed
            color: navigation.progressOverlay.color,
            marginTop: spacing.small,
            fontFamily: font.family,
            fontSize: navigation.progressOverlay.fontSize,
        },
    },
};

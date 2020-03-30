import { border, font, navigation, spacing } from "../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    TopBar / BottomBar / ProgressOverlay

    Default Class For Mendix TopBar, BottomBar and ProgressOverlay
========================================================================== */
export const navigationStyle = {
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
            fontSize: navigation.bottomBar.iconSize,
        },
        selectedIcon: {
            // All TextStyle properties are allowed
            color: navigation.bottomBar.selectedIconColor,
            fontSize: navigation.bottomBar.iconSize,
        },
    },
    progressOverlay: {
        background: {
            // All ViewStyle properties are allowed
            backgroundColor: navigation.progressOverlay.backgroundColor,
        },
        container: {
            // All ViewStyle properties are allowed
            backgroundColor: navigation.progressOverlay.containerBackgroundColor,
            paddingHorizontal: spacing.largest,
            paddingVertical: spacing.large,
            borderRadius: border.radius,
            elevation: 1.5,
            shadowColor: navigation.progressOverlay.shadowColor,
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: {
                width: 0,
                height: 2,
            },
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

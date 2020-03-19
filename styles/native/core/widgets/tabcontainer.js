import { font, spacing, tabcontainer } from "../variables";

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
        pressColor: tabcontainer.tabBar.pressColor,
        pressOpacity: 0.8,
        backgroundColor: tabcontainer.tabBar.backgroundColor,
        scrollEnabled: false,
        paddingVertical: spacing.smaller,
    },
    indicator: {
        // All ViewStyle properties are allowed
        backgroundColor: tabcontainer.indicator.backgroundColor,
        height: tabcontainer.indicator.height,
    },
    tab: {
        // All ViewStyle properties are allowed
        paddingVertical: spacing.smaller,
    },
    label: {
        // All TextStyle properties are allowed
        color: tabcontainer.label.color,
        fontFamily: font.family,
        fontWeight: tabcontainer.label.fontWeight,
        textTransform: tabcontainer.label.textTransform,
    },
    activeLabel: {
        // All TextStyle properties are allowed
        color: tabcontainer.activeLabel.color,
        fontFamily: font.family,
        fontWeight: tabcontainer.activeLabel.fontWeight,
        textTransform: tabcontainer.activeLabel.textTransform,
    },
};

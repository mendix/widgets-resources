import { isIphoneWithNotch } from "../helpers/_functions/device";
import { background, button, contrast, font, spacing } from "../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Intro Screen

    Default Class For Mendix Intro Screen Widget
========================================================================== */
// Button styles when the chose to show the indicator above the buttons
export const introScreenButtonPaginationAbove = {
    container: {
        // Ripplecolor and all ViewStyle properties are allowed
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.regular,
        backgroundColor: button.primary.backgroundColor,
    },
    icon: {
        // Size and color are allowed
        color: button.primary.color,
        size: button.fontSizeIcon,
    },
    caption: {
        // All TextStyle properties are allowed
        color: button.primary.color,
        fontSize: button.fontSize,
        fontFamily: font.family,
        fontWeight: font.weightBold,
        textTransform: "uppercase",
        paddingHorizontal: spacing.smallest,
    },
};
// Button styles when the chose to show the indicator between the buttons
export const introScreenButtonPaginationBetween = {
    container: {
        // Ripplecolor and all ViewStyle properties are allowed
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        // Size and color are allowed
        color: font.color,
        size: button.fontSizeIcon,
    },
    caption: {
        // All TextStyle properties are allowed
        color: font.color,
        fontSize: button.fontSize,
        fontFamily: font.family,
        fontWeight: font.weightBold,
        textTransform: "uppercase",
        paddingHorizontal: spacing.smallest,
    },
};
// Default styles
export const com_mendix_widget_native_introscreen_IntroScreen = {
    fullscreenContainer: {
        // All ViewStyle properties are allowed
        backgroundColor: background.primary,
    },
    popupContainer: {
        // All ViewStyle properties are allowed
        paddingVertical: 150,
        paddingHorizontal: 50,
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
    },
    // Pagination styles
    paginationContainer: {
        // All ViewStyle properties are allowed
        position: "absolute",
        left: 0,
        right: 0,
        bottom: isIphoneWithNotch ? 22 : 0,
        justifyContent: "space-between",
        alignItems: "center",
    },
    paginationText: {
        // All TextStyle properties are allowed
        color: font.color,
        fontSize: font.size,
        fontFamily: font.family,
    },
    dotStyle: {
        // All ViewStyle properties are allowed
        backgroundColor: contrast.lower,
        transform: [{ scale: 0.5 }],
    },
    activeDotStyle: {
        // All ViewStyle properties are allowed
        backgroundColor: background.brandPrimary,
    },
    // Button styles
    paginationAbove: {
        buttonsContainer: {
            // All ViewStyle properties are allowed
            flex: 1,
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
        },
        buttonSkip: introScreenButtonPaginationAbove,
        buttonPrevious: introScreenButtonPaginationAbove,
        buttonNext: introScreenButtonPaginationAbove,
        buttonDone: introScreenButtonPaginationAbove,
    },
    paginationBetween: {
        buttonSkip: introScreenButtonPaginationBetween,
        buttonPrevious: introScreenButtonPaginationBetween,
        buttonNext: introScreenButtonPaginationBetween,
        buttonDone: introScreenButtonPaginationBetween,
    },
};

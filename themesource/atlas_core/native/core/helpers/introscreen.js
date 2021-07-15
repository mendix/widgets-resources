import { backgroundDefaults, brand, fontDefaults } from "../../variables";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Intro Screen

//== Design Properties
//## Helper classes to change the look and feel of the widget
========================================================================== */
//
//
// == Extra Classes
// ## Helper classes to change the look and feel of the widget
// -------------------------------------------------------------------------------------------------------------------//
const introScreenButton = {
    icon: {
        // Size and color are allowed
        color: fontDefaults.colorTitleDark
    },
    caption: {
        // All TextStyle properties are allowed
        color: fontDefaults.colorTitleDark
    }
};
export const introScreenLightMode = {
    fullscreenContainer: {
        // All ViewStyle properties are allowed
        backgroundColor: backgroundDefaults.primaryLight
    },
    popupContainer: {
        // All ViewStyle properties are allowed
        backgroundColor: backgroundDefaults.primaryLight
    },
    paginationText: {
        // All TextStyle properties are allowed
        color: fontDefaults.colorTitleLight
    },
    dotStyle: {
        // All ViewStyle properties are allowed
        backgroundColor: fontDefaults.colorDisabledLight
    },
    activeDotStyle: {
        // All ViewStyle properties are allowed
        backgroundColor: backgroundDefaults.secondaryDark
    },
    // Button styles
    paginationAbove: {
        buttonSkip: introScreenButton,
        buttonPrevious: introScreenButton,
        buttonNext: introScreenButton,
        buttonDone: introScreenButton
    },
    paginationBetween: {
        buttonSkip: introScreenButton,
        buttonPrevious: introScreenButton,
        buttonNext: introScreenButton,
        buttonDone: introScreenButton
    }
};
// Background colors
export const introScreenBackgroundBrandPrimary = {
    fullscreenContainer: {
        // All ViewStyle properties are allowed
        backgroundColor: brand.primary
    },
    popupContainer: {
        // All ViewStyle properties are allowed
        backgroundColor: brand.primary
    }
};

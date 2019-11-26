import { NativeModules, Platform }                     from "react-native";
import adjustFont                                      from "../core/helpers/_functions/adjustfont";
import { setColorBasedOnBackground, setContrastScale } from "../core/helpers/_functions/convertcolors";

/*
==> You can find a copy of the core variables below. (From styles/native/core/variables.js)
==> You can freely change any value in this file.
==> DO NOT change the core variable file (or any other file in core), as that makes updating Atlas a lot harder in the future.
*/

//== Global variables
//## Variables to be used during styling
//-------------------------------------------------------------------------------------------------------------------//
// Brand Style
export const brand = {
    primary: "#0595DB",
    success: "#76CA02",
    warning: "#f99b1d",
    danger: "#ed1c24",
};

// Dark Mode - Inherits OS theme if possible
export const darkMode = NativeModules && NativeModules.RNDarkMode && NativeModules.RNDarkMode.initialMode
                        ? NativeModules.RNDarkMode.initialMode === "dark"
                        : false;

// Background Colors
const backgroundColor = darkMode ? "#000" : "#FFF";
const backgroundSecondaryContrast = darkMode ? 0.11 : 0.03;

export const background = {
    primary: backgroundColor,
    secondary: setContrastScale(backgroundSecondaryContrast, backgroundColor),
};

// Contrast (Gray) colors based on background.primary
export const contrast = {
    highest: setContrastScale(0.95, background.primary),
    higher: setContrastScale(0.8, background.primary),
    high: setContrastScale(0.65, background.primary),
    regular: setContrastScale(0.5, background.primary),
    low: setContrastScale(0.35, background.primary),
    lower: setContrastScale(0.2, background.primary),
    lowest: setContrastScale(0.05, background.primary),
};

// Border Style
export const border = {
    color: setContrastScale(0.17, background.primary),
    width: 1,
    radius: 5,
};

// Font Styles
export const font = {
    size: adjustFont(14),
    sizeSmall: adjustFont(12),
    sizeLarge: adjustFont(18),
    sizeH1: adjustFont(31),
    sizeH2: adjustFont(26),
    sizeH3: adjustFont(24),
    sizeH4: adjustFont(18),
    sizeH5: adjustFont(14),
    sizeH6: adjustFont(12),
    color: setColorBasedOnBackground(background.primary),
    weightLight: "100",
    weightNormal: "normal",
    weightSemiBold: "600",
    weightBold: "bold",
    family: Platform.select({ ios: "System", android: "normal" }),
};

// Spacing
export const spacing = {
    smallest: 5,
    smaller: 10,
    small: 15,
    regular: 20,
    large: 25,
    larger: 30,
    largest: 40,
};

// Button Styles
export const button = {
    fontSize: font.sizeSmall,
    fontSizeIcon: font.size,
    fontSizeIconSmall: font.sizeSmall,
    fontSizeIconLarge: font.sizeLarge,
    borderRadius: border.radius,
    paddingVertical: spacing.smaller,
    paddingHorizontal: spacing.regular,

    header: {
        color: brand.primary,
        borderColor: "transparent",
        backgroundColor: "transparent",
        fontSize: font.size,
        fontSizeIcon: font.size,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    primary: {
        color: "#FFF",
        borderColor: brand.primary,
        backgroundColor: brand.primary,
    },
    secondary: {
        color: brand.primary,
        borderColor: brand.primary,
        backgroundColor: "transparent",
    },
    success: {
        color: "#FFF",
        borderColor: brand.success,
        backgroundColor: brand.success,
    },
    warning: {
        color: "#FFF",
        borderColor: brand.warning,
        backgroundColor: brand.warning,
    },
    danger: {
        color: "#FFF",
        borderColor: brand.danger,
        backgroundColor: brand.danger,
    },
};

//Input Styles
export const input = {
    // Colors
    color: font.color,
    errorColor: brand.danger,
    labelColor: font.color,
    borderColor: contrast.lower,
    backgroundColor: background.primary,
    disabledBackgroundColor: contrast.lowest,
    selectionColor: contrast.lower,
    placeholderTextColor: contrast.regular,
    underlineColorAndroid: "transparent",

    // Sizes
    fontSize: font.size,
    fontFamily: font.family,
    borderWidth: border.width,
    borderRadius: border.radius,

    // Alignment
    textAlign: "left",
    paddingHorizontal: spacing.smaller,
    paddingVertical: spacing.small,
};

// Navigation Styles
export const navigation = {
    statusBar: {
        backgroundColor: background.primary,
        barStyle: darkMode ? "light-content" : "dark-content",
    },
    topBar: {
        backgroundColor: background.primary,
        backButtonColor: contrast.highest,
        titleColor: contrast.highest,
        titleFontSize: Platform.select({ android: font.sizeH4, ios: font.sizeH5 }),
    },
    bottomBar: {
        color: contrast.high,
        selectedTextColor: contrast.high,
        selectedIconColor: brand.primary,
        backgroundColor: background.primary,
        fontSize: font.sizeSmall,
        iconSize: font.sizeSmall,
    },
    progressOverlay: {
        color: "#FFF",
        activityIndicatorColor: "#FFF",
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
        fontSize: font.size,
    },
};

// Listview Styles
export const listview = {
    border: {
        color: border.color,
        width: border.width,
    },
};

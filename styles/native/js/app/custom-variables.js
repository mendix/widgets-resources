import { NativeModules, Platform } from "react-native";
import adjustFont from "../core/helpers/_functions/adjustfont";
import { anyColorToRgbString, setContrastScale } from "../core/helpers/_functions/convertcolors";
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
    primary: "#264AE5",
    success: "#77DD77",
    warning: "#FFD355",
    danger: "#FF6161",
    info: "#0086D9",
    primaryLight: `rgba(${anyColorToRgbString("#264AE5")}, 0.14)`,
    successLight: `rgba(${anyColorToRgbString("#77DD77")}, 0.14)`,
    warningLight: `rgba(${anyColorToRgbString("#FFD355")}, 0.14)`,
    dangerLight: `rgba(${anyColorToRgbString("#FF6161")}, 0.14)`,
    infoLight: `rgba(${anyColorToRgbString("#0086D9")}, 0.14)`,
};
//
// Dark Mode - Inherits OS theme if possible
export const darkMode = NativeModules && NativeModules.RNDarkMode && NativeModules.RNDarkMode.initialMode
    ? NativeModules.RNDarkMode.initialMode === "dark"
    : false;
//
// Background Colors
//
// const backgroundColor = darkMode ? "#000" : "#FFF";
// const backgroundColorInversed = darkMode ? "#FFF" : "#000";
//
export const background = {
    primary: "#FFF",
    // semantic: setContrastScale(0.08, backgroundColor),
    surface: "#F8F8F8",
    gray: "#F8F8F8",
    brandPrimary: brand.primary,
    brandSuccess: brand.success,
    brandWarning: brand.warning,
    brandDanger: brand.danger,
};
//
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
//
// Border Style
export const border = {
    color: "#CED0D3",
    width: 1,
    radius: 4,
};
//
// Font Styles
export const font = {
    size: adjustFont(14),
    sizeSmall: adjustFont(12),
    sizeLarge: adjustFont(16),
    sizeH1: adjustFont(40),
    sizeH2: adjustFont(34),
    sizeH3: adjustFont(28),
    sizeH4: adjustFont(24),
    sizeH5: adjustFont(20),
    sizeH6: adjustFont(16),
    lineHeight: adjustFont(14) * 1.5,
    lineHeightSmall: adjustFont(12) * 1.5,
    lineHeightLarge: adjustFont(16) * 1.5,
    lineHeightH1: adjustFont(40) * 1.5,
    lineHeightH2: adjustFont(34) * 1.5,
    lineHeightH3: adjustFont(28) * 1.5,
    lineHeightH4: adjustFont(24) * 1.5,
    lineHeightH5: adjustFont(20) * 1.5,
    lineHeightH6: adjustFont(16) * 1.5,
    colorTitle: "#0A1325",
    colorParagraph: "#6C717C",
    colorDisabled: "#9DA1A8",
    weightLight: "100",
    weightNormal: "normal",
    weightSemiBold: "600",
    weightBold: "bold",
    family: Platform.select({ ios: "System", android: "normal" }),
};
//
// Spacing
export const spacing = {
    smallest: 2,
    smaller: 4,
    small: 8,
    regular: 16,
    large: 24,
    larger: 32,
    largest: 40,
};
//
// Button Styles
export const button = {
    fontSize: font.sizeSmall,
    fontSizeLarge: font.size,
    fontWeight: font.weightBold,
    fontSizeIcon: font.sizeSmall,
    fontSizeIconLarge: font.size,
    borderRadius: border.radius,
    minWidth: 48,
    minHeight: 48,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
    header: {
        color: contrast.highest,
        borderColor: "transparent",
        backgroundColor: "transparent",
        fontSize: font.sizeSmall,
        fontSizeIcon: font.sizeSmall,
        paddingLeft: 0,
        paddingRight: 10,
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
        inversedColor: "#FFF",
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
//
// Input Styles
export const input = {
    label: {
        numberOfLines: 1,
        color: font.colorTitle,
        fontSize: font.size,
        textAlign: "left",
    },
    input: {
        color: font.colorTitle,
        borderColor: contrast.lower,
        backgroundColor: background.primary,
        selectionColor: contrast.lower,
        placeholderTextColor: contrast.regular,
        fontSize: font.size,
        lineHeight: font.lineHeight,
        borderWidth: border.width,
        borderRadius: border.radius,
        minWidth: 48,
        minHeight: 48,
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.small,
    },
    inputDisabled: {
        backgroundColor: contrast.lowest,
    },
    inputError: {
        color: brand.danger,
        borderColor: brand.danger,
        placeholderTextColor: brand.danger,
    },
    validationMessage: {
        color: brand.danger,
        fontSize: font.size,
    },
};
export const image = {
    avatar: {
        small: 24,
        medium: 40,
        large: 56,
        larger: 72,
    },
    icon: 24,
};
//
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
        color: font.colorTitle,
        activityIndicatorColor: font.colorTitle,
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
        containerBackgroundColor: background.surface,
        shadowColor: "#000",
        fontSize: font.size,
    },
};
//
// Tabcontainer Styles
export const tabContainer = {
    tabBar: {
        pressColor: contrast.lower,
        backgroundColor: background.primary,
    },
    tab: {
        paddingVertical: spacing.small,
    },
    indicator: {
        backgroundColor: brand.primary,
        height: Platform.select({ ios: 2, android: 2 }),
    },
    label: {
        color: contrast.highest,
        fontSize: font.size,
        fontWeight: font.weightBold,
        textTransform: "uppercase",
    },
    activeLabel: {
        color: brand.primary,
        fontSize: font.size,
        fontWeight: font.weightBold,
        textTransform: "uppercase",
    },
};
//
// ListView Styles
export const listView = {
    border: {
        color: border.color,
        width: border.width,
    },
};
//
// Layoutgrid Styles
export const layoutGrid = {
    gutterSize: 15,
};
//
//
//== Pluggable Widgets
//-------------------------------------------------------------------------------------------------------------------//
// Badge Styles
export const badge = {
    fontWeight: font.weightBold,
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: spacing.smaller,
    default: {
        color: contrast.higher,
        backgroundColor: contrast.lower,
    },
    primary: {
        color: brand.primary,
        backgroundColor: brand.primaryLight,
    },
    success: {
        color: brand.success,
        backgroundColor: brand.successLight,
    },
    warning: {
        color: brand.warning,
        backgroundColor: brand.warningLight,
    },
    danger: {
        color: brand.danger,
        backgroundColor: brand.dangerLight,
    },
};

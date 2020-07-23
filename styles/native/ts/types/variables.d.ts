/* ==========================================================================
    Types
========================================================================== */

declare type FontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
declare type TextAlign = "auto" | "left" | "right" | "center" | "justify";
declare type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase";

export interface VariablesBrand {
    primary: string,
    success: string,
    warning: string,
    danger: string,
    info: string,
    primaryLight: string,
    successLight: string,
    warningLight: string,
    dangerLight: string,
    infoLight: string,
}

export interface VariablesBackground {
    primary: string,
    // semantic: string,
    surface: string,
    gray: string,
    brandPrimary: string,
    brandSuccess: string,
    brandWarning: string,
    brandDanger: string,
}

export interface VariablesContrast {
    highest: string,
    higher: string,
    high: string,
    regular: string,
    low: string,
    lower: string,
    lowest: string,
}

export interface VariablesBorder {
    color: string,
    width: number,
    radius: number,
}

export interface VariablesFont {
    size: number,
    sizeSmall: number,
    sizeLarge: number,
    sizeH1: number,
    sizeH2: number,
    sizeH3: number,
    sizeH4: number,
    sizeH5: number,
    sizeH6: number,
    lineHeight: number,
    lineHeightSmall: number,
    lineHeightLarge: number,
    lineHeightH1: number,
    lineHeightH2: number,
    lineHeightH3: number,
    lineHeightH4: number,
    lineHeightH5: number,
    lineHeightH6: number,
    colorTitle: string,
    colorParagraph: string,
    colorDisabled: string,
    weightLight: FontWeight,
    weightNormal: FontWeight,
    weightSemiBold: FontWeight,
    weightBold: FontWeight,
    family: string,
}

export interface VariablesSpacing {
    smallest: number,
    smaller: number,
    small: number,
    regular: number,
    large: number,
    larger: number,
    largest: number,
}

interface VariablesButtonStyles {
    color: string,
    borderColor: string,
    backgroundColor: string,
    inversedColor?: string,
}

export interface VariablesButton {
    fontSize: number,
    fontSizeLarge: number,
    fontWeight: FontWeight,
    fontSizeIcon: number,
    fontSizeIconLarge: number,
    borderRadius: number,

    minWidth: number,
    minHeight: number,
    paddingVertical: number,
    paddingHorizontal: number,

    header: {
        color: string,
        borderColor: string,
        backgroundColor: string,
        fontSize: number,
        fontSizeIcon: number,
        paddingLeft: number,
        paddingRight: number,
    },

    primary: VariablesButtonStyles,
    secondary: VariablesButtonStyles,
    success: VariablesButtonStyles,
    warning: VariablesButtonStyles,
    danger: VariablesButtonStyles,
}

export interface VariablesInput {
    label: {
        numberOfLines: number,
        color: string,
        fontSize: number,
        textAlign: TextAlign,
    },
    input: {
        color: string,
        borderColor: string,
        backgroundColor: string,
        selectionColor: string,
        placeholderTextColor: string,

        fontSize: number,
        lineHeight: number,
        borderWidth: number,
        borderRadius: number,

        minWidth: number,
        minHeight: number,
        paddingVertical: number,
        paddingHorizontal: number,
    },
    inputDisabled: {
        backgroundColor: string,
    },
    inputError: {
        color: string,
        borderColor: string,
        placeholderTextColor: string
    },
    validationMessage: {
        color: string,
        fontSize: number
    },
}

export interface VariablesImage {
    avatar: {
        small: number,
        medium: number,
        large: number,
        larger: number,
    },
    icon: number
}

export interface VariablesNavigation {
    statusBar: {
        backgroundColor: string,
        barStyle: "light-content" | "dark-content",
    },
    topBar: {
        backgroundColor: string,
        backButtonColor: string,
        titleColor: string,
        titleFontSize: number,
    },
    bottomBar: {
        color: string,
        selectedTextColor: string,
        selectedIconColor: string,
        backgroundColor: string,
        fontSize: number,
        iconSize: number,
    },
    progressOverlay: {
        color: string,
        activityIndicatorColor: string,
        backgroundColor: string,
        containerBackgroundColor: string,
        shadowColor: string,
        fontSize: number
    }
}

export interface VariablesTabContainer {
    tabBar: {
        pressColor: string,
        backgroundColor: string,
    },
    tab: {
        paddingVertical: number,
    }
    indicator: {
        backgroundColor: string,
        height: number
    },
    label: {
        color: string,
        fontSize: number,
        fontWeight: FontWeight,
        textTransform: TextTransform
    }
    activeLabel: {
        color: string,
        fontSize: number,
        fontWeight: FontWeight,
        textTransform: TextTransform
    },
}

export interface VariablesListView {
    border: {
        color: string,
        width: number
    }
}

export interface VariablesLayoutgrid {
    gutterSize: number
}


//## Pluggable Widgets
//-------------------------------------------------------------------------------------------------------------------//

interface VariablesBadgeStyles {
    color: string,
    backgroundColor: string
}

export interface VariablesBadge {
    fontWeight: FontWeight,
    borderRadius: number,
    paddingVertical: number,
    paddingHorizontal: number,

    default: VariablesBadgeStyles,
    primary: VariablesBadgeStyles,
    success: VariablesBadgeStyles,
    warning: VariablesBadgeStyles,
    danger: VariablesBadgeStyles,
}

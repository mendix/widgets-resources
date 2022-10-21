/* ==========================================================================
    Types
========================================================================== */

import { TextStyle, ViewStyle } from "react-native";
import { CheckBoxInputType, GradientColorList } from "./widgets";

declare type FontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
declare type TextAlign = "auto" | "left" | "right" | "center" | "justify";
declare type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase";

interface InputStyleProps {
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    placeholderTextColor?: string;
    selectionColor?: string;
    underlineColorAndroid?: string;
}

interface InputStyle extends TextStyle, InputStyleProps {}

export interface VariablesBrand {
    primary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    primaryLight: string;
    successLight: string;
    warningLight: string;
    dangerLight: string;
    infoLight: string;
}

export interface VariablesBackgroundDefaults {
    primaryLight: string;
    primaryDark: string;
    secondaryLight: string;
    secondaryDark: string;
}

export interface VariablesBackground {
    primary: string;
    secondary: string;
    brandPrimary: string;
    brandSuccess: string;
    brandWarning: string;
    brandDanger: string;
    brandInfo: string;
}

export interface VariablesContrast {
    highest: string;
    higher: string;
    high: string;
    regular: string;
    low: string;
    lower: string;
    lowest: string;
}

export interface VariablesBorder {
    color: string;
    width: number;
    radiusSmall: number;
    radiusLarge: number;
    radiusLargest: number;
}

export interface VariablesFontDefaults {
    colorTitleLight: string;
    colorTitleDark: string;
    colorParagraphLight: string;
    colorParagraphDark: string;
    colorDisabledLight: string;
    colorDisabledDark: string;
}

export interface VariablesFont {
    size: number;
    sizeSmallest: number;
    sizeSmall: number;
    sizeLarge: number;
    sizeLargest: number;
    sizeH1: number;
    sizeH2: number;
    sizeH3: number;
    sizeH4: number;
    sizeH5: number;
    sizeH6: number;
    lineHeight: number;
    lineHeightSmallest: number;
    lineHeightSmall: number;
    lineHeightLarge: number;
    lineHeightLargest: number;
    lineHeightH1: number;
    lineHeightH2: number;
    lineHeightH3: number;
    lineHeightH4: number;
    lineHeightH5: number;
    lineHeightH6: number;
    colorTitle: string;
    colorParagraph: string;
    colorDisabled: string;
    weightLight: FontWeight;
    weightNormal: FontWeight;
    weightSemiBold: FontWeight;
    weightBold: FontWeight;
    family: string;
}

export interface VariablesSpacing {
    smallest: number;
    smaller: number;
    small: number;
    regular: number;
    large: number;
    larger: number;
    largest: number;
}

interface VariablesButtonStyles {
    color: string;
    borderColor: string;
    backgroundColor: string;
    inversedColor?: string;
}

export interface VariablesButton {
    container: {
        rippleColor: string;
        borderRadius: number;
        minWidth: number;
        minHeight: number;
        paddingVertical: number;
        paddingHorizontal: number;
    };
    containerDisabled: {
        borderColor: string;
        backgroundColor: string;
    };
    icon: {
        size: number;
    };
    iconDisabled: {
        color: string;
    };
    caption: {
        fontSize: number;
        fontWeight: FontWeight;
    };
    captionDisabled: {
        color: string;
    };

    header: {
        color: string;
        borderColor: string;
        backgroundColor: string;
        fontSize: number;
        fontSizeIcon: number;
        paddingLeft: number;
        paddingRight: number;
    };

    primary: VariablesButtonStyles;
    secondary: VariablesButtonStyles;
    success: VariablesButtonStyles;
    warning: VariablesButtonStyles;
    danger: VariablesButtonStyles;
}

export interface VariablesInput {
    label: {
        numberOfLines: number;
        color: string;
        fontSize: number;
        textAlign: TextAlign;
    };
    labelDisabled: {
        color: string;
    };
    input: {
        color: string;
        borderColor: string;
        backgroundColor: string;
        selectionColor: string;
        placeholderTextColor: string;

        fontSize: number;
        lineHeight: number;
        borderWidth: number;
        borderRadius: number;

        minWidth: number;
        minHeight: number;
        paddingVertical: number;
        paddingHorizontal: number;
    };
    inputContainer: {
        underlayColor: string;
    };
    inputDisabled: {
        color: string;
        borderColor: string;
        backgroundColor: string;
    };
    inputError: {
        color: string;
        borderColor: string;
        placeholderTextColor: string;
        backgroundColor: string;
    };
    validationMessage: {
        color: string;
        fontSize: number;
    };

    // Dropdown & Reference selector only
    valueContainer: {
        rippleColor: string;
    };
    itemContainer: {
        paddingVertical: number;
        paddingHorizontal: number;
        backgroundColor: string;
    };
    item: {
        color: string;
        fontSize: number;
    };
    selectedItemContainer: {
        borderWidth: number;
        borderRadius: number;
        borderColor: string;
        backgroundColor: string;
    };
    selectedItem: {
        color: string;
        fontSize: number;
    };
}

export interface VariablesImage {
    image: {
        small: number;
        medium: number;
        large: number;
        larger: number;
    };
    imageDisabled: {
        opacity: number;
    };
    icon: number;
}

export interface VariablesNavigation {
    statusBar: {
        backgroundColor: string;
        barStyle: "light-content" | "dark-content";
    };
    topBar: {
        backgroundColor: string;
        backButtonColor: string;
        titleColor: string;
        titleFontSize: number;
    };
    bottomBar: {
        color: string;
        selectedTextColor: string;
        selectedIconColor: string;
        backgroundColor: string;
        fontSize: number;
        iconSize: number;
    };
    progressOverlay: {
        color: string;
        activityIndicatorColor: string;
        backgroundColor: string;
        containerBackgroundColor: string;
        fontSize: number;
        borderRadius: number;
        elevation: number;
        shadowColor: string;
        shadowOpacity: number;
        shadowRadius: number;
    };
}

export interface VariablesContainer {
    containerDisabled: {
        opacity: numnber;
    };
}

export interface VariablesTabContainer {
    tabBar: {
        pressColor: string;
        backgroundColor: string;
    };
    tab: {
        paddingVertical: number;
    };
    indicator: {
        backgroundColor: string;
        height: number;
    };
    label: {
        color: string;
        fontSize: number;
        fontWeight: FontWeight;
        textTransform: TextTransform;
    };
    activeLabel: {
        color: string;
        fontSize: number;
        fontWeight: FontWeight;
        textTransform: TextTransform;
    };
    badgeContainer: {
        borderRadius: number;
        backgroundColor: string;
        paddingVertical: number;
        paddingHorizontal: number;
        marginLeft: number;
    };
    badgeCaption: {
        fontSize: number;
        color: string;
        fontWeight: FontWeight;
    };
}

export interface VariablesListView {
    listItemDisabled: {
        opacity: number;
    };
    border: {
        color: string;
        width: number;
    };
}

export interface VariablesLayoutgrid {
    gutterSize: number;
}

export interface VariablesCheckbox {
    checkboxInput: CheckBoxInputType;
    checkboxInputDisabled: CheckBoxInputType;
    checkboxInputError: CheckBoxInputType;
}

// ## Pluggable Widgets
// -------------------------------------------------------------------------------------------------------------------//

export interface VariablesAccordion {
    container: {
        backgroundColor: string;
        borderColor: string;
    };
    groupHeader: {
        container: {
            paddingVertical: number;
            paddingHorizontal: number;
        };
        heading: {
            color: string;
        };
        icon: {
            size: number;
            color: string;
        };
    };
    groupContent: {
        paddingTop: number;
        paddingBottom: number;
        paddingHorizontal: number;
    };
}

interface VariablesBadgeStyles {
    color: string;
    backgroundColor: string;
}

export interface VariablesBadge {
    fontWeight: FontWeight;
    borderRadius: number;
    paddingVertical: number;
    paddingHorizontal: number;

    default: VariablesBadgeStyles;
    primary: VariablesBadgeStyles;
    success: VariablesBadgeStyles;
    warning: VariablesBadgeStyles;
    danger: VariablesBadgeStyles;
}

export interface VariablesFloatingActionButton {
    container: {
        margin: number;
    };
    button: {
        size: number;
        rippleColor: string;
        borderColor: string;
        backgroundColor: string;
    };
    buttonIcon: {
        size: number;
        color: string;
    };
    secondaryButton: {
        size: number;
        backgroundColor: string;
    };
    secondaryButtonIcon: {
        size: number;
        color: string;
    };
    secondaryButtonCaption: {
        color: string;
        fontSize: number;
    };
    secondaryButtonCaptionContainer: {
        backgroundColor: string;
        borderColor: string;
    };
}

export interface VariablesIntroScreen {
    fullscreenContainer: {
        backgroundColor: string;
    };
    popupContainer: {
        paddingVertical: number;
        paddingHorizontal: number;
        backgroundColor: string;
    };
    pagination: {
        text: {
            color: string;
            fontSize: number;
        };
        dotStyle: {
            size: number;
            backgroundColor: string;
        };
        activeDotStyle: {
            size: number;
            backgroundColor: string;
        };
    };
    button: {
        icon: {
            color: string;
            size: number;
        };
        caption: {
            color: string;
            fontSize: number;
            fontWeight: FontWeight;
            textTransform: TextTransform;
            paddingHorizontal: number;
        };
    };
    buttonPaginationAbove: {
        container: {
            paddingVertical: number;
            backgroundColor: string;
        };
    };
}

export interface VariablesListViewSwipe {
    leftAction: {
        panelSize: number;
        panelSizeSmall: number;
        panelSizeLarge: number;
        backgroundColor: string;
    };
    rightAction: {
        panelSize: number;
        panelSizeSmall: number;
        panelSizeLarge: number;
        backgroundColor: string;
    };
}

export interface VariablesProgressBar {
    bar: {
        height: number;
        heightSmall: number;
        heightLarge: number;
        backgroundColor: string;
    };
    fill: {
        backgroundColor: string;
    };
}

export interface VariablesProgressCircle {
    circle: {
        size: number;
    };
    fill: {
        width: number;
        lineCapRounded: true;
        backgroundColor: string;
    };
    text: {
        color: string;
        fontSize: number;
        fontWeight: FontWeight;
    };
}

export interface VariablesRating {
    containerDisabled: {
        opacity: number;
    };
    icon: {
        size: number;
        color: string;
        selectedColor: string;
    };
}

export interface VariablesSlider {
    track: {
        height: number;
        backgroundColor: string;
    };
    trackDisabled: {
        backgroundColor: string;
        opacity: number;
    };
    highlight: {
        backgroundColor: string;
    };
    highlightDisabled: {
        backgroundColor: string;
    };
    marker: {
        size: number;
        borderColor: string;
        backgroundColor: string;
    };
    markerActive: {
        size: number;
    };
    markerDisabled: {
        size: number;
        borderColor: string;
        backgroundColor: string;
    };
}

export interface VariablesRadioButtons {
    labelTextStyle: {
        color: string;
        fontSize: number;
        lineHeight: number;
        marginBottom: number;
    };
    radioButtonItemContainerStyle: {
        marginBottom: number;
    };
    radioButtonItemContainerDisabledStyle: {
        opacity: number;
    };
    radioButtonItemContainerHorizontalStyle: {
        marginEnd: number;
    };
    circularButtonStyle: {
        width: number;
        height: number;
        borderRadius: number;
        borderColor: string;
        marginEnd: number;
    };
    activeButtonStyle: {
        width: number;
        height: number;
        borderRadius: number;
        backgroundColor: string;
    };
    radioButtonItemTitleStyle: {
        color: string;
        fontSize: number;
        lineHeight: number;
    };
    validationMessage: {
        color: string;
        fontSize: number;
    };
}

export interface VariableBackgroundGradient {
    container: ViewStyle;
    angle: number;
    colorList?: GradientColorList[];
    opacity: number;
}

interface ColumnChartGridStyle {
    backgroundColor?: string;
    dashArray?: string;
    lineColor?: string;
    padding?: number;
    paddingBottom?: number;
    paddingHorizontal?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingVertical?: number;
    width?: number;
}

interface ColumnChartAxisStyle<T extends "X" | "Y"> {
    color?: string;
    dashArray?: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: "normal" | "italic";
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    label?: TextStyle & {
        relativePositionGrid?: T extends "X" ? "bottom" | "right" : "top" | "left";
    };
    lineColor?: string;
    width?: number;
}

interface ColumnChartColumnStyle {
    ending?: number;
    columnColor?: string;
    width?: number;
}

interface ColumnChartColumnLabelStyle {
    // color is the same as column color
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: "normal" | "italic";
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
}

export interface ColumnChartLegendStyle {
    container?: ViewStyle;
    item?: ViewStyle;
    indicator?: ViewStyle;
    label?: TextStyle;
}

export interface VariablesColumnChart {
    container?: ViewStyle;
    errorMessage?: TextStyle;
    chart?: ViewStyle;
    grid?: ColumnChartGridStyle;
    xAxis?: ColumnChartAxisStyle<"X">;
    yAxis?: ColumnChartAxisStyle<"Y">;
    legend?: ColumnChartLegendStyle;
    columns?: {
        columnColorPalette?: string;
        columnsOffset?: number; // only applicable to Grouped presentation mode
        customColumnStyles?: {
            [key: string]: {
                column?: ColumnChartColumnStyle;
                label?: ColumnChartColumnLabelStyle;
            };
        };
    };
    domain?: {
        padding?: { x: number; y: number };
    };
}

export interface VariablesGallery {
    container?: ViewStyle;
    dynamicItemClasses?: {
        [key: string]: Pick<VariablesGallery, "listItem">;
    };
    emptyPlaceholder?: ViewStyle;
    firstItem?: ViewStyle;
    lastItem?: ViewStyle;
    list?: ViewStyle;
    listItem?: ViewStyle;
    loadMoreButtonContainer?: ViewStyle;
    loadMoreButtonPressableContainer?: ViewStyle;
    loadMoreButtonCaption?: TextStyle;
}

export interface VariablesGalleryTextFilter {
    textInputContainer?: ViewStyle;
    textInputContainerFocused?: ViewStyle;
    textInput?: InputStyle;
    textInputClearIcon?: ViewStyle;
}

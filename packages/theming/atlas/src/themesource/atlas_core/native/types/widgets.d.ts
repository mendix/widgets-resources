import { ColorValue, ImageStyle, TextProps, TextStyle, ViewStyle } from "react-native";

declare type ActivityIndicatorSizeType = "small" | "large";

interface InputLabelType extends TextStyle {
    numberOfLines?: number;
}

interface InputType extends TextStyle {
    autoCapitalize?: string;
    selectionColor?: string;
    placeholderTextColor?: string;
    underlineColorAndroid?: string;
}

// Accordion
export interface AccordionType {
    container?: ViewStyle;
    group?: AccordionGroupType;
}

export interface AccordionGroupType {
    container?: ViewStyle;
    header?: {
        container?: ViewStyle;
        heading1?: TextStyle;
        heading2?: TextStyle;
        heading3?: TextStyle;
        heading4?: TextStyle;
        heading5?: TextStyle;
        heading6?: TextStyle;
        icon?: AccordionIconType;
    };
    content?: ViewStyle;
}

export interface AccordionIconType extends ViewStyle {
    size?: number;
    color?: string;
}

// Activity Indicator
export interface ActivityIndicatorType {
    container?: ViewStyle;
    indicator?: {
        color?: string;
        size?: ActivityIndicatorSizeType;
    };
}

// Animation
export interface AnimationType {
    container?: ViewStyle;
}

// Background Image
export interface BackgroundImageType {
    container?: ViewStyle;
    image?: ImageStyle & {
        svgColor?: string;
    };
}

// Badge
export interface BadgeType {
    container?: ViewStyle;
    caption?: TextStyle;
}

// Bottom Sheet
export interface BottomSheetType {
    container?: ViewStyle;
    containerWhenExpandedFullscreen?: ViewStyle;
    modal?: ViewStyle;
    modalItems?: {
        container?: ViewStyle & {
            rippleColor?: string;
        };
        defaultStyle?: TextStyle;
        primaryStyle?: TextStyle;
        dangerStyle?: TextStyle;
        customStyle?: TextStyle;
    };
}

// Action Button
interface ButtonContainerType extends ViewStyle {
    rippleColor?: string;
}

interface ButtonStyleType extends ViewStyle {
    size?: number;
}

interface ButtonIconType extends ButtonStyleType {
    color?: string;
}

export interface ActionButtonType {
    container?: ButtonContainerType;
    containerDisabled?: ViewStyle;
    icon?: ButtonIconType;
    iconDisabled?: ButtonIconType;
    caption?: TextStyle;
    captionDisabled?: TextStyle;
}

// Carousel
export interface CarouselLayoutType {
    slideItem?: ViewStyle;
    inactiveSlideItem?: {
        opacity?: number;
        scale?: number;
    };
    pagination?: {
        container?: ViewStyle;
        text?: TextStyle;
        dotContainerStyle?: ViewStyle;
        dotStyle?: ViewStyle & {
            color?: string;
        };
        inactiveDotStyle?: {
            color?: string;
            scale?: number;
            opacity?: number;
        };
    };
}

export interface CarouselType {
    container?: ViewStyle;
    fullWidthLayout?: CarouselLayoutType;
    cardLayout?: CarouselLayoutType;
    activityIndicator?: {
        color?: string;
    };
}

// Checkbox (switch render mode)
interface SwitchInputType extends ViewStyle {
    thumbColorOn?: string;
    thumbColorOff?: string;
    trackColorOn?: string;
    trackColorOff?: string;
}

// Checkbox (checkbox render mode)
interface CheckBoxInputType extends ViewStyle {
    color?: ColorValue;
    size?: number;
}

export interface CheckBoxType {
    container?: ViewStyle;
    containerDisabled?: ViewStyle;
    label?: InputLabelType;
    labelDisabled?: TextStyle;
    input?: SwitchInputType;
    checkboxInput?: CheckBoxInputType;
    inputDisabled?: SwitchInputType;
    checkboxInputDisabled?: CheckBoxInputType;
    inputError?: SwitchInputType;
    checkboxInputError?: CheckBoxInputType;
    validationMessage?: TextStyle;
}

// Color Picker
export interface ColorPickerType {
    container?: ViewStyle;
    thumbnail?: ViewStyle;
}

// Container
export interface ContainerType {
    container?: ViewStyle & {
        rippleColor?: string;
    };
    containerDisabled?: ViewStyle;
}

// Date Picker
export interface DatePickerType {
    container?: ViewStyle;
    containerDisabled?: ViewStyle;
    label?: InputLabelType;
    labelDisabled?: TextStyle;
    pickerIOS?: {
        color?: string;
    } & ViewStyle;
    pickerBackdropIOS?: ViewStyle;
    pickerTopIOS?: ViewStyle;
    value?: TextStyle;
    valueDisabled?: TextStyle;
    placeholder?: TextStyle;
    placeholderDisabled?: TextStyle;
    validationMessage?: TextStyle;
}

// Drop Down
export interface DropDownType {
    container?: ViewStyle;
    containerDisabled?: ViewStyle;
    label?: InputLabelType;
    labelDisabled?: TextStyle;
    value?: {
        placeholderTextColor?: string;
    } & TextStyle;
    valueDisabled?: TextStyle;
    valueFocused?: ViewStyle;
    validationMessage?: TextStyle;
    /*  New dropdown styles start */
    valueContainer?: ViewStyle & {
        rippleColor?: string;
        underlayColor?: string;
        activeOpacity?: number;
    };
    valueContainerDisabled?: ViewStyle;
    valueContainerFocused?: ViewStyle;
    iconStyle?: TextStyle;
    menuWrapper?: ViewStyle;
    item?: TextStyle;
    itemContainer?: ViewStyle & {
        rippleColor?: string;
        underlayColor?: string;
        activeOpacity?: number;
    };
    selectedItem?: TextStyle;
    selectedItemContainer?: ViewStyle;
    /*  New dropdown styles end */
    useUniformDesign?: boolean; // Flag for using old dropdown design with PickerWheel in IOS
    // Old dropdown styles start
    pickerIOS?: ViewStyle;
    pickerItemIOS?: ViewStyle;
    pickerBackdropIOS?: ViewStyle;
    pickerTopIOS?: ViewStyle;
    // Old dropdown styles end
}

// Feedback
export interface FeedbackType {
    floatingButton?: ViewStyle;
    dialog?: ViewStyle;
    title?: TextStyle;
    textAreaInput?: InputType;
    switchLabel?: TextStyle;
    switchInput?: SwitchInputType;
    button?: {
        color?: string;
        borderColor?: string;
        borderWidth?: number;
    };
    activityIndicator?: {
        color?: string;
    };
}

// Floating Action Button
export interface FloatingActionButtonType {
    container?: ViewStyle;
    button?: ButtonStyleType & {
        rippleColor?: string;
    };
    buttonIcon?: ButtonIconType;
    secondaryButton?: ButtonStyleType;
    secondaryButtonIcon?: ButtonIconType;
    secondaryButtonCaption?: TextStyle;
    secondaryButtonCaptionContainer?: ViewStyle;
}

// Images
export interface ImageType {
    container?: ButtonContainerType;
    containerDisabled?: ViewStyle;
    image?: ImageStyle;
    imageDisabled?: ImageStyle;
}

// Intro Screen
export interface IntroScreenButtonType {
    container?: ButtonContainerType;
    icon?: ButtonIconType;
    caption?: TextStyle;
}

interface IntroScreenPaginationType {
    buttonSkip?: IntroScreenButtonType;
    buttonPrevious?: IntroScreenButtonType;
    buttonNext?: IntroScreenButtonType;
    buttonDone?: IntroScreenButtonType;
}

export interface IntroScreenType {
    fullscreenContainer?: ViewStyle;
    popupContainer?: ViewStyle;
    paginationContainer?: ViewStyle;
    paginationText?: TextStyle;
    dotStyle?: ViewStyle;
    activeDotStyle?: ViewStyle;

    paginationAbove?: IntroScreenPaginationType & {
        buttonsContainer?: ViewStyle;
    };
    paginationBetween?: IntroScreenPaginationType;
}

// Layout
export interface LayoutType {
    sidebar: ViewStyle;
    statusBar: {
        // Only backgroundColor and barStyle are allowed
        backgroundColor: string;
        barStyle: string;
    };
    header: {
        container: ViewStyle;
        title: TextStyle;
        backButtonText: TextStyle;
        backButtonIcon: ImageStyle;
    };
    container: ViewStyle;
}

// Layout grid
export interface LayoutGridType {
    container?: ViewStyle;
}

// Line chart
interface LineChartGridStyle {
    backgroundColor?: string;
    dashArray?: string;
    lineColor?: string;
    lineWidth?: number;
    padding?: number;
    paddingBottom?: number;
    paddingHorizontal?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingVertical?: number;
}

interface LineChartAxisStyle<T extends "X" | "Y"> {
    color?: string;
    dashArray?: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: "normal" | "italic";
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    lineColor?: string;
    lineWidth?: number;
    label?: TextStyle & {
        relativePositionGrid?: T extends "X" ? "bottom" | "right" : "top" | "left";
    };
}

interface LineChartLineStyle {
    line?: {
        dashArray?: string;
        ending?: "flat" | "round";
        lineColor?: string;
        lineWidth?: number;
    };
    markers?: {
        backgroundColor?: string;
        borderColor?: string;
        borderWidth?: number;
        display?: "false" | "underneath" | "onTop";
        size?: number;
        symbol?: "circle" | "diamond" | "plus" | "minus" | "square" | "star" | "triangleDown" | "triangleUp";
    };
}

interface LineChartLegendStyle {
    container?: ViewStyle;
    item?: ViewStyle;
    indicator?: ViewStyle;
    label?: TextStyle;
}

export interface LineChartType {
    container?: ViewStyle;
    errorMessage?: TextStyle;
    chart?: ViewStyle;
    grid?: LineChartGridStyle;
    xAxis?: LineChartAxisStyle<"X">;
    yAxis?: LineChartAxisStyle<"Y">;
    legend?: LineChartLegendStyle;
    lines?: {
        lineColorPalette?: string;
        customLineStyles?: {
            [key: string]: LineChartLineStyle;
        };
    };
}

// Bar chart
interface BarChartGridStyle {
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

interface BarChartAxisStyle<T extends "X" | "Y"> {
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

interface BarChartBarStyle {
    ending?: number;
    barColor?: string;
    width?: number;
}

interface BarChartBarLabelStyle {
    // color is the same as bar color
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: "normal" | "italic";
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
}

export interface BarChartLegendStyle {
    container?: ViewStyle;
    item?: ViewStyle;
    indicator?: ViewStyle;
    label?: TextStyle;
}

export interface BarChartType {
    container?: ViewStyle;
    errorMessage?: TextStyle;
    chart?: ViewStyle;
    grid?: BarChartGridStyle;
    xAxis?: BarChartAxisStyle<"X">;
    yAxis?: BarChartAxisStyle<"Y">;
    legend?: BarChartLegendStyle;
    bars?: {
        barColorPalette?: string;
        barsOffset?: number; // only applicable to Grouped presentation mode
        customBarStyles?: {
            [key: string]: {
                bar?: BarChartBarStyle;
                label?: BarChartBarLabelStyle;
            };
        };
    };
    domain?: {
        padding?: { x: number; y: number };
    };
}

// Column chart
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

export interface ColumnChartType {
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

// Pie Doughnut Chart
export interface PieDoughnutChartStyle {
    container?: ViewStyle;
    slices?: {
        colorPalette?: string;
        innerRadius?: number;
        padding?: number;
        paddingBottom?: number;
        paddingHorizontal?: number;
        paddingLeft?: number;
        paddingRight?: number;
        paddingTop?: number;
        paddingVertical?: number;
        customStyles?: {
            // key configured in modeler
            [key: string]: {
                slice?: {
                    color?: string;
                };
                label?: {
                    // color is the same as slice color
                    fontFamily?: string;
                    fontSize?: number;
                    fontStyle?: "normal" | "italic";
                    fontWeight?:
                        | "normal"
                        | "bold"
                        | "100"
                        | "200"
                        | "300"
                        | "400"
                        | "500"
                        | "600"
                        | "700"
                        | "800"
                        | "900";
                };
            };
        };
    };
}

// List view
export interface ListViewType {
    container?: ViewStyle;
    listItem?: ViewStyle;
    listItemDisabled?: ViewStyle;
}

// List View Swipe
interface ListViewSwipeActionType extends ViewStyle {
    panelSize?: number;
}

export interface ListViewSwipeType {
    container?: ViewStyle;
    leftAction?: ListViewSwipeActionType;
    rightAction?: ListViewSwipeActionType;
}

// Maps
export interface MapsType {
    container?: ViewStyle;
    loadingOverlay?: ViewStyle;
    loadingIndicator?: {
        color?: string;
    };
    marker?: {
        color?: string;
        opacity?: number;
    };
}

// Navigation
export interface NavigationType {
    bottomBar?: {
        container?: ViewStyle;
        label?: TextStyle;
        selectedLabel?: TextStyle;
        icon?: TextStyle;
        selectedIcon?: TextStyle;
    };
    progressOverlay?: {
        background?: ViewStyle;
        container?: ViewStyle;
        activityIndicator?: ViewStyle & {
            color?: string;
            size?: ActivityIndicatorSizeType;
        };
        text?: TextStyle;
    };
}

// Page Title
export interface PageTitleType {
    container?: ViewStyle;
    text?: TextStyle;
}

// Progress Bar
export interface ProgressBarType {
    container?: ViewStyle;
    bar?: ViewStyle;
    fill?: {
        backgroundColor?: string;
    };
    validationMessage?: TextStyle;
}

// Progress Circle
export interface ProgressCircleType {
    container?: ViewStyle;
    circle?: {
        size?: number;
        borderWidth?: number;
        borderColor?: string;
    };
    fill?: {
        width?: number;
        backgroundColor?: string;
        lineCapRounded?: boolean;
    };
    text?: TextStyle;
    validationMessage?: TextStyle;
}

// Popup Menu
export interface PopupMenuType {
    container?: ViewStyle;
    basic: BasicItemStyle;
    custom: CustomItemStyle;
    buttonContainer?: ViewStyle;
}

interface CustomItemStyle extends ViewStyle {
    container?: ViewStyle;
    itemStyle: { rippleColor?: string };
}

interface BasicItemStyle {
    itemStyle?: ItemStyle;
    container?: ViewStyle;
    dividerColor?: string;
}

interface ItemStyle {
    rippleColor?: string;
    ellipsizeMode?: TextProps["ellipsizeMode"];
    defaultStyle?: TextStyle;
    primaryStyle?: TextStyle;
    dangerStyle?: TextStyle;
    customStyle?: TextStyle;
}

// QR Code
export interface QRCodeType {
    container?: ViewStyle;
    qrcode?: {
        size?: number;
        color?: string;
        backgroundColor?: string;
    };
}

// Rating
export interface RatingType {
    container?: ViewStyle;
    containerDisabled?: ViewStyle;
    icon?: ViewStyle & {
        size?: number;
        color?: string;
        selectedColor?: string;
    };
}

// Safe Area View
export interface SafeAreaViewType {
    container?: ViewStyle;
}

// Slider
export interface SliderType {
    container?: ViewStyle;
    track?: ViewStyle;
    trackDisabled?: ViewStyle;
    highlight?: ViewStyle;
    highlightDisabled?: ViewStyle;
    marker?: ViewStyle;
    markerActive?: ViewStyle;
    markerDisabled?: ViewStyle;
    validationMessage?: TextStyle;
}

// Switch
export interface SwitchType {
    container?: ViewStyle;
    containerDisabled?: ViewStyle;
    label?: InputLabelType;
    labelDisabled?: TextStyle;
    input?: SwitchInputType;
    inputDisabled?: SwitchInputType;
    inputError?: SwitchInputType;
    validationMessage?: TextStyle;
}

// Tab Container
export interface TabContainerType {
    container?: ViewStyle;
    tabBar?: ViewStyle & {
        bounces?: boolean;
        pressColor?: string;
        pressOpacity?: number;
        scrollEnabled?: boolean;
    };
    indicator?: ViewStyle;
    tab?: ViewStyle;
    label?: TextStyle;
    activeLabel?: TextStyle;
    badgeContainer?: ViewStyle;
    badgeCaption?: TextStyle;
}

// Text Box
export interface TextBoxType {
    container?: ViewStyle;
    containerDisabled?: ViewStyle;
    label?: InputLabelType;
    labelDisabled?: TextStyle;
    input?: InputType;
    inputDisabled?: InputType;
    inputFocused?: InputType;
    inputError?: InputType;
    validationMessage?: TextStyle;
}

// Toggle Buttons
export interface ToggleButtonsType {
    container?: ViewStyle;
    containerDisabled?: ViewStyle;
    button?: ViewStyle;
    text?: TextStyle;
    activeButton?: ViewStyle;
    activeButtonText?: TextStyle;
    validationMessage?: TextStyle;
}

// Text
export interface TextType {
    container?: ViewStyle;
    text?: TextStyle;
}

// Video Player
export interface VideoPlayerType {
    container?: ViewStyle;
    indicator?: {
        backgroundColor?: string;
    };
    video?: ViewStyle;
    fullScreenVideoPlayer?: ViewStyle;
    controlBtnContainerStyle?: ViewStyle;
    fullScreenVideoStyle?: ViewStyle;
    fullScreenActivityIndicatorStyle?: ViewStyle;
}

// Web View
export interface WebViewType {
    container?: ViewStyle;
    errorContainer?: ViewStyle;
    errorText?: TextStyle;
}

// Radio Buttons
export interface RadioButtonsLabelStyle {
    labelTextStyle?: TextStyle;
}

export interface RadioButtonsItemStyle {
    circularButtonStyle?: ViewStyle;
    activeButtonStyle?: ViewStyle;
    radioButtonItemTitleStyle?: TextStyle;
}

export interface RadioButtonsContainerStyle {
    container?: ViewStyle;
    radioButtonItemContainerStyle?: ViewStyle;
    radioButtonItemContainerHorizontalStyle?: ViewStyle;
    validationMessage?: TextStyle;
    radioButtonItemContainerDisabledStyle?: ViewStyle;
}

export type RadioButtonsStyles = RadioButtonsContainerStyle & RadioButtonsItemStyle & RadioButtonsLabelStyle;

// Background Gradient
interface GradientColorList {
    color: string;
    offset: number;
}

export interface BackgroundGradientStyles {
    container?: ViewStyle;
    angle?: number;
    colorList?: GradientColorList[];
    opacity?: number;
}

export interface GalleryType {
    container?: ViewStyle;
    dynamicItemClasses?: {
        [key: string]: Pick<GalleryType, "listItem">;
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

export interface GalleryTextFilterType {
    container?: ViewStyle;
    caption?: TextStyle;
    textInputContainer?: ViewStyle;
    textInputOnFocusContainer?: ViewStyle;
    textInput?: TextStyle;
    textInputClearIcon?: ViewStyle;
}

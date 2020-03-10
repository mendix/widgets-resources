import { ImageStyle, TextStyle, ViewStyle } from "./rn";
declare type ActivityIndicatorSizeType = "small" | "large";
interface InputLabelType extends TextStyle {
    numberOfLines?: number;
}
interface InputType extends TextStyle {
    selectionColor?: string;
    placeholderTextColor?: string;
    underlineColorAndroid?: string;
}
export interface ActivityIndicatorType {
    container?: ViewStyle;
    indicator?: {
        color?: string;
        size?: ActivityIndicatorSizeType;
    };
}
export interface AnimationType {
    container?: ViewStyle;
}
export interface BadgeType {
    container?: ViewStyle;
    caption?: TextStyle;
}
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
    icon?: ButtonIconType;
    caption?: TextStyle;
}
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
interface CheckBoxInputType extends TextStyle {
    thumbColorOn?: string;
    thumbColorOff?: string;
    trackColorOn?: string;
    trackColorOff?: string;
}
export interface CheckBoxType {
    container?: ViewStyle;
    label?: InputLabelType;
    input?: CheckBoxInputType;
    inputDisabled?: CheckBoxInputType;
    inputError?: CheckBoxInputType;
    validationMessage?: TextStyle;
}
export interface ColorPickerType {
    container?: ViewStyle;
    thumbnail?: ViewStyle;
}
export interface ContainerType {
    container?: ViewStyle;
}
export interface DatePickerType {
    container?: ViewStyle;
    label?: InputLabelType;
    pickerIOS?: ViewStyle;
    pickerBackdropIOS?: ViewStyle;
    pickerTopIOS?: ViewStyle;
    value?: TextStyle;
    valueDisabled?: TextStyle;
    placeholder?: TextStyle;
    placeholderDisabled?: TextStyle;
    validationMessage?: TextStyle;
}
export interface DropDownType {
    container?: ViewStyle;
    label?: InputLabelType;
    pickerIOS?: ViewStyle;
    pickerItemIOS?: ViewStyle;
    pickerBackdropIOS?: ViewStyle;
    pickerTopIOS?: ViewStyle;
    value?: TextStyle;
    valueDisabled?: TextStyle;
    validationMessage?: TextStyle;
}
export interface FeedbackType {
    floatingButton?: ViewStyle;
    dialog?: ViewStyle;
    title?: TextStyle;
    textAreaInput?: InputType;
    switchLabel?: TextStyle;
    switchInput?: CheckBoxInputType;
    button?: {
        color?: string;
        borderColor?: string;
        borderWidth?: number;
    };
    activityIndicator?: {
        color?: string;
    };
}
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
export interface ImageType {
    container?: ButtonContainerType;
    image?: ImageStyle;
}
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
export interface LayoutGridType {
    container?: ViewStyle;
}
export interface ListViewType {
    container?: ViewStyle;
    listItem?: ViewStyle;
}
interface ListViewSwipeActionType extends ViewStyle {
    panelSize?: number;
}
export interface ListViewSwipeType {
    container?: ViewStyle;
    leftAction?: ListViewSwipeActionType;
    rightAction?: ListViewSwipeActionType;
}
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
export interface PageTitleType {
    container?: ViewStyle;
    text?: TextStyle;
}
export interface ProgressBarType {
    container?: ViewStyle;
    bar?: ViewStyle;
    fill?: {
        backgroundColor?: string;
    };
    validationMessage?: TextStyle;
}
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
export interface QRCodeType {
    container?: ViewStyle;
    qrcode?: {
        size?: number;
        color?: string;
        backgroundColor?: string;
    };
}
export interface RatingType {
    container?: ViewStyle;
    containerDisabled?: ViewStyle;
    icon?: ViewStyle & {
        size?: number;
        color?: string;
        selectedColor?: string;
    };
}
export interface SafeAreaViewType {
    container?: ViewStyle;
}
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
}
export interface TextBoxType {
    container?: ViewStyle;
    label?: InputLabelType;
    input?: InputType;
    inputDisabled?: InputType;
    inputError?: InputType;
    validationMessage?: TextStyle;
}
export interface ToggleButtonsType {
    container?: ViewStyle;
    containerDisabled?: ViewStyle;
    button?: ViewStyle;
    text?: TextStyle;
    activeButton?: ViewStyle;
    activeButtonText?: TextStyle;
    validationMessage?: TextStyle;
}
export interface TextType {
    container?: ViewStyle;
    text?: TextStyle;
}
export interface VideoPlayerType {
    container?: ViewStyle;
    indicator?: {
        backgroundColor?: string;
    };
    video?: ViewStyle;
}
export interface WebViewType {
    container?: ViewStyle;
    errorContainer?: ViewStyle;
    errorText?: TextStyle;
}
export {};

import { TextProps, TextStyle, ViewStyle } from "react-native";

export interface PopupMenuStyle {
    container?: ViewStyle;
    basic?: BasicItemStyle;
    custom?: CustomItemStyle;
    buttonContainer?: ViewStyle;
}

export interface CustomItemStyle extends ViewStyle {
    containerStyle?: ViewStyle;
    itemStyle?: { rippleColor?: string };
}

interface BasicItemStyle {
    itemStyle?: ItemStyle;
    containerStyle?: ViewStyle;
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

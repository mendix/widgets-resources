import { TextProps, TextStyle, ViewStyle } from "react-native";

export interface PopupMenuStyle {
    itemStyle?: MenuItemsStyle;
    buttonContainer?: ViewStyle;
}

interface MenuItemsStyle {
    container?: ViewStyle;
    defaultStyle?: BasicItemStyle;
    primaryStyle?: BasicItemStyle;
    dangerStyle?: BasicItemStyle;
    customStyle?: BasicItemStyle;
}

export interface BasicItemStyle {
    textStyle?: TextStyle;
    ellipsizeMode?: TextProps["ellipsizeMode"];
    dividerColor?: string;
}

// TODO: request default,primary,danger

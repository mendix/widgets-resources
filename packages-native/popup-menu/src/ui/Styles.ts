import { TextProps, TextStyle, ViewStyle } from "react-native";

export interface PopupMenuStyle {
    basicItem?: MenuItemsStyle;
    customItem?: CustomItemStyle;
    buttonContainer?: ViewStyle;
}

interface MenuItemsStyle {
    defaultStyle?: BasicItemStyle;
    primaryStyle?: BasicItemStyle;
    dangerStyle?: BasicItemStyle;
    customStyle?: BasicItemStyle;
}

export interface BasicItemStyle {
    container?: ViewStyle;
    textStyle?: TextStyle;
    ellipsizeMode?: TextProps["ellipsizeMode"];
    dividerColor?: string;
}

interface CustomItemStyle {
    container?: ViewStyle;
}

// TODO: request default,primary,danger

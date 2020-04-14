import { TextProps, TextStyle, ViewStyle } from "react-native";

export interface PopupMenuStyle {
    basicItem?: BasicItemStyle;
    complexItem?: ComplexItemStyle;
    buttonContainer?: ViewStyle;
    // Only for ios
    buttonUnderlayColor?: string;
}

interface BasicItemStyle {
    container?: ViewStyle;
    textStyle?: TextStyle;
    // Only for ios
    underlayColor?: string;
    ellipsizeMode?: TextProps["ellipsizeMode"];
    dividerColor?: string;
}

interface ComplexItemStyle {
    container?: ViewStyle;
    // Only for ios
    underlayColor?: string;
}

// TODO: request default,primary,danger

import { TextProps, TextStyle, ViewStyle } from "react-native";

export interface PopupMenuStyle {
    container?: ViewStyle;
    basic: BasicItemStyle;
    buttonContainer?: ViewStyle;
}

interface BasicItemStyle {
    itemStyle?: ItemStyle;
    containerStyle?: ViewStyle;
    dividerColor?: string;
}
interface ItemStyle {
    ellipsizeMode?: TextProps["ellipsizeMode"];
    defaultStyle?: TextStyle;
    primaryStyle?: TextStyle;
    dangerStyle?: TextStyle;
    customStyle?: TextStyle;
}

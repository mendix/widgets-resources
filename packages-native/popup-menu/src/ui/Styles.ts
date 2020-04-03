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

export const defaultPopupMenuStyles: PopupMenuStyle = {
    basicItem: {
        underlayColor: "#e0e0e0",
        dividerColor: "green",
        textStyle: {
            color: "red"
        }
    },
    complexItem: {
        underlayColor: "#e0e0e0",
        container: {
            backgroundColor: "yellow",
            height: 48,
            justifyContent: "center",
            maxWidth: 248,
            minWidth: 124
        }
    },
    buttonUnderlayColor: "#e0e0e0"
};

// TODO: request default,primary,danger

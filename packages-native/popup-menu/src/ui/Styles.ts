import { TextStyle, ViewStyle } from "react-native";

export interface PopupMenuStyle {
    customItemContainer?: ViewStyle;
    dividerColor?: string;
    menuItem?: PopupItemStyle;
}

interface PopupItemStyle {
    // Only for ios
    underlayColor?: string;
    textStyle?: TextStyle;
}

export const defaultPopupMenuStyles: PopupMenuStyle = {
    dividerColor: "green",
    menuItem: {
        underlayColor: "yellow",
        textStyle: {
            color: "red"
        }
    },
    customItemContainer: {
        height: 48,
        justifyContent: "center",
        maxWidth: 248,
        minWidth: 124
    }
};

// TODO: request default,primary,danger

import { TextStyle, TouchableHighlightProps, ViewStyle } from "react-native";

interface Touchable extends TouchableHighlightProps, ViewStyle {
    container?: ViewStyle;
}

export interface PopupMenuStyle {
    dividerColor?: string;
    menuItem?: PopupItemStyle;
    touchable?: Touchable;
}

/**
 *
 * - `head` - The line is displayed so that the end fits in the container and the missing text
 * at the beginning of the line is indicated by an ellipsis glyph. e.g., "...wxyz"
 * - `middle` - The line is displayed so that the beginning and end fit in the container and the
 * missing text in the middle is indicated by an ellipsis glyph. "ab...yz"
 * - `tail` - The line is displayed so that the beginning fits in the container and the
 * missing text at the end of the line is indicated by an ellipsis glyph. e.g., "abcd..."
 * - `clip` - Lines are not drawn past the edge of the text container.
 *
 * The default is `tail`.
 *
 * `numberOfLines` must be set in conjunction with this prop.
 *
 * > `clip` is working only for iOS
 */
enum EllipsizeMode {
    "head",
    "middle",
    "tail",
    "clip"
}

interface PopupItemStyle {
    // Only for ios
    underlayColor?: string;
    // Item text style
    textStyle?: TextStyle;
    // View surrounding the menu item excluding touchable
    ellipsizeMode?: EllipsizeMode;
    complexItemContainer?: ViewStyle;
    basicItemContainer?: ViewStyle;
}

export const defaultPopupMenuStyles: PopupMenuStyle = {
    dividerColor: "green",
    menuItem: {
        underlayColor: "#e0e0e0",
        textStyle: {
            color: "red"
        },
        complexItemContainer: {
            backgroundColor: "yellow",
            height: 48,
            justifyContent: "center",
            maxWidth: 248,
            minWidth: 124
        }
    },
    touchable: {
        underlayColor: "#e0e0e0"
    }
};

// TODO: request default,primary,danger

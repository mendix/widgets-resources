import { Style } from "@native-components/util-widgets";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

interface ButtonStyle extends ViewStyle {
    size?: number;
}

export interface FloatingActionButtonStyle extends Style {
    container: ViewStyle;
    button: ButtonStyle & { rippleColor?: string };
    buttonIcon: ImageStyle;
    secondaryButton: ButtonStyle;
    secondaryButtonIcon: ImageStyle;
    secondaryButtonCaption: TextStyle;
    secondaryButtonCaptionContainer: ViewStyle;
}

export const defaultFloatingActionButtonStyle: FloatingActionButtonStyle = {
    container: {
        margin: 30
    },
    button: {
        size: 54,
        rippleColor: "rgba(0, 0, 0, 0.4)",
        backgroundColor: "#e74c3c",
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: "#000",
        shadowRadius: 3,
        elevation: 5
    },
    buttonIcon: {
        width: 24,
        height: 24
    },
    secondaryButton: {
        size: 40,
        backgroundColor: "#fff",
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowColor: "#000",
        shadowRadius: 3,
        elevation: 5
    },
    secondaryButtonIcon: {
        width: 24,
        height: 24
    },
    secondaryButtonCaption: {},
    secondaryButtonCaptionContainer: {
        marginHorizontal: 15
    }
};

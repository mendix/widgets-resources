import { Style } from "@native-mobile-resources/util-widgets";
import { TextStyle, ViewStyle } from "react-native";

export interface FloatingActionButtonStyle extends Style {
    container: ViewStyle;
    button: PrimaryButtonStyle;
    buttonIconContainer: ViewStyle;
    buttonIcon: IconStyle;
    secondaryButton: ButtonStyle;
    secondaryButtonIcon: IconStyle;
    secondaryButtonCaption: TextStyle;
    secondaryButtonCaptionContainer: ViewStyle;
}

interface ButtonStyle extends ViewStyle {
    size?: number;
}

interface PrimaryButtonStyle extends ButtonStyle {
    rippleColor?: string;
}

interface IconStyle {
    size?: number;
    color?: string;
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
    buttonIconContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 1
    },
    buttonIcon: {
        size: 18,
        color: "#fff"
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
        size: 18,
        color: "#000"
    },
    secondaryButtonCaption: {},
    secondaryButtonCaptionContainer: {
        marginHorizontal: 15
    }
};

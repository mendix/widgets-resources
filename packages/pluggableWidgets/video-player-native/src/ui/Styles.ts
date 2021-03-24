import { Style } from "@mendix/piw-native-utils-internal";
import { TextStyle, ViewStyle } from "react-native";

export interface VideoStyle extends Style {
    container: ViewStyle;
    indicator: {
        color: string;
    };
    video: ViewStyle;
    errorMessage: TextStyle;
}

export const defaultVideoStyle: VideoStyle = {
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        aspectRatio: 16 / 9
    },
    indicator: {
        color: "white"
    },
    video: {
        width: "100%",
        height: undefined
    },
    errorMessage: {
        color: "white"
    }
};

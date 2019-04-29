import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

interface VideoStyle extends Style {
    container: ViewStyle;
    indicator: {
        color: string;
    };
    video: ViewStyle;
}

export const defaultVideoStyle: VideoStyle = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    indicator: {
        color: "white"
    },
    video: {
        width: "100%",
        height: "100%"
    }
};

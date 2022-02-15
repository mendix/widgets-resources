import { Style } from "@mendix/piw-native-utils-internal";
import { TextStyle, ViewStyle } from "react-native";

export interface VideoStyle extends Style {
    container: ViewStyle;
    indicator: {
        color: string;
    };
    video: ViewStyle;
    errorMessage: TextStyle;
    fullScreenVideoPlayer: ViewStyle;
    controlBtnContainerStyle: ViewStyle;
    fullScreenVideoStyle: ViewStyle;
    fullScreenActivityIndicatorStyle: ViewStyle;
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
    },
    fullScreenVideoPlayer: {
        justifyContent: "center",
        backgroundColor: "black",
        margin: 0
    },
    controlBtnContainerStyle: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 2,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    fullScreenVideoStyle: {
        width: "100%",
        height: "100%"
    },
    fullScreenActivityIndicatorStyle: {
        position: "absolute",
        alignSelf: "center"
    }
};

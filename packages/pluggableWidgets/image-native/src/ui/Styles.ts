import { ViewStyle, ImageStyle } from "react-native";
import { Style } from "@mendix/piw-native-utils-internal";
import { GProps } from "react-native-svg";

export interface IconStyle {
    size?: number;
    color?: string;
}
export interface DefaultImageStyle extends Style {
    container: ViewStyle;
    image: ImageStyle | GProps | IconStyle;
    backdrop: ViewStyle;
}

export const defaultImageStyle: DefaultImageStyle = {
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        flex: 1, // This is required to prevent blurry images on Android
        minHeight: 8,
        minWidth: 8,
        maxWidth: "100%",
        maxHeight: "100%"
    },
    backdrop: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `rgba(0,0,0,0.8)`
    }
};

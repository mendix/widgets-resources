import { ViewStyle, ImageStyle } from "react-native";
import { Style } from "@native-mobile-resources/util-widgets";

interface customImageStyle extends ImageStyle {
    svgColor?: string;
}

export interface BackgroundImageStyle extends Style {
    container: ViewStyle;
    image: customImageStyle;
}

export const defaultBackgroundImageStyle: BackgroundImageStyle = {
    container: {},
    image: {}
};

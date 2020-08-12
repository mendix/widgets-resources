import { ViewStyle, ImageStyle } from "react-native";
import { Style } from "@native-mobile-resources/util-widgets";

interface CustomImageStyle extends ImageStyle {
    svgColor?: string;
}

export interface BackgroundImageStyle extends Style {
    container: ViewStyle;
    image: CustomImageStyle;
}

export const defaultBackgroundImageStyle: BackgroundImageStyle = {
    container: {},
    image: {}
};

import { ViewStyle, ImageStyle } from "react-native";
import { Style } from "@native-mobile-resources/util-widgets";

export interface BackgroundImageStyle extends Style {
    container: ViewStyle;
    image: ImageStyle;
}

export const defaultBackgroundImageStyle: BackgroundImageStyle = {
    container: {},
    image: {}
};

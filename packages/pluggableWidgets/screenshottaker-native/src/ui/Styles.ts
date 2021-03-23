import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

export interface ScreenshotTakerStyle extends Style {
    container: ViewStyle;
}

export const defaultScreenshotTakerStyles: ScreenshotTakerStyle = {
    container: {},
};

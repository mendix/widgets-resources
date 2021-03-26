import { Style } from "@mendix/piw-native-utils-internal";
import { ViewStyle } from "react-native";

export interface ScreenshotTakerType extends Style {
    container: ViewStyle;
}

export const defaultScreenshotTakerStyles: ScreenshotTakerType = {
    container: {}
};

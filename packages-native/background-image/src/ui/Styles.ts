import { ViewStyle } from "react-native";
import { Style } from "@native-mobile-resources/util-widgets";

export interface BackgroundImageStyle extends Style {
    container: ViewStyle;
}

export const defaultBackgroundImageStyle: BackgroundImageStyle = {
    container: {
        flex: 1
    }
};

import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

export interface RatingStyle extends Style {
    container: ViewStyle;
    containerDisabled: ViewStyle;
    icon: IconStyle;
}

export interface IconStyle extends ViewStyle {
    size: number;
    color: string;
    selectedColor: string;
}

export const defaultRatingStyle: RatingStyle = {
    container: {},
    containerDisabled: {
        opacity: 0.5
    },
    icon: {
        size: 40,
        color: "#cccccc",
        selectedColor: "#ffa611"
    }
};

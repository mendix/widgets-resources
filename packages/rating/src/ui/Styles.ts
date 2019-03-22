import { Style } from "@native-components/util-widgets";
import { ViewStyle } from "react-native";

export interface StarStyle extends ViewStyle {
    size: number;
    color: string;
    selectedColor: string;
}

export interface RatingStyle extends Style {
    container: ViewStyle;
    star: StarStyle;
}

export const defaultRatingStyle: RatingStyle = {
    container: {},
    star: {
        size: 40,
        color: "#cccccc",
        selectedColor: "#ffa611"
    }
};

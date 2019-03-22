import { Style } from "@native-components/util-widgets";
import { ViewStyle } from "react-native";

export interface StarStyle extends ViewStyle {
    color?: number;
    size: number;
    emptyColor: string;
    fullColor: string;
}

export interface RatingStyle extends Style {
    container: ViewStyle;
    star: StarStyle;
}

export const defaultRatingStyle: RatingStyle = {
    container: {},
    star: {
        size: 40,
        emptyColor: "#cccccc",
        fullColor: "#ffa611"
    }
};

import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

interface MarkerStyle {
    color: string;
    opacity: number;
}

export interface MapsStyle extends Style {
    container: ViewStyle;
    marker: MarkerStyle;
}

export const defaultMapsStyle: MapsStyle = {
    container: {
        width: "100%",
        height: "100%"
    },
    marker: {
        color: "red",
        opacity: 1
    }
};

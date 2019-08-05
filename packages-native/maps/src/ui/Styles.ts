import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

interface MarkerStyle {
    color: string;
    opacity: number;
}

export interface MapsStyle extends Style {
    container: ViewStyle;
    loadingOverlay: ViewStyle;
    loadingIndicator: {
        color?: string;
    };
    marker: MarkerStyle;
}

export const defaultMapsStyle: MapsStyle = {
    container: {},
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
        backgroundColor: "#fafafa",
        justifyContent: "center",
        alignItems: "center"
    },
    loadingIndicator: {},
    marker: {
        color: "red",
        opacity: 1
    }
};

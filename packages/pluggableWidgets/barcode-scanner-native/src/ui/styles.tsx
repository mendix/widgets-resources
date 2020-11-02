import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

export interface BarcodeScannerStyle extends Style {
    container: ViewStyle;
    mask: {
        color?: string;
        width?: number;
        height?: number;
        backgroundColor?: string;
    };
}

export const defaultBarcodeScannerStyle: BarcodeScannerStyle = {
    container: {
        flex: 1,
        minHeight: 100,
        flexDirection: "column"
    },
    mask: {
        color: "#62B1F6",
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    }
};

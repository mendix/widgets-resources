import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

export interface BarcodeScannerStyle extends Style {
    container: ViewStyle;
}

export const defaultBarcodeScannerStyle: BarcodeScannerStyle = {
    container: {
        flex: 1,
        minHeight: 100,
        flexDirection: "column"
    }
};

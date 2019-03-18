import { Style } from "@native-components/util-widgets";
import { TextStyle, ViewStyle } from "react-native";

export interface WebViewStyle extends Style {
    container: ViewStyle;
    errorContainer: ViewStyle;
    errorText: TextStyle;
}

export const defaultWebViewStyle: WebViewStyle = {
    container: {
        width: "100%",
        height: "100%"
    },
    errorContainer: {},
    errorText: {
        color: "red",
        fontWeight: "bold"
    }
};

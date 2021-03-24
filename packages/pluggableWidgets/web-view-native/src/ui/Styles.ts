import { Style } from "@mendix/piw-native-utils-internal";
import { TextStyle, ViewStyle } from "react-native";

export interface WebViewStyle extends Style {
    container: ViewStyle;
    errorContainer: ViewStyle;
    errorText: TextStyle;
}

export const defaultWebViewStyle: WebViewStyle = {
    container: {
        flex: 1,
        height: "100%",
        minHeight: 300
    },
    errorContainer: {},
    errorText: {
        color: "red",
        fontWeight: "bold"
    }
};

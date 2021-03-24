import { Style } from "@mendix/piw-native-utils-internal";
import { ViewStyle } from "react-native";

export interface ActivityIndicatorStyle extends Style {
    container: ViewStyle;
    indicator: {
        size: "large" | "small";
        color: string;
    };
}

export const defaultActivityStyle: ActivityIndicatorStyle = {
    container: {},
    indicator: {
        size: "large",
        color: "gray"
    }
};

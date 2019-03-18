import { Style } from "@native-components/util-widgets";
import { ViewStyle } from "react-native";

export interface ActivityIndicatorStyle extends Style {
    container: ViewStyle;
    indicator: {
        color: string;
    };
}

export const defaultActivityStyle: ActivityIndicatorStyle = {
    container: {},
    indicator: {
        color: "gray"
    }
};

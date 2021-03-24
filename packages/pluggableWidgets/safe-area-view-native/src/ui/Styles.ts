import { ViewStyle } from "react-native";
import { Style } from "@mendix/piw-native-utils-internal";

export interface SafeAreaViewStyle extends Style {
    container: ViewStyle;
}

export const defaultSafeAreaViewStyle: SafeAreaViewStyle = {
    container: {
        flex: 1
    }
};

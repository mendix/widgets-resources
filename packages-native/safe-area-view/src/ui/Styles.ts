import { ViewStyle } from "react-native";
import { Style } from "@native-mobile-resources/util-widgets";

export interface SafeAreaViewStyle extends Style {
    container: ViewStyle;
}

export const defaultSafeAreaViewStyle: SafeAreaViewStyle = {
    container: {
        flex: 1
    }
};

import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

export interface BottomDrawerStyle extends Style {
    container: ViewStyle;
}

export const defaultBottomDrawerStyle: BottomDrawerStyle = {
    container: {
        flex: 1
    }
};

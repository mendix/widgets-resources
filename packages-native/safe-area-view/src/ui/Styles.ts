import { ViewStyle } from "react-native";
import { Style } from "@native-mobile-resources/util-widgets";

export interface SafeAreaViewStyle extends Style {
    unsafeAreaTop: {
        backgroundColor: string;
    };
    unsafeAreaBottom: {
        backgroundColor: string;
    };
    container: ViewStyle;
}

export const defaultSafeAreaViewStyle: SafeAreaViewStyle = {
    unsafeAreaTop: {
        backgroundColor: "transperant"
    },
    unsafeAreaBottom: {
        backgroundColor: "transperant"
    },
    container: {
        flex: 1,
        backgroundColor: "transperant"
    }
};

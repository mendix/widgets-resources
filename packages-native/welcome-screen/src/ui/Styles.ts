import { Style } from "@native-mobile-resources/util-widgets";
import { StyleSheet, ViewStyle } from "react-native";
import absoluteFillObject = StyleSheet.absoluteFillObject;

export interface WelcomeScreenStyle extends Style {
    fullscreenContainer: ViewStyle;
    cardContainer: ViewStyle;
}

export const defaultWelcomeScreenStyle: WelcomeScreenStyle = {
    fullscreenContainer: {
        ...absoluteFillObject
    },
    cardContainer: {
        ...absoluteFillObject,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10
    }
};

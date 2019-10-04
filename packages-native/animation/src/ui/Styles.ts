import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

export interface AnimationStyle extends Style {
    container: ViewStyle;
}

export const defaultAnimationStyle: AnimationStyle = {
    container: {
        // All ViewStyle properties are allowed
    }
};

import { Style } from "@mendix/piw-native-utils-internal";
import { ViewStyle } from "react-native";

export interface AnimationStyle extends Style {
    container: ViewStyle;
}

export const defaultAnimationStyle: AnimationStyle = {
    container: {
        // All ViewStyle properties are allowed
    }
};

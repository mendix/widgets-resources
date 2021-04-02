import { Style } from "@mendix/piw-native-utils-internal";
import { ViewStyle } from "react-native";

export interface RepeaterStyle extends Style {
    container: ViewStyle;
}

export const defaultRepeaterStyle: RepeaterStyle = {
    container: {}
};

import { Style } from "../../../../tools/util-widgets/dist";
import { ViewStyle } from "react-native";

export interface RepeaterStyle extends Style {
    container: ViewStyle;
}

export const defaultRepeaterStyle: RepeaterStyle = {
    container: {}
};

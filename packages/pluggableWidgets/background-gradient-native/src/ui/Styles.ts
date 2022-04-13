import { ViewStyle } from "react-native";
import { Style } from "@mendix/pluggable-widgets-tools";

export interface CustomStyle extends Style {
    container: ViewStyle;
}

const defaultStyle: CustomStyle = {
    container: {}
};

export default defaultStyle;

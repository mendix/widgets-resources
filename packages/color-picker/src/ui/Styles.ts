import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

export interface ColorPickerStyle extends Style {
    container: ViewStyle;
}

export const defaultColorWheelStyle: ColorPickerStyle = {
    container: {
        flex: 1
    }
};

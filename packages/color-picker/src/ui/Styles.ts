import { Style } from "@native-components/util-widgets";
import { ViewStyle } from "react-native";

export interface ColorPickerStyle extends Style {
    container: ViewStyle;
}

export const defaultColorWheelStyle: ColorPickerStyle = {
    container: {
        flex: 1
    }
};

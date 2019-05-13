import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

export interface ColorPickerStyle extends Style {
    container: ViewStyle;
    preview: ViewStyle;
}

export const defaultColorWheelStyle: ColorPickerStyle = {
    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        minHeight: 100,
        borderRadius: 5,
        aspectRatio: 16 / 9
    }
};

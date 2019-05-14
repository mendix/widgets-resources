import { Style } from "@native-mobile-resources/util-widgets";
import { ViewStyle } from "react-native";

export interface ColorPickerStyle extends Style {
    container: ViewStyle;
    preview: ViewStyle;
}

export const defaultColorPickerStyle: ColorPickerStyle = {
    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        borderRadius: 5,
        minHeight: 50
    }
};

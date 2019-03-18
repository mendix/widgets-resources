import { Style } from "@native-components/util-widgets";
import { ViewStyle } from "react-native";

export interface ColorWheelStyle extends Style {
    container: ViewStyle;
    thumbnail: ViewStyle & { size: number };
}

export const defaultColorWheelStyle: ColorWheelStyle = {
    container: {},
    thumbnail: {
        size: 50,
        borderWidth: 5,
        borderColor: "#FFF"
    }
};

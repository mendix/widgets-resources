import { Style } from "@native-mobile-resources/util-widgets";
import { Platform, TextStyle, ViewStyle } from "react-native";

export interface ProgressCircleStyle extends Style {
    container: ViewStyle;
    circle: {
        size: number;
        borderWidth: number;
        borderColor: string;
    };
    fill: {
        backgroundColor: string;
        width: number;
        lineCapRounded: boolean;
    };
    text: TextStyle;
    validationMessage: TextStyle;
}

export const defaultProgressCircleStyle: ProgressCircleStyle = {
    container: {},
    circle: {
        size: 100,
        borderWidth: 1,
        borderColor: Platform.select({ ios: "rgb(0, 122, 255)", default: "rgb(98,0,238)" })
    },
    fill: {
        width: 3,
        lineCapRounded: false,
        backgroundColor: Platform.select({ ios: "rgb(0, 122, 255)", default: "rgb(98,0,238)" })
    },
    text: {
        fontSize: 18,
        color: Platform.select({ ios: "rgb(0, 122, 255)", default: "rgb(98,0,238)" })
    },
    validationMessage: {
        color: "#ed1c24"
    }
};

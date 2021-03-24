import { Style } from "@mendix/piw-native-utils-internal";
import { Platform, TextStyle, ViewStyle } from "react-native";

export interface ProgressBarStyle extends Style {
    container: ViewStyle;
    bar: ViewStyle;
    fill: {
        backgroundColor: string;
    };
    validationMessage: TextStyle;
}

export const defaultProgressBarStyle: ProgressBarStyle = {
    container: {},
    bar: {
        height: 6,
        ...Platform.select({
            ios: {
                borderWidth: 1,
                borderRadius: 4,
                borderColor: "rgb(0,122,255)"
            },
            android: {
                borderRadius: 0,
                borderWidth: 0,
                backgroundColor: "rgba(98,0,238, 0.2)"
            }
        })
    },
    fill: {
        backgroundColor: Platform.select({ ios: "rgb(0,122,255)", default: "rgb(98,0,238)" })
    },
    validationMessage: {
        color: "#ed1c24"
    }
};

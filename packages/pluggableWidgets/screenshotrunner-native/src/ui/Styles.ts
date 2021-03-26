import { Style } from "@mendix/piw-native-utils-internal";
import { PressableAndroidRippleConfig, TextStyle, ViewStyle } from "react-native";

interface PressableContainerType extends ViewStyle {
    androidRipple?: PressableAndroidRippleConfig;
}

export interface ScreenshotRunnerStyle extends Style {
    container: ViewStyle;
    button: {
        start: { container: PressableContainerType; text: TextStyle };
        stop: { container: PressableContainerType; text: TextStyle };
    };
    text: TextStyle;
    subText: TextStyle;
    errorText: TextStyle;
    list: ViewStyle;
}

const buttonContainer: ViewStyle = {
    flex: 1,
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,

    minWidth: 48,
    minHeight: 48,
    paddingVertical: 8,
    paddingHorizontal: 8
};

export const defaultScreenshotRunnerStyles: ScreenshotRunnerStyle = {
    container: {},
    button: {
        start: {
            container: {
                ...buttonContainer,
                borderColor: "#264AE5",
                backgroundColor: "#264AE5"
            },
            text: {
                color: "#FFF",
                fontWeight: "bold",
                fontSize: 12,
                lineHeight: 18
            }
        },
        stop: {
            container: {
                ...buttonContainer,
                borderColor: "#264AE5",
                backgroundColor: "transparent",
                marginLeft: 16
            },
            text: {
                color: "#264AE5",
                fontWeight: "bold",
                fontSize: 12,
                lineHeight: 18
            }
        }
    },
    list: {},
    text: {
        color: "#0A1326",
        fontSize: 18,
        lineHeight: 27,
        marginTop: 8
    },
    subText: {
        color: "#6C717E",
        fontSize: 14,
        lineHeight: 21
    },
    errorText: {
        color: "#E33F4E",
        fontSize: 10,
        lineHeight: 15
    }
};

import { Style } from "@native-components/util-widgets";
import { Platform, TextStyle, ViewStyle } from "react-native";

export interface ToggleButtonsStyle extends Style {
    container: ViewStyle;
    containerDisabled: ViewStyle;
    button: ViewStyle;
    text: TextStyle;
    activeButton: ViewStyle;
    activeButtonText: TextStyle;
}

const blue = "rgb(0,122,255)";
const purple = "rgb(98,0,238)";
export const defaultToggleButtonsStyle: ToggleButtonsStyle = {
    container: {
        borderRadius: Platform.select({ ios: 5, android: 3 })
    },
    containerDisabled: {
        opacity: 0.5
    },
    button: {
        borderRadius: 0,
        borderColor: Platform.select({ ios: blue, android: "#CCC" })
    },
    text: {
        ...(Platform.select({
            ios: {
                color: blue
            },
            android: {
                color: "#666",
                paddingVertical: 3,
                fontWeight: "600"
            }
        }) as TextStyle)
    },
    activeButton: {
        ...Platform.select({
            ios: {
                borderColor: blue,
                backgroundColor: blue
            },
            android: {
                borderColor: purple,
                backgroundColor: purple
            }
        })
    },
    activeButtonText: {
        color: "#fff"
    }
};

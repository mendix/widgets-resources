import { Style } from "@native-components/util-widgets";
import { Platform, TextStyle, ViewStyle } from "react-native";

export interface SegmentedControlStyle extends Style {
    container: ViewStyle;
    tab: ViewStyle;
    text: TextStyle;
    activeTab: ViewStyle;
    activeTabText: TextStyle;
}

const blue = "rgb(0,122,255)";
const purple = "rgb(98,0,238)";
export const defaultSegmentedControlStyle: SegmentedControlStyle = {
    container: {
        // All ViewStyle properties are allowed
        borderRadius: Platform.select({ ios: 5, android: 3 })
    },
    tab: {
        // All ViewStyle properties are allowed
        borderRadius: 0,
        borderColor: Platform.select({ ios: blue, android: "#CCC" })
    },
    text: {
        // All TextStyle properties are allowed
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
    activeTab: {
        // All ViewStyle properties are allowed
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
    activeTabText: {
        // All TextStyle properties are allowed
        color: "#fff"
    }
};

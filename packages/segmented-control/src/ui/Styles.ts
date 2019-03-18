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
        borderRadius: Platform.select({ ios: 5, android: 3 })
    },
    tab: {
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
    activeTab: {
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
        color: "#fff"
    }
};

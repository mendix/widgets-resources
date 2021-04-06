import { ViewStyle } from "react-native";
import { Style } from "@mendix/piw-native-utils-internal";

export interface GroupBoxStyle extends Style {
    container: ViewStyle;
    header: {
        container: ViewStyle;
        content: ViewStyle;
        icon: ViewStyle & {
            size: number;
            color: string;
        };
    };
    content: ViewStyle;
}

export const defaultGroupBoxStyle: GroupBoxStyle = {
    container: {
            borderWidth: 1,
            borderColor: "#e7e7e9",
            borderRadius: 4,
            overflow: "hidden"
    },
    header: {
        container: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#e7e7e9",
            paddingHorizontal: 12,
            paddingVertical: 8,
        },
        content: {
            flex: 1,
        },
        icon: {
            size: 16,
            color: "#0a1325",
        }
    },
    content: {
        paddingVertical: 12,
        paddingHorizontal: 8,
    }
};

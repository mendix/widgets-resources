import { TextStyle, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

export interface BadgeStyle extends Style {
    container: ViewStyle;
    badge: ViewStyle;
    label: TextStyle;
}

export const defaultBadgeStyle: BadgeStyle = {
    container: {
        flexDirection: "row",
        borderRadius: 30,
        overflow: "hidden"
    },
    badge: {
        borderRadius: 30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#D9534F",
        overflow: "hidden"
    },
    label: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF"
    }
};

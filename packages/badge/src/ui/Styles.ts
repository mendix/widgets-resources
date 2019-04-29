import { Style } from "@native-mobile-resources/util-widgets";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface BadgeStyle extends Style {
    container: ViewStyle;
    text: TextStyle;
}

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    badge: {
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#ccc"
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#444",
        alignSelf: "center"
    }
});

export const defaultBadgeStyle: BadgeStyle = {
    container: styles.badge,
    text: styles.text
};

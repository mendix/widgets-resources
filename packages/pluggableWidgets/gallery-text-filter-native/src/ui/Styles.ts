import { Style } from "@mendix/piw-native-utils-internal";
import { TextStyle, ViewStyle } from "react-native";

export interface GalleryTextFilterStyle extends Style {
    container: ViewStyle & { rippleColor?: string };
    caption: TextStyle;
    textInputContainer: ViewStyle;
    textInputContainerOnFocus: ViewStyle;
    textInput: TextStyle;
    textInputClearIcon: ViewStyle;
}

export const defaultGalleryTextFilterStyle: GalleryTextFilterStyle = {
    container: {
        alignSelf: "baseline",
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#ccc",
        justifyContent: "center"
    },
    caption: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#444"
    },
    textInputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#606671",
        borderRadius: 6,
        paddingEnd: 8
    },
    textInputContainerOnFocus: {
        borderColor: "#264AE5"
    },
    textInput: { height: 40, marginStart: 12, width: "90%", color: "#A9ACB3" },
    textInputClearIcon: {
        justifyContent: "center",
        alignContent: "center"
    }
};

import { Style } from "@mendix/piw-native-utils-internal";
import { TextStyle, ViewStyle } from "react-native";

export interface InputStyleProps {
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    placeholderTextColor?: string;
    selectionColor?: string;
    underlineColorAndroid?: string;
}

export interface InputStyle extends TextStyle, InputStyleProps {}

export interface GalleryTextFilterStyle extends Style {
    container: ViewStyle & { rippleColor?: string };
    textInputContainer: ViewStyle;
    textInputContainerFocused: ViewStyle;
    textInput: InputStyle;
    textInputClearIcon: ViewStyle;
}

export const defaultGalleryTextFilterStyle: GalleryTextFilterStyle = {
    container: {},
    textInputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#606671",
        borderRadius: 6,
        paddingEnd: 8
    },
    textInputContainerFocused: {
        borderColor: "#264AE5"
    },
    textInput: {
        height: 40,
        marginStart: 12,
        width: "90%",
        color: "#6C717E",
        backgroundColor: "#FFFFFF",
        placeholderTextColor: "#264AE5"
    },
    textInputClearIcon: {
        justifyContent: "center",
        alignContent: "center"
    }
};

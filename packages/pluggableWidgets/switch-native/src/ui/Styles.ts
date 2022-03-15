import { Style } from "@mendix/piw-native-utils-internal";
import { TextStyle, ViewStyle, Platform } from "react-native";

interface InputLabelType extends TextStyle {
    numberOfLines: number;
}

export interface CheckBoxInputType extends TextStyle {
    thumbColorOn?: string;
    thumbColorOff?: string;
    trackColorOn?: string;
    trackColorOff?: string;
}

export interface SwitchStyle extends Style {
    container: ViewStyle;
    containerDisabled: ViewStyle;
    label: InputLabelType;
    labelDisabled: TextStyle;
    input: CheckBoxInputType;
    inputDisabled: CheckBoxInputType;
    inputError: CheckBoxInputType;
    validationMessage: TextStyle;
}
export const defaultSwitchStyle: SwitchStyle = {
    container: {
        // All ViewStyle properties are allowed
        paddingVertical: 4,
        justifyContent: "center"
    },
    containerDisabled: {
        // All ViewStyle properties are allowed
    },
    label: {
        // numberOfLines and all TextStyle properties are allowed
        numberOfLines: 1
    },
    labelDisabled: {
        // All TextStyle properties are allowed
    },
    input: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
        marginRight: Platform.select({ android: -3 }),
        thumbColorOn: "#F3F5FF",
        trackColorOn: "#264AE5",
        thumbColorOff: "#FFF",
        trackColorOff: "#CED0D3"
    },
    inputDisabled: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
        thumbColorOn: "#F8F8F8",
        trackColorOn: "#9DA1A8",
        thumbColorOff: "#F8F8F8",
        trackColorOff: "#CED0D3"
    },
    inputError: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
        thumbColorOn: "#F3F5FF",
        trackColorOn: "#E33F4E",
        thumbColorOff: "#FFF",
        trackColorOff: "#E33F4E"
    },
    validationMessage: {
        // All TextStyle properties are allowed
        alignSelf: "stretch"
    }
};

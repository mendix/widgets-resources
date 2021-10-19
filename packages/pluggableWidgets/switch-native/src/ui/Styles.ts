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
        marginRight: Platform.select({ android: -3 })
    },
    inputDisabled: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
    },
    inputError: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
    },
    validationMessage: {
        // All TextStyle properties are allowed
        alignSelf: "stretch"
    }
};

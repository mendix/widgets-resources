import { TextBox } from "./textbox";
import { Platform } from "react-native";

/* ==========================================================================
    CheckBox

    Default Class For Mendix CheckBox Widget
========================================================================== */

export const CheckBox = {
    label: TextBox.label,
    input: {
        ...TextBox.input,
        ...Platform.select({
            ios: {
                borderTopWidth: 1,
                borderBottomWidth: 1
            },
            android: {}
        })
    },
    inputError: TextBox.inputError,
    validationMessage: TextBox.validationMessage
};
export const CheckBoxVertical = {
    label: {
        ...CheckBox.label,
        marginBottom: 5
    },
    input: CheckBox.input,
    inputError: CheckBox.inputError,
    validationMessage: CheckBox.validationMessage
};

import { Platform } from "react-native";
import { background, backgroundDefaults, border, brand, contrast, font, spacing, checkbox } from "../../variables";
import { TextBox, TextBoxVertical } from "./textbox";
import { CheckBoxType } from "../../types/widgets";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    CheckBox

    Default Class For Mendix CheckBox Widget
========================================================================== */
export const CheckBox: CheckBoxType = {
    container: {
        // All ViewStyle properties are allowed
        ...TextBox.container,
        paddingVertical: spacing.smallest,
        justifyContent: "center"
    },
    containerDisabled: {
        // All ViewStyle properties are allowed
        ...TextBox.containerDisabled
    },
    label: {
        // numberOfLines and all TextStyle properties are allowed
        ...TextBox.label
    },
    labelDisabled: {
        // All TextStyle properties are allowed
        ...TextBox.labelDisabled
    },
    // the below properties (input, inputDisabled & inputError) are only used when render mode is `switch`
    input: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all ViewStyle properties are allowed
        backgroundColor: "transparent",
        marginRight: Platform.select({ android: -3 }),
        thumbColorOn: backgroundDefaults.primaryLight,
        trackColorOn: brand.primary,
        thumbColorOff: "#FFF",
        trackColorOff: border.color
    },
    inputDisabled: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all ViewStyle properties are allowed
        thumbColorOn: background.secondary,
        trackColorOn: font.colorDisabled,
        thumbColorOff: background.secondary,
        trackColorOff: border.color
    },
    inputError: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all ViewStyle properties are allowed
        ...TextBox.inputError,
        thumbColorOn: backgroundDefaults.primaryLight,
        trackColorOn: brand.danger,
        thumbColorOff: contrast.low,
        trackColorOff: brand.danger
    },
    // the below properties (checkboxInput, checkboxInputDisabled & checkboxInputError) are only used when render mode is `checkbox`
    checkboxInput: {
        // color, size & all ViewStyle properties are allowed
        ...checkbox.checkboxInput,
        justifyContent: "center",
        alignItems: "center"
    },
    checkboxInputDisabled: {
        // color, size & all ViewStyle properties are allowed
        ...checkbox.checkboxInputDisabled
    },
    checkboxInputError: {
        // color, size & all ViewStyle properties are allowed
        ...checkbox.checkboxInputError
    },
    validationMessage: {
        // All TextStyle properties are allowed
        ...TextBox.validationMessage,
        alignSelf: "stretch"
    }
};
export const CheckBoxVertical: CheckBoxType = {
    container: TextBoxVertical.container,
    containerDisabled: TextBoxVertical.containerDisabled,
    label: TextBoxVertical.label,
    labelDisabled: TextBoxVertical.labelDisabled,
    // the below properties (input, inputDisabled & inputError) are only used when render mode is `switch`
    input: {
        ...CheckBox.input,
        alignSelf: "flex-start"
    },
    inputDisabled: CheckBox.inputDisabled,
    inputError: {
        ...TextBoxVertical.inputError,
        thumbColorOn: background.primary,
        trackColorOn: brand.danger,
        thumbColorOff: contrast.low,
        trackColorOff: brand.danger
    },
    // the below properties (checkboxInput, checkboxInputDisabled & checkboxInputError) are only used when render mode is `checkbox`
    checkboxInput: {
        ...CheckBox.checkboxInput
    },
    checkboxInputDisabled: CheckBox.checkboxInputDisabled,
    checkboxInputError: {
        ...TextBoxVertical.inputError
    },
    validationMessage: {
        ...TextBoxVertical.validationMessage,
        alignSelf: "stretch"
    }
};

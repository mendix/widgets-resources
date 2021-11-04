import { Platform } from "react-native";
import { background, backgroundDefaults, border, brand, font, spacing } from "../../variables";
import { TextBox } from "./textbox";
import { SwitchType } from "../../types/widgets";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Switch

    Default Class For Mendix Switch Widget
========================================================================== */
export const com_mendix_widget_native_switch_Switch: SwitchType = {
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
    input: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
        backgroundColor: "transparent",
        marginRight: Platform.select({ android: -3 }),
        thumbColorOn: backgroundDefaults.primaryLight,
        trackColorOn: brand.primary,
        thumbColorOff: "#FFF",
        trackColorOff: border.color
    },
    inputDisabled: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
        thumbColorOn: background.secondary,
        trackColorOn: font.colorDisabled,
        thumbColorOff: background.secondary,
        trackColorOff: border.color
    },
    inputError: {
        // thumbColorOn, thumbColorOff, trackColorOn, trackColorOff and all TextStyle properties are allowed
        thumbColorOn: backgroundDefaults.primaryLight,
        trackColorOn: brand.danger,
        thumbColorOff: "#FFF",
        trackColorOff: brand.danger
    },
    validationMessage: {
        // All TextStyle properties are allowed
        ...TextBox.validationMessage,
        alignSelf: "stretch"
    }
};

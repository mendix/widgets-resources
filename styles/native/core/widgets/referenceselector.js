import { input }                    from "../variables";
import { TextBox, TextBoxVertical } from "./textbox";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Reference Selector

    Default Class For Mendix Reference Selector Widget
========================================================================== */

export const ReferenceSelector = {
    container: {
        // All ViewStyle properties are allowed
        ...TextBox.container,
    },
    label: {
        // All TextStyle properties are allowed
        ...TextBox.label,
    },
    pickerIOS: {
        // All ViewStyle properties are allowed
    },
    pickerItemIOS: {
        // All TextStyle properties are allowed
    },
    pickerBackdropIOS: {
        // All ViewStyle properties are allowed
    },
    pickerTopIOS: {
        // All ViewStyle properties are allowed
        backgroundColor: input.backgroundColor,
    },
    value: {
        // All TextStyle properties are allowed
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,

        borderWidth: input.borderWidth,
        borderRadius: input.radius,

        paddingHorizontal: input.paddingHorizontal,
        paddingVertical: input.paddingVertical,
    },
    valueDisabled: {
        // All TextStyle properties are allowed
        backgroundColor: input.disabledBackgroundColor,
    },
    validationMessage: {
        // All TextStyle properties are allowed
        ...TextBox.validationMessage,
    },
};
export const ReferenceSelectorVertical = {
    container: TextBoxVertical.container,
    label: TextBoxVertical.label,
    pickerIOS: ReferenceSelector.pickerIOS,
    pickerItemIOS: ReferenceSelector.pickerItemIOS,
    pickerBackdropIOS: ReferenceSelector.pickerBackdropIOS,
    pickerTopIOS: ReferenceSelector.pickerTopIOS,
    value: {
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,

        borderRadius: input.radius,
        borderWidth: input.borderWidth,

        paddingVertical: input.paddingVertical,
        paddingHorizontal: input.paddingHorizontal,
    },
    validationMessage: TextBoxVertical.validationMessage,
};
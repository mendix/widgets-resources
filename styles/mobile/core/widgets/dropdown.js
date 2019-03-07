import { TextBox, TextBoxVertical } from './textbox';
import { gray, spacing, border, font, background } from '../variables';
import { Platform } from 'react-native';

/* ==========================================================================
    DropDown

    Default Class For Mendix DropDown Widget
========================================================================== */

export const DropDown = {
    label: TextBox.label,
    pickerIOS: {},
    pickerItemIOS: {},
    pickerBackdropIOS: {},
    pickerTopIOS: {},
    value: {
        color: TextBox.input.color,
        // fontSize: TextBox.input.fontSize, //FIXME: Throws error
        borderColor: TextBox.input.borderColor,
        paddingVertical: TextBox.input.paddingVertical,
        paddingHorizontal: TextBox.input.paddingHorizontal,
        backgroundColor: TextBox.input.backgroundColor,
        borderRadius: TextBox.input.radius,
        borderWidth: TextBox.input.borderWidth,
        borderColor: TextBox.input.borderColor,
    },
};
export const DropDownVertical = {
    label: TextBoxVertical.label,
    pickerIOS: DropDown.pickerIOS,
    pickerItemIOS: DropDown.pickerItemIOS,
    pickerBackdropIOS: DropDown.pickerBackdropIOS,
    pickerTopIOS: DropDown.pickerTopIOS,
    value: {
        marginBottom: TextBoxVertical.input.marginBottom,
        color: TextBoxVertical.input.color,
        // fontSize: TextBoxVertical.input.fontSize, //FIXME: Throws error
        borderColor: TextBoxVertical.input.borderColor,
        paddingVertical: TextBoxVertical.input.paddingVertical,
        paddingHorizontal: TextBoxVertical.input.paddingHorizontal,
        backgroundColor: TextBoxVertical.input.backgroundColor,
        borderRadius: TextBoxVertical.input.radius,
        borderColor: TextBoxVertical.input.borderColor,
        borderWidth: TextBoxVertical.input.borderWidth,
        borderTopWidth: TextBoxVertical.input.borderTopWidth,
        borderBottomWidth: TextBoxVertical.input.borderBottomWidth,
    },
};

export const DropDownNoLabel = {
    label: {
        flex: -1,
    },
    pickerIOS: DropDown.pickerIOS,
    pickerItemIOS: DropDown.pickerItemIOS,
    pickerBackdropIOS: DropDown.pickerBackdropIOS,
    pickerTopIOS: DropDown.pickerTopIOS,
    value: DropDown.value,
};

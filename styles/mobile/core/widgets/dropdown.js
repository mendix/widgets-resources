import { Platform } from 'react-native';
import { input } from '../variables';
import { TextBoxVertical, TextBox } from './textbox';

/* ==========================================================================
    Drop Down

    Default Class For Mendix Drop Down Widget
========================================================================== */

export const DropDown = {
    container: TextBox.container,
    label: TextBox.label,
    pickerIOS: {},
    pickerItemIOS: {},
    pickerBackdropIOS: {},
    pickerTopIOS: {},
    value: {
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,

        // height: 40,
        // fontSize: input.fontSize, //FIXME: Throws error
        borderWidth: Platform.select({ android: input.borderWidth }),
        borderRadius: input.radius,

        paddingHorizontal: Platform.select({ ios: 0, android: input.paddingHorizontal }),
        paddingVertical: Platform.select({ ios: 0, android: input.paddingVertical }),
    },
};
export const DropDownVertical = {
    container: TextBoxVertical.container,
    label: TextBoxVertical.label,
    pickerIOS: DropDown.pickerIOS,
    pickerItemIOS: DropDown.pickerItemIOS,
    pickerBackdropIOS: DropDown.pickerBackdropIOS,
    pickerTopIOS: DropDown.pickerTopIOS,
    value: {
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,

        // fontSize: input.fontSize, //FIXME: Throws error
        borderRadius: input.radius,
        borderWidth: Platform.select({ android: input.borderWidth }),
        borderTopWidth: Platform.select({ ios: input.borderWidth }),
        borderBottomWidth: Platform.select({ ios: input.borderWidth }),

        paddingVertical: input.paddingVertical,
        paddingHorizontal: input.paddingHorizontal,
    },
};

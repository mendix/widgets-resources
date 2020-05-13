import { input, border }                    from "../variables";
import { TextBox, TextBoxVertical } from "./textbox";
import { DropDownType }             from "../../types/widgets";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Drop Down

    Default Class For Mendix Drop Down Widget
========================================================================== */
export const DropDown: DropDownType = {
    container: {
        // All ViewStyle properties are allowed
        ...TextBox.container,
    },
    label: {
        // numberOfLines and all TextStyle properties are allowed
        ...TextBox.label,
    },
    value: {
        // All TextStyle properties are allowed
        color: input.color,
        borderColor: input.borderColor,
        backgroundColor: input.backgroundColor,

        fontSize: input.fontSize,
        fontFamily: input.fontFamily,
        borderWidth: input.borderWidth,
        borderRadius: input.borderRadius,

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

    /*  New dropdown styles start */
    touchable: {
        // All ViewStyle properties are allowed
        // Only for android rippleColor: string
    },
    menuWrapper: {
        // All ViewStyle properties are allowed
        borderRadius: border.radius,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 16,
        maxWidth: 500,
	},
	itemContainer: {
        // All ViewStyle properties are allowed
		maxWidth:500,
		paddingVertical: input.paddingVertical,
        paddingHorizontal: input.paddingHorizontal,
	},
    item: {
        // All TextStyke properties are allowed
    },
    /*  New dropdown styles end */
    
    useOld: false,

    /*  Old dropdown styles start */
    pickerIOS: {
        // All ViewStyle properties are allowed
        backgroundColor: input.backgroundColor,
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
    /*  Old dropdown styles start */
};
export const DropDownVertical: DropDownType = {
    container: TextBoxVertical.container,
    label: TextBoxVertical.label,
    pickerIOS: DropDown.pickerIOS,
    pickerItemIOS: DropDown.pickerItemIOS,
    pickerBackdropIOS: DropDown.pickerBackdropIOS,
    pickerTopIOS: DropDown.pickerTopIOS,
    value: DropDown.value,
    validationMessage: TextBoxVertical.validationMessage,
};

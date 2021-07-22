var _a, _b, _c;
import { font, input } from "../../variables";
import { TextBox, TextBoxVertical } from "./textbox";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Drop Down

    Default Class For Mendix Drop Down Widget
========================================================================== */
export const DropDown = {
    container: {
        // All ViewStyle properties are allowed
        ...TextBox.container
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
    value: {
        // All TextStyle properties & placeholderTextColor are allowed
        color: input.input.color,
        placeholderTextColor: input.input.placeholderTextColor,
        fontSize: input.input.fontSize,
        lineHeight: input.input.lineHeight,
        fontFamily: font.family,
        overflow: "hidden",
        textAlignVertical: "center"
    },
    valueDisabled: {
        // All TextStyle properties are allowed
        color: (_a = TextBox.inputDisabled) === null || _a === void 0 ? void 0 : _a.color,
        borderColor: (_b = TextBox.inputDisabled) === null || _b === void 0 ? void 0 : _b.borderColor,
        backgroundColor: (_c = TextBox.inputDisabled) === null || _c === void 0 ? void 0 : _c.backgroundColor
    },
    valueFocused: {
    // All TextStyle properties are allowed
    },
    validationMessage: {
        // All TextStyle properties are allowed
        ...TextBox.validationMessage
    },
    /*  New dropdown styles start */
    valueContainer: {
        // All ViewStyle properties & rippleColor & activeOpacity & underlayColor are allowed
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        rippleColor: input.valueContainer.rippleColor,
        borderWidth: input.input.borderWidth,
        borderRadius: input.input.borderRadius,
        paddingHorizontal: input.input.paddingHorizontal,
        paddingVertical: input.input.paddingVertical,
        backgroundColor: input.input.backgroundColor,
        borderColor: input.input.borderColor,
        minWidth: input.input.minWidth,
        minHeight: input.input.minHeight
    },
    valueContainerDisabled: {
    // All ViewStyle properties are allowed
    },
    valueContainerFocused: {
    // All ViewStyle properties are allowed
    },
    iconStyle: {
        // All TextStyle properties are allowed
        color: input.input.color
    },
    menuWrapper: {
        // All ViewStyle properties are allowed
        borderRadius: input.input.borderRadius,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 16,
        backgroundColor: input.input.backgroundColor
    },
    itemContainer: {
        // All ViewStyle properties & rippleColor & activeOpacity & underlayColor are allowed
        width: "100%",
        maxWidth: undefined,
        paddingVertical: input.itemContainer.paddingVertical,
        paddingHorizontal: input.itemContainer.paddingHorizontal,
        backgroundColor: input.itemContainer.backgroundColor,
        underlayColor: input.inputContainer.underlayColor,
        overflow: "hidden"
    },
    item: {
        // All TextStyle properties are allowed
        color: input.item.color,
        fontSize: input.item.fontSize
    },
    selectedItem: {
        // All TextStyle properties are allowed
        color: input.selectedItem.color,
        fontSize: input.selectedItem.fontSize,
        backgroundColor: "transparent"
    },
    selectedItemContainer: {
        // All ViewStyle properties are allowed
        width: "100%",
        maxWidth: undefined,
        borderWidth: input.selectedItemContainer.borderWidth,
        borderRadius: input.selectedItemContainer.borderRadius,
        borderColor: input.selectedItemContainer.borderColor,
        backgroundColor: input.selectedItemContainer.backgroundColor
    },
    /*  New dropdown styles end */
    useUniformDesign: true,
    /*  Old dropdown styles start */
    pickerIOS: {
        // All ViewStyle properties are allowed
        backgroundColor: input.input.backgroundColor
    },
    pickerItemIOS: {
    // All TextStyle properties are allowed
    },
    pickerBackdropIOS: {
    // All ViewStyle properties are allowed
    },
    pickerTopIOS: {
        // All ViewStyle properties are allowed
        backgroundColor: input.input.backgroundColor
    }
    /*  Old dropdown styles end */
};
export const DropDownVertical = {
    container: TextBoxVertical.container,
    label: TextBoxVertical.label,
    value: DropDown.value,
    valueFocused: DropDown.valueFocused,
    validationMessage: TextBoxVertical.validationMessage,
    valueContainer: DropDown.valueContainer,
    valueContainerFocused: DropDown.valueContainerFocused,
    iconStyle: DropDown.iconStyle,
    menuWrapper: DropDown.menuWrapper,
    itemContainer: DropDown.itemContainer,
    item: DropDown.item,
    useUniformDesign: DropDown.useUniformDesign,
    pickerIOS: DropDown.pickerIOS,
    pickerItemIOS: DropDown.pickerItemIOS,
    pickerBackdropIOS: DropDown.pickerBackdropIOS,
    pickerTopIOS: DropDown.pickerTopIOS
};

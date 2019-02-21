import { TextBox } from "./textbox";
import { gray, spacing, border, font } from "../variables";
import { Platform } from "react-native";

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
        color: font.color,
        backgroundColor: "#FFF",
        borderColor: gray.lightest,
        ...Platform.select({
            ios: {
                borderTopWidth: 1,
                borderBottomWidth: 1,
                padding: spacing.smaller
            },
            android: {
                borderWidth: 1,
                borderRadius: border.radius,
                padding: spacing.small
            }
        })
    }
};
export const DropDownVertical = {
    label: {
        ...DropDown.label,
        marginBottom: 5
    },
    pickerIOS: DropDown.pickerIOS,
    pickerItemIOS: DropDown.pickerItemIOS,
    pickerBackdropIOS: DropDown.pickerBackdropIOS,
    pickerTopIOS: DropDown.pickerTopIOS,
    value: DropDown.value
};

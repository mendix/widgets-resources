import { spacing, border, brand, input, font } from "../../variables";
import { RadioButtonsStyle } from "../../types/widgets";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    RadioButtons

    Default Class For Mendix RadioButtons Widget
========================================================================== */

export const com_mendix_widget_native_radiobuttons_RadioButtons: RadioButtonsStyle = {
    radioItemContainerStyle: {
        marginBottom: spacing.small,
        marginRight: spacing.regular,
        paddingVertical: spacing.small
    },
    circularBtnStyle: {
        width: spacing.regular,
        height: spacing.regular,
        borderRadius: spacing.regular / 2,
        borderWidth: border.width,
        borderColor: brand.primary
    },
    activeBtnStyle: {
        backgroundColor: brand.primary,
        width: spacing.small,
        height: spacing.small,
        borderRadius: spacing.small / 2
    },
    radioItemTitleStyle: {
        ...input.label,
        marginLeft: spacing.small
    },
    validationMessage: {
        color: brand.danger,
        fontSize: font.sizeSmall
    }
};

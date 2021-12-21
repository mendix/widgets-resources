import { border, brand, font, spacing } from "../../variables";
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

const RADIO_BUTTON_OUTER_CIRCLE_SIZE = 16;
const RADIO_BUTTON_INNER_CIRCLE_SIZE = 8;

export const com_mendix_widget_native_radiobuttons_RadioButtons: RadioButtonsStyle = {
    labelTextStyle: {
        color: font.colorTitle,
        fontSize: font.sizeSmall,
        lineHeight: font.lineHeightSmall,
        marginBottom: spacing.small
    },
    radioButtonItemContainerStyle: {
        marginBottom: spacing.small
    },
    radioButtonItemContainerHorizontalStyle: {
        marginEnd: spacing.small
    },
    circularButtonStyle: {
        width: RADIO_BUTTON_OUTER_CIRCLE_SIZE,
        height: RADIO_BUTTON_OUTER_CIRCLE_SIZE,
        borderRadius: RADIO_BUTTON_OUTER_CIRCLE_SIZE / 2,
        borderColor: border.color,
        marginEnd: spacing.smaller
    },
    activeButtonStyle: {
        width: RADIO_BUTTON_INNER_CIRCLE_SIZE,
        height: RADIO_BUTTON_INNER_CIRCLE_SIZE,
        borderRadius: RADIO_BUTTON_INNER_CIRCLE_SIZE / 2,
        backgroundColor: brand.primary
    },
    radioButtonItemTitleStyle: {
        color: font.colorTitle,
        fontSize: font.sizeSmall,
        lineHeight: font.lineHeightSmall
    },
    validationMessage: {
        color: brand.danger,
        fontSize: font.sizeSmall
    }
};

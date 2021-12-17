import { background, border, font, spacing } from "../../variables";
import { RadioButtonType } from "../../types/widgets";

export const RADIO_BUTTON_SIZE: number = 20;

/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Badge

    Default Class For Mendix Radio Button Widget
========================================================================== */
export const com_mendix_widget_native_radiobutton_RadioButton: RadioButtonType = {
    container: {},
    horizontalContainer: {},
    radioButtonContainer: {},
    caption: {
        marginStart: spacing.small,
        fontSize: font.sizeSmall,
        color: font.colorTitle
    },
    disabledCaption: {
        color: font.colorDisabled
    },
    defaultCircleRadioButton: {
        height: RADIO_BUTTON_SIZE,
        width: RADIO_BUTTON_SIZE,
        borderRadius: border.radiusLargest,
        backgroundColor: background.secondary,
        borderColor: background.brandPrimary,
        borderWidth: border.width
    },
    activeCircleRadioButton: {
        backgroundColor: background.brandPrimary,
        height: RADIO_BUTTON_SIZE / 2,
        width: RADIO_BUTTON_SIZE / 2,
        borderRadius: border.radiusLargest
    },
    disabledCircleRadioButton: {}
};

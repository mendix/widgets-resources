import { radioButtons } from "../../variables";
import { RadioButtonsStyles } from "../../types/widgets";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    RadioButtons

    Default Class For Mendix RadioButtons Widget
========================================================================== */

export const com_mendix_widget_native_radiobuttons_RadioButtons: RadioButtonsStyles = {
    labelTextStyle: {
        // All TextStyle properties are allowed
        ...radioButtons.labelTextStyle
    },
    radioButtonItemContainerStyle: {
        // All ViewStyle properties are allowed
        ...radioButtons.radioButtonItemContainerStyle
    },
    radioButtonItemContainerHorizontalStyle: {
        // All ViewStyle properties are allowed
        ...radioButtons.radioButtonItemContainerHorizontalStyle
    },
    circularButtonStyle: {
        // All ViewStyle properties are allowed
        ...radioButtons.circularButtonStyle
    },
    activeButtonStyle: {
        // All ViewStyle properties are allowed
        ...radioButtons.activeButtonStyle
    },
    radioButtonItemContainerDisabledStyle: {
        // In case radio buttons is not selectable
        // All ViewStyle properties are allowed
        ...radioButtons.radioButtonItemContainerDisabledStyle
    },
    radioButtonItemTitleStyle: {
        // All TextStyle properties are allowed
        ...radioButtons.radioButtonItemTitleStyle
    },
    validationMessage: {
        // All TextStyle properties are allowed
        ...radioButtons.validationMessage
    }
};

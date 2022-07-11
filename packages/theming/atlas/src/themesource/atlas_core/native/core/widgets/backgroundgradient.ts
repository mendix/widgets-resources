import { backgroundGradient } from "../../variables";
import { BackgroundGradientStyles } from "../../types/widgets";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    BackgroundGradient

    Default Class For Mendix BackgroundGradient Widget
========================================================================== */

export const com_mendix_widget_native_backgroundgradient_BackgroundGradient: BackgroundGradientStyles = {
    container: {
        // All ViewStyle properties are allowed
        ...backgroundGradient.container
    },
    angle: backgroundGradient.angle,
    opacity: backgroundGradient.opacity
};

import merge                             from "./_functions/mergeobjects";
import { brand, button, contrast, font } from "../variables";

//
// DISCLAIMER:
// Do not change this file because it is core styling.
// Customizing core files will make updating Atlas much more difficult in the future.
// To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.
//

/* ==========================================================================
    Button

//== Design Properties
//## Helper classes to change the look and feel of the widget
========================================================================== */
// Button Colors
export const btnSecondary = {
    container: {
        borderColor: button.secondary.borderColor,
        backgroundColor: button.secondary.backgroundColor,
    },
    icon: {
        color: button.secondary.color,
    },
    caption: {
        color: button.secondary.color,
    },
};
export const btnSuccess = {
    container: {
        borderColor: button.success.borderColor,
        backgroundColor: button.success.backgroundColor,
    },
    icon: {
        color: button.success.color,
    },
    caption: {
        color: button.success.color,
    },
};
export const btnWarning = {
    container: {
        borderColor: button.warning.borderColor,
        backgroundColor: button.warning.backgroundColor,
    },
    icon: {
        color: button.warning.color,
    },
    caption: {
        color: button.warning.color,
    },
};
export const btnDanger = {
    container: {
        borderColor: button.danger.borderColor,
        backgroundColor: button.danger.backgroundColor,
    },
    icon: {
        color: button.danger.color,
    },
    caption: {
        color: button.danger.color,
    },
};

//== Extra Classes
//## Helper classes to change the look and feel of the widget
//-------------------------------------------------------------------------------------------------------------------//
// Button Icon Only

export const btnIconPrimary = {
    container: {
        borderWidth: 0,
        backgroundColor: "transparent",
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    icon: {
        color: button.primary.backgroundColor,
    },
    caption: {
        fontSize: 0,
    },
};
export const btnIconSecondary = merge(btnIconPrimary, {
    icon: {
        color: contrast.lower,
    },
});
export const btnIconSuccess = merge(btnIconPrimary, {
    icon: {
        color: button.success.backgroundColor,
    },
});
export const btnIconWarning = merge(btnIconPrimary, {
    icon: {
        color: button.warning.backgroundColor,
    },
});
export const btnIconDanger = merge(btnIconPrimary, {
    icon: {
        color: button.danger.backgroundColor,
    },
});

export const btnAsText = {
    container: {
        maxHeight: 22,
        borderWidth: 0,
        borderRadius: 0,
        rippleColor: contrast.lowest,
        backgroundColor: "transparent",
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    icon: {
        color: brand.primary,
        fontWeight: font.weightSemiBold,
        fontSize: button.fontSizeIcon,
    },
    caption: {
        color: brand.primary,
        fontWeight: font.weightSemiBold,
        fontSize: button.fontSize,
    },
};
